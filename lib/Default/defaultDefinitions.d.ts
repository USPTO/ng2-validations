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
    firstNameFormat: {
        firstNameFormat: (c: FormControl) => {
            firstNameFormat: boolean;
        };
        message: string;
    };
    lastNameFormat: {
        lastNameFormat: (c: FormControl) => {
            lastNameFormat: boolean;
        };
        message: string;
    };
    invalidDate: {
        invalidDate: (c: FormControl) => {
            invalidDate: boolean;
        };
        message: string;
    };
    futureDate: {
        futureDate: (c: FormControl) => {
            futureDate: boolean;
        };
        message: string;
    };
    streetLineOne: {
        streetLineOne: (c: FormControl) => {
            streetLineOne: boolean;
        };
        message: string;
    };
    streetLineTwo: {
        streetLineTwo: (c: FormControl) => {
            streetLineTwo: boolean;
        };
        message: string;
    };
    noSpecialCharsAttorney: {
        noSpecialCharsAttorney: (c: FormControl) => {
            noSpecialCharsAttorney: boolean;
        };
        message: string;
    };
    cityFormat: {
        cityFormat: (c: FormControl) => {
            cityFormat: boolean;
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
    phoneNumberSimple: {
        phoneNumberSimple: (c: FormControl) => {
            phoneNumberSimple: boolean;
        };
        message: string;
    };
    USD: {
        USD: (c: FormControl) => {
            USD: boolean;
        };
        message: string;
    };
    zipCodeUS: {
        zipCodeUS: (c: FormControl) => {
            zipCodeUS: boolean;
        };
        message: string;
    };
    zipCodeForeign: {
        zipCodeForeign: (c: FormControl) => {
            zipCodeForeign: boolean;
        };
        message: string;
    };
};
