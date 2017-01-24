export declare const initialValidationConfig: {
    'username': {
        'validators': string[];
        'conditions': any[];
        'required': boolean;
    };
    'email': {
        'validators': string[];
        'conditions': {
            'control': string;
            'values': string[];
            'tests': string[];
        }[];
        'required': boolean;
    };
    'password': {
        'validators': string[];
        'conditions': any[];
        'required': boolean;
    };
    'country': {
        'validators': any[];
        'conditions': {
            'control': string;
            'values': string;
            'tests': any[];
            'required': boolean;
        }[];
        'required': boolean;
    };
    'state': {
        'validators': string[];
        'conditions': any[];
        'required': boolean;
    };
    'datePicker': {
        'validators': string[];
        'conditions': any[];
        'required': boolean;
    };
    'dateFrom': {
        'validators': string[];
        'conditions': any[];
        'required': boolean;
    };
    'dateTo': {
        'validators': string[];
        'conditions': any[];
        'required': boolean;
    };
};
