[![Build Status](https://travis-ci.com/alaboudi/golden-validator.svg?branch=master)](https://travis-ci.com/alaboudi/golden-validator)

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
const user = {
    age: 50
};

const userSchema = createSchema({
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