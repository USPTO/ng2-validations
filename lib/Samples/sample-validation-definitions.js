"use strict";
exports.sampleValidationDefinitions = {
    hasLetters: {
        hasLetters: function (c) {
            if (c.value === null || !c.value.length)
                return null;
            var emailValid = /[a-z]/gi;
            return emailValid.test(c.value) ? null : { hasLetters: false };
        },
        message: 'Must contain at least 1 letter'
    },
    usernameLength: {
        usernameLength: function (c) {
            if (c.value === null || !c.value.length)
                return null;
            return c.value.length >= 6 ? null : { usernameLength: false };
        },
        message: 'Must be at least 6 characters'
    },
    validEmail: {
        validEmail: function (c) {
            if (c.value === null || !c.value.length)
                return null;
            var emailExp = /^[a-zA-Z0–9_.+-]+@[a-zA-Z0–9-]+.+[a-zA-Z0–9_.]+$/gi;
            return emailExp.test(c.value) ? null : { validEmail: false };
        },
        message: 'Invalid email: <name>@<host>.<domain>'
    },
    passwordLength: {
        passwordLength: function (c) {
            if (c.value === null || !c.value.length)
                return null;
            return c.value.length >= 10 ? null : { passwordLength: false };
        },
        message: 'Must be at least 10 characters'
    },
    hasSpecialChars: {
        hasSpecialChars: function (c) {
            if (c.value === null || !c.value.length)
                return null;
            var specialChars = /[^a-z0-9]/gi;
            return specialChars.test(c.value) ? null : { hasSpecialChars: false };
        },
        message: 'Must contain at least one special character'
    },
    noSpecialChars: {
        noSpecialChars: function (c) {
            if (c.value === null || !c.value.length)
                return null;
            var specialChars = /[^a-z0-9]/gi;
            return specialChars.test(c.value) ? { noSpecialChars: false } : null;
        },
        message: 'Cannot contain any special characters'
    },
    hasNums: {
        hasNums: function (c) {
            if (c.value === null || !c.value.length)
                return null;
            var digits = /[0-9]/gi;
            return digits.test(c.value) ? null : { hasNums: false };
        },
        message: 'Must contain at least one number 0-9'
    },
    hasUpperCase: {
        hasUpperCase: function (c) {
            if (c.value === null || !c.value.length)
                return null;
            var upper = /[A-Z]/g;
            return upper.test(c.value) ? null : { hasUpperCase: false };
        },
        message: 'Must contain at least one uppercase letter'
    },
    hasLowerCase: {
        hasLowerCase: function (c) {
            if (c.value === null || !c.value.length)
                return null;
            var lower = /[a-z]/g;
            return lower.test(c.value) ? null : { hasLowerCase: false };
        },
        message: 'Must contain at last one lowercase letter'
    },
    datePickerValid: {
        datePickerValid: function (values) {
            if (!values || !values.controls['dateFrom'] || !values.controls['dateTo']) {
                console.warn('Validator "datePickerValid" requires dateRange FormGroup with controls: "dateFrom, dateTo". Datepicker validation being ignored.');
                return null;
            }
            var fromDate, toDate;
            fromDate = new Date(values.controls['dateFrom']._value).getTime();
            toDate = new Date(values.controls['dateTo']._value).getTime();
            if (toDate < fromDate) {
                return { datePickerValid: false };
            }
            return null;
        },
        message: '"Date To" must be equal to or later than "Date From"'
    },
    invalidDate: {
        invalidDate: function (c) {
            if (c.value === null || !c.value.length)
                return null;
            if (isNaN(new Date(c.value).getTime()))
                return { invalidDate: false };
            return null;
        },
        message: 'Invalid date'
    }
};
var defs = {
    hasLetters: function (c) {
        if (c.value === null)
            return null;
        var emailValid = /[a-z]/gi;
        return emailValid.test(c.value) ? null : { hasLetters: false };
    },
    usernameLength: function (c) {
        if (c.value === null)
            return null;
        return c.value.length >= 6 ? null : { usernameLength: false };
    },
    validEmail: function (c) {
        if (c.value === null)
            return null;
        var emailExp = /^[a-zA-Z0–9_.+-]+@[a-zA-Z0–9-]+.+[a-zA-Z0–9_.]+$/gi;
        return emailExp.test(c.value) ? null : { validEmail: false };
    },
    passwordLength: function (c) {
        if (c.value === null)
            return null;
        return c.value.length >= 10 ? null : { passwordLength: false };
    },
    hasSpecialChars: function (c) {
        if (c.value === null)
            return null;
        var specialChars = /[^a-z0-9]/gi;
        return specialChars.test(c.value) ? null : { hasSpecialChars: false };
    },
    noSpecialChars: function (c) {
        if (c.value === null)
            return null;
        var specialChars = /[^a-z0-9]/gi;
        return specialChars.test(c.value) ? { noSpecialChars: false } : null;
    },
    hasNums: function (c) {
        if (c.value === null)
            return null;
        var digits = /[0-9]/gi;
        return digits.test(c.value) ? null : { hasNums: false };
    },
    hasUpperCase: function (c) {
        if (c.value === null)
            return null;
        var upper = /[A-Z]/g;
        return upper.test(c.value) ? null : { hasUpperCase: false };
    },
    hasLowerCase: function (c) {
        if (c.value === null)
            return null;
        var lower = /[a-z]/g;
        return lower.test(c.value) ? null : { hasLowerCase: false };
    },
    datePickerValid: function (values) {
        if (!values || !values.controls['dateFrom'] || !values.controls['dateTo']) {
            console.warn('Validator "datePickerValid" requires dateRange FormGroup with controls: "dateFrom, dateTo". Datepicker validation being ignored.');
            return null;
        }
        var fromDate, toDate;
        fromDate = new Date(values.controls['dateFrom']._value).getTime();
        toDate = new Date(values.controls['dateTo']._value).getTime();
        if (toDate < fromDate) {
            return { datePickerValid: false };
        }
        return null;
    },
    invalidDate: function (c) {
        console.log('date', c);
        if (c.value === null || !c.value.length)
            return null;
        if (isNaN(new Date(c.value).getTime()))
            return { invalidDate: false };
        return null;
    }
};
//# sourceMappingURL=sample-validation-definitions.js.map