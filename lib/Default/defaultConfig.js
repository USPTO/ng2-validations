"use strict";
exports.initialValidationConfig = {
    'attorneyDocketNumber': {
        'validators': ['noSpecialCharsAttorney'],
        'conditions': [],
        'required': false
    },
    'city': {
        'validators': ['noSpecialCharsCity'],
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
            { 'control': 'stateName', 'values': ['United States', 'UNITED STATES'], 'tests': [], 'required': true },
            { 'control': 'zipCode', 'values': ['United States', 'UNITED STATES'], 'tests': ['validZipCode'], 'required': true }
        ],
        'required': true
    },
    'dateFrom': {
        'validators': ['dateFormat', 'noFutureDate'],
        'conditions': [],
        'required': false
    },
    'dateTo': {
        'validators': ['dateFormat', 'noFutureDate'],
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
        'validators': [],
        'conditions': [],
        'required': true
    },
    'lastName': {
        'validators': [],
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
        'validators': [],
        'conditions': [],
        'required': true
    },
    'phoneNumberGroup': {
        'validators': ['validPhoneNumberInternational'],
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
        'validators': ['noSpecialCharsAddress'],
        'conditions': [],
        'required': true
    },
    'streetLineTwo': {
        'validators': ['noSpecialCharsAddress'],
        'conditions': [],
        'required': false
    },
    'zipCode': {
        'validators': [],
        'conditions': [],
        'required': false
    }
};
//# sourceMappingURL=defaultConfig.js.map