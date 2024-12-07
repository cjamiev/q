export const RandomType = {
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  EMAIL: 'Email',
  CITY: 'City',
  STATE: 'State',
  STREET: 'Street',
  ZIP_CODE: 'Zip Code',
  SSN: 'Social Security Number',
  PHONE_NUMBER: 'Phone Number',
  CREDIT_CARD: 'Credit Card Number',
  UUID: 'uuid',
  DATE: 'Date',
  BOOLEAN: 'Boolean',
  CUSTOM_STATE: 'Custom State',
  CUSTOM_STRING: 'Custom String'
};
export const fieldTypes = [
  {
    variableName: RandomType.FIRST_NAME,
    randomType: RandomType.FIRST_NAME,
    userOptions: '',
    builtInOptions: [],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.LAST_NAME,
    randomType: RandomType.LAST_NAME,
    userOptions: '',
    builtInOptions: [],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.EMAIL,
    randomType: RandomType.EMAIL,
    userOptions: '',
    builtInOptions: ['Name', 'Words'],
    selectedBuiltInOptions: 'Words',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.ZIP_CODE,
    randomType: RandomType.ZIP_CODE,
    userOptions: '',
    builtInOptions: ['#####', '#########', '#####-####'],
    selectedBuiltInOptions: '#####',
    dataType: ['string', 'number'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.PHONE_NUMBER,
    randomType: RandomType.PHONE_NUMBER,
    userOptions: '',
    builtInOptions: ['###-###-####', '##########'],
    selectedBuiltInOptions: '###-###-####',
    dataType: ['string', 'number'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.SSN,
    randomType: RandomType.SSN,
    userOptions: '',
    builtInOptions: ['###-##-####', '#########'],
    selectedBuiltInOptions: '###-##-####',
    dataType: ['string', 'number'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.CREDIT_CARD,
    randomType: RandomType.CREDIT_CARD,
    userOptions: '',
    builtInOptions: ['####-####-####-####', '################'],
    selectedBuiltInOptions: '####-####-####-####',
    dataType: ['string', 'number'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.UUID,
    randomType: RandomType.UUID,
    userOptions: '',
    builtInOptions: ['&&&&&&&&-&&&&-&&&&-&&&&-&&&&&&&&&&&&', '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&'],
    selectedBuiltInOptions: '&&&&&&&&-&&&&-&&&&-&&&&-&&&&&&&&&&&&',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.DATE,
    randomType: RandomType.DATE,
    userOptions: '',
    builtInOptions: ['MM/DD/YYYY', 'MM/DD/YY', , 'YYYY/MM/DD', 'MM-DD-YYYY', 'MM-DD-YY', 'YYYY-MM-DD'],
    selectedBuiltInOptions: 'MM/DD/YYYY',
    dataType: ['date', 'string'],
    selectedDataType: 'date',
    formType: ['text', 'date'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.BOOLEAN,
    randomType: RandomType.BOOLEAN,
    userOptions: 'On, Off',
    builtInOptions: [],
    selectedBuiltInOptions: '',
    dataType: ['boolean', 'string'],
    selectedDataType: 'boolean',
    formType: ['radio'],
    selectedFormType: 'switch'
  },
  {
    variableName: RandomType.CITY,
    randomType: RandomType.CITY,
    userOptions: '',
    builtInOptions: ['City Only', 'City And State'],
    selectedBuiltInOptions: 'City Only',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.STATE,
    randomType: RandomType.STATE,
    userOptions: '',
    builtInOptions: [],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.STREET,
    randomType: RandomType.STREET,
    userOptions: '',
    builtInOptions: ['Street Only', 'Full Address'],
    selectedBuiltInOptions: 'Street Only',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  },
  {
    variableName: RandomType.CUSTOM_STATE,
    randomType: RandomType.CUSTOM_STATE,
    userOptions: '',
    builtInOptions: [],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['checkbox', 'radio', 'select'],
    selectedFormType: 'checkbox'
  },
  {
    variableName: RandomType.CUSTOM_STRING,
    randomType: RandomType.CUSTOM_STRING,
    userOptions: '',
    builtInOptions: [],
    selectedBuiltInOptions: '',
    dataType: ['string'],
    selectedDataType: 'string',
    formType: ['text'],
    selectedFormType: 'text'
  }
];
