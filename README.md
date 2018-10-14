[![Build Status](https://travis-ci.com/alaboudi/golden-validator.svg?branch=master)](https://travis-ci.com/alaboudi/golden-validator)
[![npm](https://img.shields.io/npm/v/golden-validator.svg)](https://npmjs.com/package/golden-validator)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/alaboudi/golden-validator/blob/master/LICENSE)



*THIS LIBRARY IS STILL IN DEVELOPMENT AND IN ALPHA. THIS IS A GREAT TIME TO
GET INVOLVED WITH CONTRIBUTING TO THIS LIBRARY. ALTHOUGH IT WORKS, USE IT
AT YOUR OWN RISK.*

# Golden Validator

The easy peasy validation library!


Validation is not new and generally present as a feature of a larger framework. With that, the objective of this library
is to have a standalone validation tool that can be used anywhere Javascript is used. It is heavily
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

## Usage

First, start by creating a schema to act as a constraint for your model. Use
the `createSchema` and `createRule`  methods along with the prebuilt validators
to establish a schema.
```javascript
// schema.js
import {
    isString,
    isEmail,
    isBetween,
    hasMaxLengthOf,
    createRule,
    createSchema
} from 'golden-validator';

nameRule = createRule({
    required: true,
    validators: [ isString() ]
});

emailRule = createRule({
    required: true,
    validators: [ isEmail(), hasMaxLengthOf(5) ]
});

ageRule = createRule({
    validator: [ isBetween(18, 60) ]
});

export const userSchema = createSchema<User>({
    name: nameRule,
    email: emailRule,
    age: ageRule
});
```

Afterwards you can validate your model to see if it violates any
rule in your schema. The `validate` method can be used to obtain array of errors
corresponding to each key in the model. If a model field has no error,
the value is an empty array.
```javascript
// example1.js
import { validate } from 'golden-validator';
import { userSchema } from './schema.js';

const user: User = {
    email: 'john.doe@test',
}

validationResult: ValidationResult<User> = validate(user, userSchema);
console.log(validationResult);

/*
{
    name: ['value is required'],
    email: ['value is not an email', 'value length is greater than 5'],
    age: []
}
/*
```

The example above is meant to demonstrate some rules that the library
follows to generate error messages:
* If a value is not required and is not present, no error will be reported
and an empty array will be returned.
* If a value is required but not present, only the requirement constraint will
be generated.
* If a value is present but fails certain validators, an array of corresponding
error messages will be returned. If all validators pass, an empty array
will be returned.



If you are only concerned with a simple answer regarding whether or not the model
has met the rules in the schema, you can take advantage of the `isValid`
method. Using this method is advised as it has been optimized to return
an answer when the result becomes immediately evident throughout the evaluation.

```javascript
// example2.js
import { isValid } from 'golden-validator';
import { userSchema } from './schema.js';

const user: User = {
    email: 'john.doe@test',
}

isUserValid = isValid(user, userSchema);
console.log(isUserValid); // false
```

## Validators

From the perspective of this library, a validator is an object with 2 keys,
`evaluator` and `errorMessage`. The `evaluator` is a function that takes in
a value and returns a boolean. The `errorMessage` is a string
that represents the error message returned when the value does not pass
the evaluator. For example:

```javascript
const isGreaterThan10Validator = {
    evaluator: (value) => value > 10,
    errorMessage: 'value is not greater than 10'
}
```

You can then use `isGreaterThan10Validator` as a member of the schema's
validator array. But rather than hard coding the constraint into the evaluator
function and error message, it makes more sense to invoke functions that
take constraints as arguments and return an evaluator. For example:

```javascript
const isGreaterThan = (constraint) => {
    evaluator: (value) => value > constraint,
    errorMessage: `value is not greater than ${constraint}`
}
```

Rather than trying to write all these validators from scratch, this library
includes validators that would typically be used in most applications.

### Built-in Validator Factories

|Validator Factories  	|Function Signature   	            |
|---	                |---	                            |
|`hasLengthOf`          |`(number) => Validator`            |
|`hasMinLengthOf`       |`(number) => Validator`            |
|`inEnum`               |`(array) => Validator`             |
|`isBetween`            |`(number, number) => Validator`    |
|`isEmail`              |`( ) => Validator`                 |
|`isEqualTo`            |`(any) => Validator`               |
|`isFalsy`              |`( ) => Validator`                 |
|`isGreaterThan`        |`(number) => Validator`            |
|`isLessThan`           |`(number) => Validator`            |
|`isNumber`             |`( ) => Validator`                 |
|`isTruthy`             |`( ) => Validator`                 |

*Note: If you believe that a fundamental validator factory is missing from
the library, please raise an issue and the need of the validator will be
assessed by the maintainers. The idea here is to organically expand the
list of validator factories based on input from the community.*

### Custom Usage
It is easy to write your own validators if you believe the required functionality
is not part of this library. For example, let's write a custom validator to
check whether or not a substring is included in a string.

```javascript
const hasSubstring: ValidatorFactory = substring => ({
    evaluator: value => value.includes(substring);
    errorMessage: `does not contain ${substring}`;
})

// then you can use it in a schema as such
const userSchema = createSchema<User>({
    domain: createRule({
        required: true
        validators: [
            hasSubstring('http://'),
            ...
        ]
    }):

})
```

You can then use the custom validator and include it in the validators array
as seen in the example above. To decouple and easily test your code further,
you can use a utility function to create your validators.

```javascript
import { createValidatorFactory } from 'golden-validator';

const createHasSubstringEvaluator = substring => value => value.includes(substring);
const hasSubstringErrorMessage = substring => `value does not contain ${substring}`;

const hasSubstring = createValidatorFactory(
  createHasSubstringEvaluator,
  hasSubstringErrorMessage
);
```