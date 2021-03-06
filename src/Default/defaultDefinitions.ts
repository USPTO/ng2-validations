import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';

// ======= Default Test functions for validation =======
// **Important**
// Angular provides the name of the error on its invalid form controls. This structure makes it easy to loop
// through the controls and display their associated error messages in the html template
export const validationDefinitions = {
    dateFormat: {
		dateFormat: function(c: FormControl) {
			if (!c || !c.value) return null;
			if (!moment(c.value, 'MM-DD-YYYY', true).isValid() && !moment(c.value, 'YYYY-MM-DD', true).isValid()) {
				return { dateFormat: false };
			}
			return null;
		},
		message: 'Enter valid date in the format mm/dd/yyyy.'
	},
	dateRangeGroup: {
		dateRangeGroup: function(values: FormGroup) {
			if (!values || !values.controls['dateFrom'] || !values.controls['dateTo']) {
				console.warn(`Validator "dateRangeGroup" requires dateRange FormGroup with controls: 
				"dateFrom, dateTo". dateRangeGroup validation being ignored.`);
				return null;
			}
			let fromDate, toDate;
				fromDate = moment((<any>values).controls['dateFrom']._value, ['MM-DD-YYYY', 'YYYY-MM-DD']).unix();
				toDate = moment((<any>values).controls['dateTo']._value, ['MM-DD-YYYY', 'YYYY-MM-DD']).unix();
				if (toDate < fromDate) {
					return { dateRangeGroup: false};
				}
				return null;
		},
		message: 'From Date must be equal to or less than To Date.'
	},
	firstNameFormat: {
		firstNameFormat: function(c: FormControl) {
			if (!c || !c.value) return null;
			let nameTest =  /[^a-z0-9\-_.'\&\(\)\s\,:\/\#\@]/gi;
			return nameTest.test(c.value) ? { firstNameFormat: false } : null;
		},
		message: `First Name is limited to the following characters: Uppercase letters (A—Z), Lowercase letters 
		(a–z), Space ( ), Numbers (0–9), Pound Sign (#), Ampersand (&), Apostrophe (‘), Left Parenthesis ((), 
		Right Parenthesis ()), Comma (,), Hyphen (-), Period (.), Forward Slash(/), Colon (:), At Sign (@), 
		Underscore (_).`
	},
	lastNameFormat: {
		lastNameFormat: function(c: FormControl) {
			if (!c || !c.value) return null;
			let nameTest =  /[^a-z0-9\-_.'\&\(\)\s\,:\/\#\@]/gi;
			return nameTest.test(c.value) ? { lastNameFormat: false } : null;
		},
		message: `Last Name is limited to the following characters: Uppercase letters (A—Z), Lowercase letters 
		(a–z), Space ( ), Numbers (0–9), Pound Sign (#), Ampersand (&), Apostrophe (‘), Left Parenthesis ((), 
		Right Parenthesis ()), Comma (,), Hyphen (-), Period (.), Forward Slash(/), Colon (:), At Sign (@), 
		Underscore (_).`
	},
	invalidDate: {
		invalidDate: function(c: FormControl) {
			if (!c || !c.value) return null;
			if (!moment(c.value, 'MM-DD-YYYY').isValid() && !moment(c.value, 'YYYY-MM-DD').isValid()) {
				return { invalidDate: false };
			}
			return null;
		},
		message: 'Enter valid date in the format mm/dd/yyyy.'
	},
	futureDate: {
		futureDate: function(c: FormControl) {
            if (!c.value || (!moment(c.value, 'MM-DD-YYYY').isValid() && !moment(c.value, 'YYYY-MM-DD').isValid())) return null;
            let format = 'YYYY-MM-DD';
            if (isNaN(moment(c.value, format).unix())) {
                format = 'MM-DD-YYYY';
            }
			let controlDate = moment(c.value, format).unix();
			let now = moment().unix();
			if (controlDate > now) {
				return { futureDate: false };
			}
			return null;
		},
		message: 'Date cannot be in the future.'
	},
    streetLineOne: {
		streetLineOne: function(c: FormControl) {
			if (!c || !c.value) return null;
			let specialChars = /[^a-z0-9\-_.'\&\(\)\s\,:\/\#\@]/gi;
            return specialChars.test(c.value) ? { streetLineOne: false } : null;
		},
		message: `Address Line 1 is limited to the following characters: Uppercase letters (A—Z), Lowercase 
		letters (a–z), Space ( ), Numbers (0–9), Pound Sign (#), Ampersand (&), Apostrophe (‘), 
		Left Parenthesis ((), Right Parenthesis ()), Comma (,), Hyphen (-), Period (.), Forward Slash(/), 
		Colon (:), At Sign (@), Underscore (_).`
	},
	 streetLineTwo: {
		streetLineTwo: function(c: FormControl) {
			if (!c || !c.value) return null;
			let specialChars = /[^a-z0-9\-_.'\&\(\)\s\,:\/\#\@]/gi;
            return specialChars.test(c.value) ? { streetLineTwo: false } : null;
		},
		message: `Address Line 2 is limited to the following characters: Uppercase letters (A—Z), Lowercase 
		letters (a–z), Space ( ), Numbers (0–9), Pound Sign (#), Ampersand (&), Apostrophe (‘), 
		Left Parenthesis ((), Right Parenthesis ()), Comma (,), Hyphen (-), Period (.), Forward Slash(/), 
		Colon (:), At Sign (@), Underscore (_).`
	},
	noSpecialCharsAttorney: {
		noSpecialCharsAttorney: function(c: FormControl) {
			if (!c || !c.value) return null;
			let specialChars = /[^a-z0-9.-]/gi;
			return specialChars.test(c.value) ? { noSpecialCharsAttorney: false } : null;
		},
		message: 'Invalid attorney docket number.'
	},
    cityFormat: {
		cityFormat: function(c: FormControl) {
			if (!c.value) return null;
			let specialChars = /[^a-z0-9\-_'\s]/gi;
			return specialChars.test(c.value) ? { cityFormat: false } : null;
		},
		message: `City is limited to the following characters: Uppercase letters (A—Z), Lowercase letters (a–z), 
		Space ( ), Numbers (0–9), Hyphen (-), Period (.), Apostrophe (‘), Underscore (_).`
	},
	paymentsRequired: {
		paymentsRequired: function(c: FormControl) {
			if (!c) return null;
			if (!c.value || !c.value.length) {
				return { paymentsRequired: false };
			}
			return null;
		},
		message: 'Select at least one payment from the Payment History.'
	},
    validEmail: {
		validEmail: function(c: FormControl) {
			if (!c || !c.value) return null;
			let emailExp = /^[\w+|\.|\+|\-+]+@[\w+]+\.+[a-z.]+$/i;
			return emailExp.test(c.value) ? null : { validEmail: false };
		},
		message: 'Enter Email Address in the format: name@host.domain.'
	},
	phoneNumberSimple: {
		phoneNumberSimple: function(c: FormControl) {
			if (!c || !c.value) return null;
			let specialChars = /[^0-9]/g;
			return specialChars.test(c.value) ? { phoneNumberSimple: false } : null;
		},
		message: 'Enter Phone Number in digits only.'
	},
	USD: {
		USD: function(c: FormControl) {
			if (!c || !c.value) return null;
			return /^\d+(,\d{3})*(\.[0-9]{2})?$/.test(c.value) ? null : { USD: false };
		},
		message: 'Enter Amount in USD format.'
	},
	zipCodeUS: {
		zipCodeUS: function(c: FormControl) {
			if (!c || !c.value) return null;
			let codes = /^\b\d{5}(-\d{4})?\b$/;
			return codes.test(c.value) ? null : { zipCodeUS: false };
		},
		message: 'Enter US Zip/Postal Code in the format of 99999 or 99999-9999.'
	},
    zipCodeForeign: {
        zipCodeForeign: function(c: FormControl) {
            if (!c || !c.value) return null;
            let specialChars = /[^a-z0-9\-_'\s]/gi;
			 return specialChars.test(c.value) ? { zipCodeForeign: false } : null;
		},
        message: `Foreign Zip/Postal Code is limited to the following characters: Uppercase letters (A—Z), 
		Lowercase letters (a–z), Space ( ), Numbers (0–9), Hyphen (-), Period (.), Apostrophe (‘), Underscore (_).`
    }
};
