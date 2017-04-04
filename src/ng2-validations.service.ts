import { Injectable } from '@angular/core';
// tslint:disable-next-line:no-unused-variable
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Response } from '@angular/http';

import { HttpService } from './http-services';
// import { validationDefinitions as defs } from './initial-validation-definitions';

import { initialValidationConfig }  from './Default/defaultConfig';
import { validationDefinitions } from './Default/defaultDefinitions';

@Injectable()
export class NgValidations {

	private validators = {}; // <+ Object to hold validator configuration. Can be changed with setValidationsWithService() or setValidatorConfiguration()
	private validationDefinitions= {}; // <= Object to hold actual validation functions

	constructor(private http: HttpService, private fb: FormBuilder) {
		this.mapValidators = this.mapValidators.bind(this);
		this.useDefaultConfig();
	}

	private createValidationMessageArrray(validations) {
		// tslint:disable-next-line:no-unused-variable
		let messagesForDisplay = [];
		return Object.keys(validations).map(key => {
				return { name: key, message: validations[key].message};
			});
	}

	private setValidators(validators: Array<any>, required?) {
		let vals = validators; // .map(val => val.test)
		return required ? [Validators.required, ...vals] : vals;
	}

	private checkIfRequired(conditionalReq: boolean, staticReq?: boolean) {
		if (staticReq) return [Validators.required];
		return conditionalReq ? [Validators.required] : [];
	}

	private mapValidators(val) {
		const f = (c) => null;
		try {
			let test = this.validationDefinitions[val][val];
			return test;
		} catch (error) {
			console.error(`Definition "${val}" missing from validator definitions file.`);
			return f;
		}
	}

 	private bindStaticValidations(control: FormControl, controlName: string) {
		if (this.validators[controlName]) {
			const vals = this.validators[controlName].validators.map(this.mapValidators);
			const required = this.validators[controlName].required;
			control.setValidators(this.setValidators(vals, required));
			control.updateValueAndValidity();
		}
	}

	private handleConditionalValidations(control: string, form: FormGroup) {
		// Identify conditional validators for control
		const conditions = this.validators[control].conditions;

		// Subscribe to form control value changes
		const changes = form.controls[control].valueChanges;
		let conditionsToValidate: Array<any> = [];
		// Execute function on any formControl value change...will update validations if match
		changes.subscribe(value => {
			// Check each condition on value change
			conditions.forEach((condition, index) => {
				const currentControl = form.controls[condition.control];
				const staticValidators =  this.validators[condition.control].validators.map(this.mapValidators);
				const staticRequired = this.validators[condition.control].required || false;
				let conditionalValidators = [];
				let controlRequired = false;
				let requiredValidators = [];
				let found;

				// Check for match in condition values array
				condition.values.forEach(exp => {
					// Assign variable to expression to avoid advancing past previous match
					exp.flags = exp.flags || '';
					let reg = new RegExp(exp.pattern, exp.flags);
					if (reg.test(value)) found = true;
				});

				if (currentControl && found && conditionsToValidate.indexOf(condition) < 0) {
					// Add condition to conditionsToValidate
					conditionsToValidate = [...conditionsToValidate, conditions[index]];
				}
				// If new control value does not match & is in conditionsToValidate array
				// tslint:disable-next-line:one-line
				else if (currentControl && !found && conditionsToValidate.indexOf(condition) >= 0) {
					// Remove condition
					// console.log('Removed', condition);
					conditionsToValidate = conditionsToValidate.filter(c => JSON.stringify(c) !== JSON.stringify(condition));
				}
				// Check if control is required in any of the applied conditions
				controlRequired = (<any>conditionsToValidate).findIndex(formControl => {
					return formControl.required === true;
				}) >= 0;

				// Map conditionalValidators to validation definitions
				conditionalValidators = conditionsToValidate.filter(c => c.control === condition.control).map(c => c.tests.map(this.mapValidators)).reduce((a, b) => a.concat(b), []);
				requiredValidators = this.checkIfRequired(controlRequired, staticRequired);
				// Update form control with new validations
					currentControl.setValidators([
						...conditionalValidators,
						...staticValidators,
						...requiredValidators
					]);
				currentControl.updateValueAndValidity();
			});
		});
	}

