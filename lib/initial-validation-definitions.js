"use strict";
exports.validationDefinitions = {
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
        console.log("date", c);
        if (c.value === null || !c.value.length)
            return null;
        if (isNaN(new Date(c.value).getTime()))
            return { invalidDate: false };
        return null;
    }
};
//# sourceMappingURL=initial-validation-definitions.js.map