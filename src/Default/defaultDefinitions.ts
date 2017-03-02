import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { PhoneNumberUtil } from 'google-libphonenumber';

// ======= Test functions for validation =======
// **Important**
// Angular provides the name of the error on its invalid form controls. This structure makes it easy to loop
// through the controls and display their associated error messages in the html template
export const validationDefinitions = {
    dateFormat: {
		dateFormat: function(c: FormControl) {
			if (!c.value) return null;
			if (!moment(c.value, 'MM-DD-YYYY', true).isValid() && !moment(c.value, 'YYYY-MM-DD', true).isValid()) {
				return { dateFormat: false };
			}
			return null;
		},
		message: 'Date format must be MMDDYYYY'
	},
	dateRangeGroup: {
		dateRangeGroup: function(values: FormGroup) {
			if (!values || !values.controls['dateFrom'] || !values.controls['dateTo']) {
				console.warn('Validator "dateRangeGroup" requires dateRange FormGroup with controls: "dateFrom, dateTo". dateRangeGroup validation being ignored.');
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
		message: '"From Date" must be equal to or less than "To Date"'
	},
	invalidDate: {
		invalidDate: function(c: FormControl) {
			if (!c.value) return null;
			if (!moment(c.value, 'MM-DD-YYYY').isValid() && !moment(c.value, 'YYYY-MM-DD').isValid()) {
				return { invalidDate: false };
			}
			return null;
		},
		message: 'Date format must be MMDDYYYY'
	},
	noFutureDate: {
		noFutureDate : function(c: FormControl) {
            if (!c.value || (!moment(c.value, 'MM-DD-YYYY').isValid() && !moment(c.value, 'YYYY-MM-DD').isValid())) return null;
            let format = 'YYYY-MM-DD';
            if (isNaN(moment(c.value, format).unix())) {
                format = 'MM-DD-YYYY';
            }
			let controlDate = moment(c.value, format).unix();
			let now = moment().unix();
			if (controlDate > now) {
				return { noFutureDate: false };
			}
			return null;
		},
		message: 'Dates cannot be in the future'
	},
    noSpecialChars: {
		noSpecialChars: function(c: FormControl) {
			if (!c.value) return null;
			let specialChars = /[^a-z0-9.-]/gi;
			return specialChars.test(c.value) ? { noSpecialChars: false } : null;
		},
		message: 'Cannot contain any special characters'
	},
    noSpecialCharsAddress: {
		noSpecialCharsAddress: function(c: FormControl) {
			if (!c.value) return null;
			let specialChars = /[^a-z0-9,.-]/gi;
			let letters = /[a-z]/gi;
			let test = c.value.replace(/[\W_]/gi, '');
			if (!test.length) return null;
            return (!letters.test(test)) || specialChars.test(test) ? { noSpecialCharsAddress: false } : null;
		},
		message: 'Please enter a valid address'
	},
	noSpecialCharsAttorney: {
		noSpecialCharsAttorney: function(c: FormControl) {
			if (!c.value) return null;
			let specialChars = /[^a-z0-9.-]/gi;
			return specialChars.test(c.value) ? { noSpecialCharsAttorney: false } : null;
		},
		message: 'Please enter a valid attorney docket number'
	},
    noSpecialCharsCity: {
		noSpecialCharsCity: function(c: FormControl) {
			if (!c.value) return null;
			let specialChars = /[^a-z.-]/gi;
			let letters = /[a-z]/gi;
			let test = c.value.replace(/[\W_]/gi, '');
			if (!test.length) return null;
			return specialChars.test(test) && !letters.test(test) ? { noSpecialCharsCity: false } : null;
		},
		message: 'Please enter a valid city'
	},
	paymentsRequired: {
		paymentsRequired: function(c: FormControl) {
			if (!c) return null;
			if (!c.value || !c.value.length) {
				return { paymentsRequired: false };
			}
			return null;
		},
		message: 'Please select at least one payment from the payment history table'
	},
    validEmail: {
		validEmail: function(c: FormControl) {
			if (!c.value) return null;
			let emailExp = /^[a-zA-Z0–9_.+-]+@[a-zA-Z0–9-]+.+[a-zA-Z0–9_.]+$/gi;
			return emailExp.test(c.value) ? null : { validEmail: false };
		},
		message: 'Please enter a valid email'
	},
	validPhoneNumberInternational: {
		validPhoneNumberInternational: function(values: FormGroup) {
			if (!values || !values.controls['phoneNumber'] || !values.controls['countryCode']) {
				console.warn('Validator "validPhoneNumberInternational" requires "phoneNumberGroup" FormGroup with controls: "phoneNumber" and "countryCode". Phone validation being ignored.');
				return null;
			}
            let phone = (<any>values).controls['phoneNumber']._value,
				code = (<any>values).controls['countryCode']._value,
				l = /[a-z]/gi;
			if (!phone || !code) {
                return null;
            }
			const phoneUtil = PhoneNumberUtil.getInstance();
			if (l.test(phone)) return { validPhoneNumberInternational: false};
			try {
				if (!phoneUtil.isValidNumber(phoneUtil.parse(phone, code))) {
					return { validPhoneNumberInternational: false};
				}
			} catch (error) {
				return { validPhoneNumberInternational: false};
			}
			return null;
		},
		message: 'Please enter a valid phone number'
	},
	validPhoneNumberSimple: {
		simpleValidPhoneNumber: function(c: FormControl) {
			if (!c.value) return null;
			let specialChars = /[^a-z0-9.-]/gi;
			if (c.value.length < 10 || c.value.length > 18 || specialChars.test(c.value)) {
				return { validPhoneNumberSimple: false };
			}
			return null;
		}
	},
    validZipCode: {
        validZipCode: function(c: FormControl) {
            if (!c.value) return null;
            let specialChars = /[^0-9-]/gi;
			 return specialChars.test(c.value) ? { validZipCode: false } : null;
		},
        message: 'Invalid zip code'
    }
};
