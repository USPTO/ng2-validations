import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from './http-services';
export declare class NgValidations {
    private http;
    private fb;
    private validators;
    private validationDefinitions;
    constructor(http: HttpService, fb: FormBuilder);
    private createValidationMessageArrray(validations);
    private setValidators(validators, required?);
    private checkIfRequired(conditionalReq, staticReq?);
    private mapValidators(val);
    private bindStaticValidations(control, controlName);
    private handleConditionalValidations(control, form);
    bindFormValidations(form: any): {
        messages: {
            name: string;
            message: any;
        }[];
        controls: any[];
    };
    createFormWithValidation(obj: any): {
        form: FormGroup;
        controls: any[];
        messages: {
            name: string;
            message: any;
        }[];
    };
    setValidatorDefinitions(definitiions: any): void;
    setValidatorConfiguration(config: any): void;
    useDefaultConfig(): void;
    updateValidatorDefinitions(definitions: {}): void;
    updateValidatorConfig(config: {}): void;
    updateDefinitionsAndConfig(definitions: {}, config: {}): void;
    setConfigurationFromSource(url: any): void;
    setDefinitionsFromSource(url: string): void;
}