	/*
	Method called to bind validations to a form. Simply pass in the form and all validations will be bound, inluding conditionals.
	This methods returns a object with two keys:
		1) controls: An array of controls you can later loop through to keep track of each control state
		2) messages: An array of validators with thier messages to use in the html template with *ngFor
			...loop through this to dynamically display error messages on unmet validations
	*/
	public bindFormValidations(form) {
		if (!this.validators || !this.validationDefinitions) {
			console.warn('Service does not have a valid configuration file. Dynamic validations will not be applied');
			return null;
		}
		const formControls = form.controls;
		let controls = [];
		Object.keys(formControls).forEach(control => {
			controls.push({ name: control, controller: form.controls[control]});
			// Verify control exists on validator service and has conditions
			if (this.validators[control] && this.validators[control].conditions.length) {
				this.bindStaticValidations(formControls[control], control);
				// Bind conditional validatons to controls
				this.handleConditionalValidations(control, form);
			}
			// If control exists on validators wihtout conditions
			// tslint:disable-next-line:one-line
			else if (this.validators[control]) {
				// Bind static validatons to controls
				this.bindStaticValidations(formControls[control], control);
			}
			// <== If no validation exists log warning and to do nothing ==>
			// tslint:disable-next-line:one-line
			else {
				console.warn(`Control "${control}" does not exist in confiration data and will not be bound to any validations.\nPlease check the JSON configuration data for a list of available controls.`);
			}
		});
		// Return data to loop through in html template for error messages...
		return {
			messages: this.createValidationMessageArrray(this.validationDefinitions),
			controls: controls
		};

	}

	// Needs to bind form controls to the class that called it to work correctly
	public createFormWithValidation(obj) {
		if (!this.validators || !this.validationDefinitions) {
			console.warn('Service does not have a valid configuration file. Dynamic validations will not be applied');
			return null;
		}
		let form = this.fb.group(obj);
		let displayData = this.bindFormValidations(form);
		return {
			form: form,
			controls: displayData.controls,
			messages: displayData.messages
		};
	}

	// ***** Methods to set configration and definitions
	public setValidatorDefinitions(definitiions) {
		this.validationDefinitions = definitiions;
	}

	public setValidatorConfiguration(config) {
		this.validators = config;
	}

	// Use default configurations and definitions
	public useDefaultConfig() {
		this.setValidatorConfiguration(initialValidationConfig);
		this.setValidatorDefinitions(validationDefinitions);
	}

	// ***Add or Modify Validations ***
	public updateValidatorDefinitions(definitions: {}) {
		for (let def in definitions) {
			if (definitions[def].hasOwnProperty(def) && definitions[def].hasOwnProperty('message'))
				this.validationDefinitions[def] = definitions[def];
			else
				console.warn(`Validator "${def}" is not defined in the proper format and has not been 
				added/updated.\n Please see the default validators for a sample of the required format for definitions.`);
		}
	}

	public updateValidatorConfig(config: {}) {
		for (let ctr in config) {
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
	}

	public updateDefinitionsAndConfig(definitions: {}, config: {}) {
		if (!definitions || !config) return;
		this.updateValidatorConfig(config);
		this.updateValidatorDefinitions(definitions);
	}

	public updateValidatorMessages(validators: {}) {
		Object.keys(validators).forEach(val => {
			this.validationDefinitions[val] ? this.validationDefinitions[val].message = validators[val] :
			console.warn(`Unkown validator name ${val} in updateValidatorMessages()`);
		});
	}

	// ***Call these methods to set validation configuration or definitions from an outside resource***
	public setConfigurationFromSource(url) {
		this.http.getData(url)
			.then((data: Response) => {
				this.validators = data;
			})
			.catch(() => {
				console.warn(`Unable to retrieve validations from "${url}"...switching to local validator configuration`);
			});
	}

	public setDefinitionsFromSource(url: string) {
		this.http.getData(url)
			.then((data: string | Response) => {
				if (typeof data === 'string' )
					this.validationDefinitions = JSON.parse(data);
				else
					this.validationDefinitions = data;
			})
			.catch(() => {
				console.warn(`Unable to retrieve definitions from "${url}"...switching to local validation definitions`);
			});
	}
}
// ======= End Validation Service =======

