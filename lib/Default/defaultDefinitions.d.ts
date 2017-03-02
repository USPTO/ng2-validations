import { FormControl, FormGroup } from '@angular/forms';
export declare const validationDefinitions: {
    dateFormat: {
        dateFormat: (c: FormControl) => {
            dateFormat: boolean;
        };
        message: string;
    };
    dateRangeGroup: {
        dateRangeGroup: (values: FormGroup) => {
            dateRangeGroup: boolean;
        };
        message: string;
    };
    invalidDate: {
        invalidDate: (c: FormControl) => {
            invalidDate: boolean;
        };
        message: string;
    };
    noFutureDate: {
        noFutureDate: (c: FormControl) => {
            noFutureDate: boolean;
        };
        message: string;
    };
    noSpecialChars: {
        noSpecialChars: (c: FormControl) => {
            noSpecialChars: boolean;
        };
        message: string;
    };
    noSpecialCharsAddress: {
        noSpecialCharsAddress: (c: FormControl) => {
            noSpecialCharsAddress: boolean;
        };
        message: string;
    };
    noSpecialCharsAttorney: {
        noSpecialCharsAttorney: (c: FormControl) => {
            noSpecialCharsAttorney: boolean;
        };
        message: string;
    };
    noSpecialCharsCity: {
        noSpecialCharsCity: (c: FormControl) => {
            noSpecialCharsCity: boolean;
        };
        message: string;
    };
    paymentsRequired: {
        paymentsRequired: (c: FormControl) => {
            paymentsRequired: boolean;
        };
        message: string;
    };
    validEmail: {
        validEmail: (c: FormControl) => {
            validEmail: boolean;
        };
        message: string;
    };
    validPhoneNumberInternational: {
        validPhoneNumberInternational: (values: FormGroup) => {
            validPhoneNumberInternational: boolean;
        };
        message: string;
    };
    validPhoneNumberSimple: {
        simpleValidPhoneNumber: (c: FormControl) => {
            validPhoneNumberSimple: boolean;
        };
    };
    validZipCode: {
        validZipCode: (c: FormControl) => {
            validZipCode: boolean;
        };
        message: string;
    };
};
