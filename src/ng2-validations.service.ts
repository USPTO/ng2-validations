import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms'

import { HttpService } from './http-services';
import { validationDefinitions as defs} from './initial-validation-definitions';

import { initialValidationConfig }  from './initial-validations'; 
import { sampleValidationDefinitions } from './Samples/sample-validation-definitions';

@Injectable()
export class NgValidations {

	public validators = {}; // <+ Object to hold validator configuration. Can be changed with setValidationsWithService() or setValidatorConfiguration()
	public validationDefinitions= {}; // <= Object to hold actual validation functions

	constructor(private http:HttpService, private fb:FormBuilder) {}

	/*
	Method called to bind validations to a form. Simply pass in the form and all validations will be bound, inluding conditionals. 
	This methods returns a object with two keys: 
		1) controls: An array of controls you can later loop through to keep track of each control state
		2) messages: An array of validators with thier messages to use in the html template with *ngFor
			...loop through this to dynamically display error messages on unmet validations
	*/ 
	bindFormValidations(form) {
		if(!this.validators || !this.validationDefinitions) {
			console.warn('Service does not have a valid configuration file. Dynamic validations will not be applied')
			return null
		}
		const formControls = form.controls;
		let controls = [];
		Object.keys(formControls).forEach(control => {
			controls.push({ name: control, controller: form.controls[control]});//<=== Only for display purposes =====
			//Verify control exists on validator service and has conditions
			if(this.validators[control] && this.validators[control].conditions.length) {
				this.bindStaticValidations(formControls[control], control);
				//Bind conditional validatons to controls
				this.handleConditionalValidations(control, form);
			}
			//If control exists on validators wihtout conditions
			else if(this.validators[control]) {
				//Bind static validatons to controls
				this.bindStaticValidations(formControls[control], control);
			}
			// <== If no validation exists log warning and to do nothing ==>
			else console.warn(`Control "${control}" does not exist in confiration data and will not be bound to any validations.\nPlease check the JSON configuration data for a list of available controls.`);
		})

		//Return data to loop through in html template for error messages...
		return {
			messages: this.createValidationMessageArrray(this.validationDefinitions),
			controls: controls 
		}
		
	}	

 	bindStaticValidations(control:FormControl, controlName:string) {
		if(this.validators[controlName]) {
			const vals = this.validators[controlName].validators.map(val => this.validationDefinitions[val][val]);
			const required = this.validators[controlName].required;
			control.setValidators(this.setValidators(vals,required))
			control.updateValueAndValidity();
		}
	}

	handleConditionalValidations(control:string, form:FormGroup) {
		// Identify non-conditional validators for control
		const valControls = this.validators[control].validators || [];
	
		// Identify conditional validators for control
		const conditions:Array<any> = this.validators[control].conditions;

		// Subscribe to form control value changes
		const changes = form.controls[control].valueChanges;
		let conditionsToValidate:Array<any> = [];

		//Execute function on any formControl value change...will update validations if match
		changes.subscribe(value => {
			//Check each condition on value change
			conditions.forEach((condition, index) => {
				const currentControl = form.controls[condition.control];
				const staticValidators =  this.validators[condition.control].validators.map(val => this.validationDefinitions[val][val]);
				const staticRequired = this.validators[condition.control].required || false;
				let conditionalValidators = [];						
				let controlRequired = false;
				// If controls new value matches condition value
				if(currentControl && condition.values.indexOf(value) >= 0) {
					//Add condition to conditionsToValidate
					console.log('Condition Found!');
					conditionsToValidate = [...conditionsToValidate, conditions[index]];
				}
				// If new control value does not match & is in conditionsToValidate array
				else if(currentControl && conditionsToValidate.indexOf(condition) >= 0) {
					// Remove condition
					conditionsToValidate = conditionsToValidate.filter(c => c !== condition);
				}
				//Check is control is required in any of the applied conditions
				controlRequired = (<any>conditionsToValidate).findIndex(control => {
					return control.required === true
				}) >= 0;

				//Map conditionalValidators to validation definitions
				conditionalValidators = conditionsToValidate.map(c => c.tests.map(test => this.validationDefinitions[test][test])).reduce((a,b) => a.concat(b), []); 
				
				//Update form control with new validations 
				currentControl.setValidators([
					...conditionalValidators,
					...staticValidators,
					...this.checkIfRequired(controlRequired, staticRequired)
				]);
				currentControl.updateValueAndValidity();
				
			})
		})
	}

	//Needs to bind form controls to the class that called it to work correctly
	createFormWithValidation(obj) {
		if(!this.validators || !this.validationDefinitions) {
			console.warn('Service does not have a valid configuration file. Dynamic validations will not be applied')
			return null
		}
		let form = this.fb.group(obj);
		let displayData = this.bindFormValidations(form);
		return {
			form: form,
			controls: displayData.controls,
			messages: displayData.messages
		};
	}

	createValidationMessageArrray(validations) {
		let messagesForDisplay = [];
		return Object.keys(validations).map(key => {
				return { name: key, message: validations[key].message}
			});
	}

	setValidators(validators:Array<any>, required?) {
		let vals = validators //.map(val => val.test);
		return required ? [Validators.required, ...vals] : vals;
	}

	checkIfRequired(conditionalReq:boolean, staticReq?:boolean) {
		if(staticReq) return [Validators.required];
		return conditionalReq ? [Validators.required] : [];
	}

	// ***** Methods to set configration and definitions 
	setValidatorDefinitions(definitiions) {
		this.validationDefinitions = definitiions;
	}

	setValidatorConfiguration(config) {
		this.validators = config
	}

	//Use default configurations and definitions
	useDefaultConfig() {
		this.setValidatorConfiguration(initialValidationConfig);
		this.setValidatorDefinitions(sampleValidationDefinitions);
	}

	// ***Call these methods to set validation configuration or definitions from an outside resource***
	setConfigurationFromSource(url) {
		this.http.getData(url)
			.then((data) => {
				this.validators = data;
			})
			.catch(() => {
				console.warn(`Unable to retrieve validations from "${url}"...switching to local validator configuration`);
			})
	}

	setDefinitionsFromSource(url) {
		this.http.getData(url)
			.then((data) => {
				this.validationDefinitions = data;
			})
			.catch(() => {
				console.warn(`Unable to retrieve definitions from "${url}"...switching to local validation definitions`);
			})
	}
}
// ======= End Validation Service =======

