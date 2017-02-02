// Initial configuration file for validators
// Only written as an object so require() doesn't throw an error whie transpiling
export const initialValidationConfig = {
	'username': {
		'validators': ['hasLetters', 'usernameLength'],
		'conditions': [],
		'required': true
	},
	'email': {
		'validators': ['validEmail'],
		'conditions': [
			{'control': 'username', 'values': ['hi', 'bye'], 'tests': ['hasSpecialChars']}
		],
		'required': true
	},
	'password': {
		'validators': ['hasLowerCase', 'hasUpperCase', 'hasSpecialChars', 'passwordLength', 'hasNums'],
		'conditions': [],
		'required': true
	},
	'country': {
		'validators': [],
		'conditions': [
			{'control': 'state', 'values': 'US', 'tests': [], 'required': true},
			{'control': 'state', 'values': 'CA', 'tests': [], 'required': true}
		],
		'required': true
	},
	'state': {
		'validators': ['hasLetters'],
		'conditions': [],
		'required': false
	},
	'datePicker': {
		'validators': ['datePickerValid'],
		'conditions': [],
		'required': false
	},
	'dateFrom':{
		'validators': ['invalidDate', 'dateFormat'],
		'conditions': [],
		'required': false
	},
	'dateTo':{
		'validators': ['invalidDate', 'dateFormat'],
		'conditions': [],
		'required': false
	},
	'phoneNumber': {
		'validators': ['validPhoneNumber'],
		'conditions': [],
		'required': true
	}
};
