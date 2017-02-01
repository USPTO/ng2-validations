"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var http_services_1 = require("./http-services");
var ng2_validations_service_1 = require("./ng2-validations.service");
var NgValidationsModule = (function () {
    function NgValidationsModule() {
    }
    return NgValidationsModule;
}());
NgValidationsModule = __decorate([
    core_1.NgModule({
        imports: [forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule],
        providers: [http_services_1.HttpService, ng2_validations_service_1.NgValidations],
        exports: []
    })
], NgValidationsModule);
exports.NgValidationsModule = NgValidationsModule;
//# sourceMappingURL=main.module.js.map