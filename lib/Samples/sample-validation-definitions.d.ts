import { FormControl, FormGroup } from '@angular/forms';
export declare const validationDefinitions: {
    hasLetters: {
        hasLetters: (c: FormControl) => {
            hasLetters: boolean;
        };
        message: string;
    };
    usernameLength: {
        usernameLength: (c: FormControl) => {
            usernameLength: boolean;
        };
        message: string;
    };
    validEmail: {
        validEmail: (c: FormControl) => {
            validEmail: boolean;
        };
        message: string;
    };
    passwordLength: {
        passwordLength: (c: FormControl) => {
            passwordLength: boolean;
        };
        message: string;
    };
    hasSpecialChars: {
        hasSpecialChars: (c: FormControl) => {
            hasSpecialChars: boolean;
        };
        message: string;
    };
    noSpecialChars: {
        noSpecialChars: (c: FormControl) => {
            noSpecialChars: boolean;
        };
        message: string;
    };
    hasNums: {
        hasNums: (c: FormControl) => {
            hasNums: boolean;
        };
        message: string;
    };
    hasUpperCase: {
        hasUpperCase: (c: FormControl) => {
            hasUpperCase: boolean;
        };
        message: string;
    };
    hasLowerCase: {
        hasLowerCase: (c: FormControl) => {
            hasLowerCase: boolean;
        };
        message: string;
    };
    datePickerValid: {
        datePickerValid: (values: FormGroup) => {
            datePickerValid: boolean;
        };
        message: string;
    };
    invalidDate: {
        invalidDate: (c: FormControl) => {
            invalidDate: boolean;
        };
        message: string;
    };
    dateFormat: {
        dateFormat: (c: FormControl) => {
            dateFormat: boolean;
        };
        message: string;
    };
    noFutureDate: {
        noFutureDate: (c: FormControl) => {
            noFutureDate: boolean;
        };
        message: string;
    };
    validPhoneNumberInternational: {
        validPhoneNumberInternational: (values: FormGroup) => {
            validPhoneNumberInternational: boolean;
        };
        message: string;
    };
    simpleValidPhoneNumber: {
        simpleValidPhoneNumber: (c: FormControl) => {
            simpleValidPhoneNumber: boolean;
        };
    };
};
