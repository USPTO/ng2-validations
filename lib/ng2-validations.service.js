"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_services_1 = require("./http-services");
var defaultConfig_1 = require("./Default/defaultConfig");
var defaultDefinitions_1 = require("./Default/defaultDefinitions");
var NgValidations = (function () {
    function NgValidations(http, fb) {
        this.http = http;
        this.fb = fb;
        this.validators = {};
        this.validationDefinitions = {};
        this.mapValidators = this.mapValidators.bind(this);
        this.useDefaultConfig();
    }
    NgValidations.prototype.createValidationMessageArrray = function (validations) {
        var messagesForDisplay = [];
        return Object.keys(validations).map(function (key) {
            return { name: key, message: validations[key].message };
        });
    };
    NgValidations.prototype.setValidators = function (validators, required) {
        var vals = validators;
        return required ? [forms_1.Validators.required].concat(vals) : vals;
    };
    NgValidations.prototype.checkIfRequired = function (conditionalReq, staticReq) {
        if (staticReq)
            return [forms_1.Validators.required];
        return conditionalReq ? [forms_1.Validators.required] : [];
    };
    NgValidations.prototype.mapValidators = function (val) {
        var f = function (c) { return null; };
        try {
            var test = this.validationDefinitions[val][val];
            return test;
        }
        catch (error) {
            console.error("Definition \"" + val + "\" missing from validator definitions file.");
            return f;
        }
    };
    NgValidations.prototype.bindStaticValidations = function (control, controlName) {
        if (this.validators[controlName]) {
            var vals = this.validators[controlName].validators.map(this.mapValidators);
            var required = this.validators[controlName].required;
            control.setValidators(this.setValidators(vals, required));
            control.updateValueAndValidity();
        }
    };
    NgValidations.prototype.handleConditionalValidations = function (control, form) {
        var _this = this;
        var conditions = this.validators[control].conditions;
        var changes = form.controls[control].valueChanges;
        changes.subscribe(function (value) {
            var conditionsToValidate = [];
            conditions.forEach(function (condition, index) {
                var currentControl = form.controls[condition.control];
                var staticValidators = _this.validators[condition.control].validators.map(_this.mapValidators);
                var staticRequired = _this.validators[condition.control].required || false;
                var conditionalValidators = [];
                var controlRequired = false;
                var requiredValidators = [];
                console.log('Condition:', condition.value);
                if (currentControl && condition.hello) {
                    console.log('FOUND:', true);
                    console.log('Condition:', condition.value);
                    console.log('Value:', value);
                    conditionsToValidate = conditionsToValidate.concat([conditions[index]]);
                }
                else if (currentControl && conditionsToValidate.indexOf(condition) >= 0) {
                    conditionsToValidate = conditionsToValidate.filter(function (c) { return c !== condition; });
                }
                controlRequired = conditionsToValidate.findIndex(function (formControl) {
                    return formControl.required === true;
                }) >= 0;
                conditionalValidators = conditionsToValidate.map(function (c) { return c.tests.map(_this.mapValidators); }).reduce(function (a, b) { return a.concat(b); }, []);
                requiredValidators = _this.checkIfRequired(controlRequired, staticRequired);
                if ((currentControl.value === null || currentControl.value.length) || requiredValidators.length) {
                    currentControl.setValidators(conditionalValidators.concat(staticValidators, requiredValidators));
                }
                else {
                    currentControl.setValidators([]);
                }
                currentControl.updateValueAndValidity();
            });
        });
    };
    NgValidations.prototype.bindFormValidations = function (form) {
        var _this = this;
        if (!this.validators || !this.validationDefinitions) {
            console.warn('Service does not have a valid configuration file. Dynamic validations will not be applied');
            return null;
        }
        var formControls = form.controls;
        var controls = [];
        Object.keys(formControls).forEach(function (control) {
            controls.push({ name: control, controller: form.controls[control] });
            if (_this.validators[control] && _this.validators[control].conditions.length) {
                _this.bindStaticValidations(formControls[control], control);
                _this.handleConditionalValidations(control, form);
            }
            else if (_this.validators[control]) {
                _this.bindStaticValidations(formControls[control], control);
            }
            else {
                console.warn("Control \"" + control + "\" does not exist in confiration data and will not be bound to any validations.\nPlease check the JSON configuration data for a list of available controls.");
            }
        });
        return {
            messages: this.createValidationMessageArrray(this.validationDefinitions),
            controls: controls
        };
    };
    NgValidations.prototype.createFormWithValidation = function (obj) {
        if (!this.validators || !this.validationDefinitions) {
            console.warn('Service does not have a valid configuration file. Dynamic validations will not be applied');
            return null;
        }
        var form = this.fb.group(obj);
        var displayData = this.bindFormValidations(form);
        return {
            form: form,
            controls: displayData.controls,
            messages: displayData.messages
        };
    };
    NgValidations.prototype.setValidatorDefinitions = function (definitiions) {
        this.validationDefinitions = definitiions;
    };
    NgValidations.prototype.setValidatorConfiguration = function (config) {
        this.validators = config;
    };
    NgValidations.prototype.useDefaultConfig = function () {
        this.setValidatorConfiguration(defaultConfig_1.initialValidationConfig);
        this.setValidatorDefinitions(defaultDefinitions_1.validationDefinitions);
    };
    NgValidations.prototype.updateValidatorDefinitions = function (definitions) {
        for (var def in definitions) {
            if (definitions[def].hasOwnProperty(def) && definitions[def].hasOwnProperty('message'))
                this.validationDefinitions[def] = definitions[def];
            else
                console.warn("Validator \"" + def + "\" is not defined in the proper format and has not been \n\t\t\t\tadded/updated.\n Please see the default validators for a sample of the required format for definitions.");
        }
    };
    NgValidations.prototype.updateValidatorConfig = function (config) {
        for (var ctr in config) {
            if (config[ctr].hasOwnProperty('required') && config[ctr].hasOwnProperty('conditions') && config[ctr].hasOwnProperty('validators'))
                this.validators[ctr] = config[ctr];
            else {
                if (!config[ctr].hasOwnProperty['required'])
                    config[ctr].required = false;
                if (!config[ctr].hasOwnProperty['conditions'])
                    config[ctr].conditions = [];
                if (!config[ctr].hasOwnProperty['validators'])
                    config[ctr].validators = [];
                this.validators[ctr] = config[ctr];
            }
        }
    };
    NgValidations.prototype.updateDefinitionsAndConfig = function (definitions, config) {
        if (!definitions || !config)
            return;
        this.updateValidatorConfig(config);
        this.updateValidatorDefinitions(definitions);
    };
    NgValidations.prototype.updateValidatorMessages = function (validators) {
        var _this = this;
        Object.keys(validators).forEach(function (val) {
            _this.validationDefinitions[val] ? _this.validationDefinitions[val].message = validators[val] :
                console.warn("Unkown validator name " + val + " in updateValidatorMessages()");
        });
    };
    NgValidations.prototype.setConfigurationFromSource = function (url) {
        var _this = this;
        this.http.getData(url)
            .then(function (data) {
            _this.validators = data;
        })
            .catch(function () {
            console.warn("Unable to retrieve validations from \"" + url + "\"...switching to local validator configuration");
        });
    };
    NgValidations.prototype.setDefinitionsFromSource = function (url) {
        var _this = this;
        this.http.getData(url)
            .then(function (data) {
            if (typeof data === 'string')
                _this.validationDefinitions = JSON.parse(data);
            else
                _this.validationDefinitions = data;
        })
            .catch(function () {
            console.warn("Unable to retrieve definitions from \"" + url + "\"...switching to local validation definitions");
        });
    };
    return NgValidations;
}());
NgValidations = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_services_1.HttpService, forms_1.FormBuilder])
], NgValidations);
exports.NgValidations = NgValidations;
//# sourceMappingURL=ng2-validations.service.js.map