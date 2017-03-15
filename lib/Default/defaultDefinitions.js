"use strict";
var moment = require("moment");
exports.validationDefinitions = {
    dateFormat: {
        dateFormat: function (c) {
            if (!c || !c.value)
                return null;
            if (!moment(c.value, 'MM-DD-YYYY', true).isValid() && !moment(c.value, 'YYYY-MM-DD', true).isValid()) {
                return { dateFormat: false };
            }
            return null;
        },
        message: 'Enter valid date in the format mm/dd/yyyy.'
    },
    dateRangeGroup: {
        dateRangeGroup: function (values) {
            if (!values || !values.controls['dateFrom'] || !values.controls['dateTo']) {
                console.warn("Validator \"dateRangeGroup\" requires dateRange FormGroup with controls: \n\t\t\t\t\"dateFrom, dateTo\". dateRangeGroup validation being ignored.");
                return null;
            }
            var fromDate, toDate;
            fromDate = moment(values.controls['dateFrom']._value, ['MM-DD-YYYY', 'YYYY-MM-DD']).unix();
            toDate = moment(values.controls['dateTo']._value, ['MM-DD-YYYY', 'YYYY-MM-DD']).unix();
            if (toDate < fromDate) {
                return { dateRangeGroup: false };
            }
            return null;
        },
        message: 'From Date must be equal to or less than To Date.'
    },
    firstNameFormat: {
        firstNameFormat: function (c) {
            if (!c || !c.value)
                return null;
            var nameTest = /[^a-z0-9\-_.'\&\(\)\s\,:\/\#\@]/gi;
            return nameTest.test(c.value) ? { firstNameFormat: false } : null;
        },
        message: "First Name is limited to the following characters: Uppercase letters (A\u2014Z), Lowercase letters \n\t\t(a\u2013z), Space ( ), Numbers (0\u20139), Pound Sign (#), Ampersand (&), Apostrophe (\u2018), Left Parenthesis ((), \n\t\tRight Parenthesis ()), Comma (,), Hyphen (-), Period (.), Forward Slash(/), Colon (:), At Sign (@), \n\t\tUnderscore (_)."
    },
    lastNameFormat: {
        lastNameFormat: function (c) {
            if (!c || !c.value)
                return null;
            var nameTest = /[^a-z0-9\-_.'\&\(\)\s\,:\/\#\@]/gi;
            return nameTest.test(c.value) ? { lastNameFormat: false } : null;
        },
        message: "Last Name is limited to the following characters: Uppercase letters (A\u2014Z), Lowercase letters \n\t\t(a\u2013z), Space ( ), Numbers (0\u20139), Pound Sign (#), Ampersand (&), Apostrophe (\u2018), Left Parenthesis ((), \n\t\tRight Parenthesis ()), Comma (,), Hyphen (-), Period (.), Forward Slash(/), Colon (:), At Sign (@), \n\t\tUnderscore (_)."
    },
    invalidDate: {
        invalidDate: function (c) {
            if (!c || !c.value)
                return null;
            if (!moment(c.value, 'MM-DD-YYYY').isValid() && !moment(c.value, 'YYYY-MM-DD').isValid()) {
                return { invalidDate: false };
            }
            return null;
        },
        message: 'Enter valid date in the format mm/dd/yyyy.'
    },
    futureDate: {
        futureDate: function (c) {
            if (!c.value || (!moment(c.value, 'MM-DD-YYYY').isValid() && !moment(c.value, 'YYYY-MM-DD').isValid()))
                return null;
            var format = 'YYYY-MM-DD';
            if (isNaN(moment(c.value, format).unix())) {
                format = 'MM-DD-YYYY';
            }
            var controlDate = moment(c.value, format).unix();
            var now = moment().unix();
            if (controlDate > now) {
                return { futureDate: false };
            }
            return null;
        },
        message: 'Date cannot be in the future.'
    },
    streetLineOne: {
        streetLineOne: function (c) {
            if (!c || !c.value)
                return null;
            var specialChars = /[^a-z0-9\-_.'\&\(\)\s\,:\/\#\@]/gi;
            return specialChars.test(c.value) ? { streetLineOne: false } : null;
        },
        message: "Address Line 1 is limited to the following characters: Uppercase letters (A\u2014Z), Lowercase \n\t\tletters (a\u2013z), Space ( ), Numbers (0\u20139), Pound Sign (#), Ampersand (&), Apostrophe (\u2018), \n\t\tLeft Parenthesis ((), Right Parenthesis ()), Comma (,), Hyphen (-), Period (.), Forward Slash(/), \n\t\tColon (:), At Sign (@), Underscore (_)"
    },
    streetLineTwo: {
        streetLineTwo: function (c) {
            if (!c || !c.value)
                return null;
            var specialChars = /[^a-z0-9\-_.'\&\(\)\s\,:\/\#\@]/gi;
            return specialChars.test(c.value) ? { streetLineTwo: false } : null;
        },
        message: "Address Line 2 is limited to the following characters: Uppercase letters (A\u2014Z), Lowercase \n\t\tletters (a\u2013z), Space ( ), Numbers (0\u20139), Pound Sign (#), Ampersand (&), Apostrophe (\u2018), \n\t\tLeft Parenthesis ((), Right Parenthesis ()), Comma (,), Hyphen (-), Period (.), Forward Slash(/), \n\t\tColon (:), At Sign (@), Underscore (_)"
    },
    noSpecialCharsAttorney: {
        noSpecialCharsAttorney: function (c) {
            if (!c || !c.value)
                return null;
            var specialChars = /[^a-z0-9.-]/gi;
            return specialChars.test(c.value) ? { noSpecialCharsAttorney: false } : null;
        },
        message: 'Invalid attorney docket number.'
    },
    cityFormat: {
        cityFormat: function (c) {
            if (!c.value)
                return null;
            var specialChars = /[^a-z0-9\-_'\s]/gi;
            return specialChars.test(c.value) ? { cityFormat: false } : null;
        },
        message: "City is limited to the following characters: Uppercase letters (A\u2014Z), Lowercase letters (a\u2013z), \n\t\tSpace ( ), Numbers (0\u20139), Hyphen (-), Period (.), Apostrophe (\u2018), Underscore (_)."
    },
    paymentsRequired: {
        paymentsRequired: function (c) {
            if (!c)
                return null;
            if (!c.value || !c.value.length) {
                return { paymentsRequired: false };
            }
            return null;
        },
        message: 'Select at least one payment.'
    },
    validEmail: {
        validEmail: function (c) {
            if (!c || !c.value)
                return null;
            var emailExp = /^[\w+|\.|\+|\-+]+@[\w+]+\.+[a-z.]+$/i;
            return emailExp.test(c.value) ? null : { validEmail: false };
        },
        message: 'Enter Email Address in the format name@host.domain.'
    },
    phoneNumberSimple: {
        phoneNumberSimple: function (c) {
            if (!c || !c.value)
                return null;
            var specialChars = /[^0-9]/g;
            return specialChars.test(c.value) ? { phoneNumberSimple: false } : null;
        },
        message: 'Enter Phone Number in digits only.'
    },
    zipCodeUS: {
        zipCodeUS: function (c) {
            if (!c || !c.value)
                return null;
            var codes = /^\b\d{5}(-\d{4})?\b$/;
            return codes.test(c.value) ? null : { zipCodeUS: false };
        },
        message: 'Enter US Zip/Postal Code in the format of 99999 or 99999-9999.'
    },
    zipCodeForeign: {
        zipCodeForeign: function (c) {
            if (!c || !c.value)
                return null;
            var specialChars = /[^a-z0-9\-_'\s]/gi;
            return specialChars.test(c.value) ? { zipCodeForeign: false } : null;
        },
        message: "Foreign Zip/Postal Code is limited to the following characters: Uppercase letters (A\u2014Z), \n\t\tLowercase letters (a\u2013z), Space ( ), Numbers (0\u20139), Hyphen (-), Period (.), Apostrophe (\u2018), Underscore (_)."
    }
};
//# sourceMappingURL=defaultDefinitions.js.map