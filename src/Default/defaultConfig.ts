// Initial configuration file for validators
// Written as a TS Object but using simple JSON Object will work as well
export const initialValidationConfig = {
    'attorneyDocketNumber': {
        'validators': [],
		'conditions': [],
		'required': false
    },
    'city': {
        'validators': ['cityFormat'],
		'conditions': [],
		'required': true
    },
	'countryCode': {
		'validators': [],
		'conditions': [],
		'required': true
	},
	 'countryName': {
        'validators': [],
		'conditions': [
			{'control': 'stateName', 'values': ['United States', 'UNITED STATES'], 'tests': [], 'required': true},
            {'control': 'zipCode', 'values': ['United States', 'UNITED STATES'], 'tests': ['zipCodeUS'], 'required': true}
		],
		'required': true
    },
	'dateFrom': {
		'validators': ['dateFormat'],
		'conditions': [],
		'required': false
	},
	'dateTo': {
		'validators': ['dateFormat'],
		'conditions': [],
		'required': false
	},
    'dateRange': {
		'validators': ['dateRangeGroup'],
		'conditions': [],
		'required': false
	},
    'email': {
		'validators': ['validEmail'],
		'conditions': [],
		'required': false
	},
    'firstName': {
        'validators': ['firstNameFormat'],
		'conditions': [],
		'required': true
    },
    'lastName': {
        'validators': ['lastNameFormat'],
		'conditions': [],
		'required': true
    },
	'mailingAddress': {
        'validators': [],
		'conditions': [],
		'required': false
    },
	 'paymentItems': {
        'validators': ['paymentsRequired'],
		'conditions': [],
		'required': true
    },
    'phoneNumber': {
        'validators': ['phoneNumberSimple'],
		'conditions': [],
		'required': true
    },
    'stateCode': {
		'validators': [],
		'conditions': [],
		'required': false
	},
	'stateName': {
		'validators': [],
		'conditions': [],
		'required': false
	},
    'streetLineOne': {
        'validators': ['streetLineOne'],
		'conditions': [],
		'required': true
    },
     'streetLineTwo': {
        'validators': ['streetLineTwo'],
		'conditions': [],
		'required': false
    },
    'zipCode': {
        'validators': ['zipCodeForeign'],
		'conditions': [],
		'required': false
    }
};
