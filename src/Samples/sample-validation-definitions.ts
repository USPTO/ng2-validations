import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
// import libphonenumber from 'google-libphonenumber';
import { PhoneNumberUtil } from 'google-libphonenumber';

// Sample validations. This was used in the constructor as an example.

// ======= Test functions for validation =======
// **Important**
// Angular provides the name of the error on its invalid form controls. This structure makes it easy to loop
// through the controls and display their associated error messages in the html template
export const validationDefinitions = {
	hasLetters: {
		hasLetters: function(c: FormControl) {
			if (!c.value) return null;
			let emailValid = /[a-z]/gi;
			return emailValid.test(c.value) ? null : { hasLetters: false };
		},
		message: 'Must contain at least 1 letter'
	},
	usernameLength: {
		usernameLength: function(c: FormControl) {
			if (!c.value) return null;
			return c.value.length >= 6 ? null : { usernameLength: false };
		},
		message: 'Must be at least 6 characters'
	},
	validEmail: {
		validEmail: function(c: FormControl) {
			if (!c.value) return null;
			let emailExp = /^[a-zA-Z0–9_.+-]+@[a-zA-Z0–9-]+.+[a-zA-Z0–9_.]+$/gi;
			return emailExp.test(c.value) ? null : { validEmail: false };
		},
		message: 'Invalid email: <name>@<host>.<domain>'
	},
	passwordLength: {
		passwordLength: function(c: FormControl) {
			if (!c.value) return null;
			return c.value.length >= 10 ? null : { passwordLength: false };
		},
		message: 'Must be at least 10 characters'
	},
	hasSpecialChars: {
		hasSpecialChars: function(c: FormControl) {
			if (!c.value) return null;
			let specialChars = /[^a-z0-9]/gi;
			return specialChars.test(c.value) ? null : { hasSpecialChars: false };
		},
		message: 'Must contain at least one special character'
	},
	noSpecialChars: {
		noSpecialChars: function(c: FormControl) {
			if (!c.value) return null;
			let specialChars = /[^a-z0-9.-]/gi;
			return specialChars.test(c.value) ? { noSpecialChars: false } : null;
		},
		message: 'Cannot contain any special characters'
	},
	hasNums: {
			hasNums: function(c: FormControl) {
			if (!c.value) return null;
			let digits = /[0-9]/gi;
			return digits.test(c.value) ? null : { hasNums: false };
		},
		message: 'Must contain at least one number 0-9'
	},
	hasUpperCase: {
		hasUpperCase: function(c: FormControl) {
			if (!c.value) return null;
			let upper = /[A-Z]/g;
			return upper.test(c.value) ? null : { hasUpperCase: false };
		},
		message: 'Must contain at least one uppercase letter'
	},
	hasLowerCase: {
		hasLowerCase: function(c: FormControl) {
			if (!c.value) return null;
			let lower = /[a-z]/g;
			return lower.test(c.value) ? null : { hasLowerCase: false };
		},
		message: 'Must contain at last one lowercase letter'
	},
	datePickerValid: {
		datePickerValid: function(values: FormGroup) {
			if (!values || !values.controls['dateFrom'] || !values.controls['dateTo']) {
				console.warn('Validator "datePickerValid" requires dateRange FormGroup with controls: "dateFrom, dateTo". Datepicker validation being ignored.');
				return null;
			}
			let fromDate, toDate;
				fromDate = moment((<any>values).controls['dateFrom']._value).unix();
				toDate = moment((<any>values).controls['dateTo']._value).unix();
				if (toDate < fromDate) {
					return { datePickerValid: false};
				}
				return null;
		},
		message: '"From Date" must be equal to or less than "To Date"'
	},
	invalidDate: {
		invalidDate: function(c: FormControl) {
			if (!c.value) return null;
			if (!moment(c.value).isValid()) {
				return { invalidDate: false };
			}
			return null;
		},
		message: 'Invalid date'
	},
	dateFormat: {
		dateFormat: function(c: FormControl) {
			if (!c.value) return null;
			if (!moment(c.value, 'MM-DD-YYYY').isValid()) {
				return { dateFprmat: false };
			}
			return null;
		},
		message: 'Date format must be MMDDYYYY'
	},
	noFutureDate: {
		noFutureDate : function(c: FormControl) {
			if (!c.value || !moment(c.value).isValid()) return null;
			let controlDate = moment(c.value).unix();
			let now = moment().unix();
			if (controlDate > now) {
				return { noFutureDate: false };
			}
			return null;
		},
		message: 'Dates cannot be in the future'
	},
	validPhoneNumber: {
		validPhoneNumber: function(c: FormControl) {
			if (!c.value) return null;
			const phoneUtil = PhoneNumberUtil.getInstance();
			if (!phoneUtil.isValid(phoneUtil.parse(c.value))) {
				return { validPhoneNumber: false};
			}
			return null;
		},
		message: 'Please enter a valid phone number'

	}
};

/*
You can also define the validators as an object and refer to it in the validationDefinition object...
	export const sampleValidationDefinitions = {
		hasLetters: {
			hasLetters: defs.hasLetters,
			message: 'Must contain at least 1 letter'
		},
*/
 // tslint:disable-next-line:no-unused-variable
 const defs = {
	hasLetters: function(c: FormControl) {
		if (c.value === null) return null;
		let emailValid = /[a-z]/gi;
		return emailValid.test(c.value) ? null : { hasLetters: false };
	},
	usernameLength: function(c: FormControl) {
		if (c.value === null) return null;
		return c.value.length >= 6 ? null : { usernameLength: false };
	},
	validEmail: function(c: FormControl) {
		if (c.value === null) return null;
		let emailExp = /^[a-zA-Z0–9_.+-]+@[a-zA-Z0–9-]+.+[a-zA-Z0–9_.]+$/gi;
		return emailExp.test(c.value) ? null : { validEmail: false };
	},
	passwordLength: function(c: FormControl) {
		if (c.value === null) return null;
		return c.value.length >= 10 ? null : { passwordLength: false };
	},
	hasSpecialChars: function(c: FormControl) {
		if (c.value === null) return null;
		let specialChars = /[^a-z0-9]/gi;
		return specialChars.test(c.value) ? null : { hasSpecialChars: false };
	},
	noSpecialChars: function(c: FormControl) {
		if (c.value === null) return null;
		let specialChars = /[^a-z0-9]/gi;
		return specialChars.test(c.value) ? { noSpecialChars: false } : null;
	},
	hasNums: function(c: FormControl) {
		if (c.value === null) return null;
		let digits = /[0-9]/gi;
		return digits.test(c.value) ? null : { hasNums: false };
	},
	hasUpperCase: function(c: FormControl) {
		if (c.value === null) return null;
		let upper = /[A-Z]/g;
		return upper.test(c.value) ? null : { hasUpperCase: false };
	},
	hasLowerCase: function(c: FormControl) {
		if (c.value === null) return null;
		let lower = /[a-z]/g;
		return lower.test(c.value) ? null : { hasLowerCase: false };
	},
	datePickerValid: function(values: FormGroup) {
		if (!values || !values.controls['dateFrom'] || !values.controls['dateTo']) {
			console.warn('Validator "datePickerValid" requires dateRange FormGroup with controls: "dateFrom, dateTo". Datepicker validation being ignored.');
			return null;
		}
		let fromDate, toDate;
			fromDate = new Date((<any>values).controls['dateFrom']._value).getTime();
			toDate = new Date((<any>values).controls['dateTo']._value).getTime();
			if (toDate < fromDate) {
				return { datePickerValid: false};
			}
			return null;
	}
};
