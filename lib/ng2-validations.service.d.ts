import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { HttpService } from './http-services';
export declare class NgValidations {
    private http;
    private fb;
    private validators;
    private validationDefinitions;
    constructor(http: HttpService, fb: FormBuilder);
    bindFormValidations(form: any): {
        messages: {
            name: string;
            message: any;
        }[];
        controls: any[];
    };
    bindStaticValidations(control: FormControl, controlName: string): void;
    handleConditionalValidations(control: string, form: FormGroup): void;
    createFormWithValidation(obj: any): {
        form: FormGroup;
        controls: any[];
        messages: {
            name: string;
            message: any;
        }[];
    };
    createValidationMessageArrray(validations: any): {
        name: string;
        message: any;
    }[];
    setValidators(validators: Array<any>, required?: any): any[];
    checkIfRequired(conditionalReq: boolean, staticReq?: boolean): ((control: AbstractControl) => {
        [key: string]: boolean;
    })[];
    setValidatorDefinitions(definitiions: any): void;
    setValidatorConfiguration(config: any): void;
    useDefaultConfig(): void;
    setConfigurationFromSource(url: any): void;
    setDefinitionsFromSource(url: string): void;
}
