import { FormControl, FormGroup } from '@angular/forms';

// ======= Test functions for validation =======
export const validationDefinitions = {
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
	},
	invalidDate: function(c: FormControl) {
		console.log('date', c);
		if (c.value === null || !c.value.length) return null;
		if (isNaN(new Date(c.value).getTime()))
			return {invalidDate: false};
		return null;
	}
};
