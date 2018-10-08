[![Build Status](https://travis-ci.com/alaboudi/golden-validator.svg?branch=master)](https://travis-ci.com/alaboudi/golden-validator)
[![npm](https://img.shields.io/npm/v/golden-validator.svg)](https://npmjs.com/package/golden-validator)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/alaboudi/golden-validator/blob/master/LICENSE)



*THIS LIBRARY IS STILL IN DEVELOPMENT AND IN ALPHA. THIS IS A GREAT TIME TO
GET INVOLVED WITH CONTRIBUTING TO THIS LIBRARY. ALTHOUGH IT WORKS, USE IT
AT YOUR OWN RISK.*

# Golden Validator

The easy peasy validation library!


Validation is not new, but it is generally present as a feature of a larger framework. The objectives of this library
is to have a stand alone validation library that can be used on used anywhere javascript is used. This library is heavily
inspired by the functional programming paradigm and even supports Typescript.

## Installation
If you use yarn
```
yarn add golden-validator
```
If you use npm
```
npm install golden-validator 
```

## Basic Usage
```javascript
import { isGreaterThan, createSchema, createRule, isValid } from 'golden-validator';
const user: User = {
    age: 50
};

const userSchema = createSchema<User>({
    age: createRule({
        required: true,
        validators: [
            isGreaterThan(18),
            ...
        ]
    })
});

isValid(user, userSchema) // boolean
```

## Custom Usage
It is easy to write your own validators if you believe the required functionality
is not part of this library. For example, let's write a custom validator to
check whether or not a substring is included in a string.

```javascript
const hasSubstring: ValidatorFactory = substring => ({
    evaluator: value => value.includes(substring);
    errorMessage: 'does not contain substring';
})

// then you can use it in a schema as such
const userSchema = createSchema<User>({
    email: {
        required: true
        validators: [
            hasSubstring('@'),
            ...
        ]
    }:

})
```

You can then use the custom validator and include it in the validators array
as seen in the example above. To decouple and easily test your code further,
you can use a utility function to create your validators.

```javascript
import { createValidatorFactory } from 'golden-validator';

const createHasSubstringEvaluator = substring => value => value.includes(substring);
const hasHasSubstringErrorMessage = substring => 'value does not contain substring';

const hasSubstring = createValidatorFactory(
  createHasSubstringEvaluator,
  hasHasSubstringErrorMessage
);
```