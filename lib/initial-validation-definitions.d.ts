import { FormControl, FormGroup } from '@angular/forms';
export declare const validationDefinitions: {
    hasLetters: (c: FormControl) => {
        hasLetters: boolean;
    };
    usernameLength: (c: FormControl) => {
        usernameLength: boolean;
    };
    validEmail: (c: FormControl) => {
        validEmail: boolean;
    };
    passwordLength: (c: FormControl) => {
        passwordLength: boolean;
    };
    hasSpecialChars: (c: FormControl) => {
        hasSpecialChars: boolean;
    };
    noSpecialChars: (c: FormControl) => {
        noSpecialChars: boolean;
    };
    hasNums: (c: FormControl) => {
        hasNums: boolean;
    };
    hasUpperCase: (c: FormControl) => {
        hasUpperCase: boolean;
    };
    hasLowerCase: (c: FormControl) => {
        hasLowerCase: boolean;
    };
    datePickerValid: (values: FormGroup) => {
        datePickerValid: boolean;
    };
    invalidDate: (c: FormControl) => {
        invalidDate: boolean;
    };
};
