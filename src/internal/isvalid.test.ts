import { doesValuePassRule, doesValuePassValidator, getRuleErrors, isValid, validate } from './isvalid';
import { IRule, ISchema, IValidator, ObjectType, ValidationErrors } from './types';

describe('doesValuPassValidator', () => {
  it('should return true if value does pass the validator evaluator', () => {
    const fakeBooleanValidator: IValidator = {
      errorMessage: '',
      evaluator: someBoolean => someBoolean,
    };
    expect(doesValuePassValidator(true, fakeBooleanValidator)).toBe(true);
  });
  it('should return true if value does pass the validator evaluator', () => {
    const fakeBooleanValidator: IValidator = {
      errorMessage: '',
      evaluator: someBoolean => someBoolean,
    };
    expect(doesValuePassValidator(false, fakeBooleanValidator)).toBe(false);
  });
  it('should return false if an error was thrown', () => {
    const fakeErrorThrowingValidator: IValidator = {
      errorMessage: '',
      evaluator: () => {
        throw new Error();
      },
    };
    expect(doesValuePassValidator('someValue', fakeErrorThrowingValidator)).toBe(false);
  });
});

describe('doesValuePassRule', () => {
  const fakeTruthyValidator: IValidator = {
    errorMessage: 'truthy validator failed',
    evaluator: value => value,
  };
  const fakeFalsyValidator: IValidator = {
    errorMessage: 'falsy validator failed',
    evaluator: value => !value,
  };
  it('should return true if no value is present and the value is not required as per rule', () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: false,
      validators: [],
    };
    const value = null;
    expect(doesValuePassRule(value, rule)).toBe(true);
  });
  it('should return false if no value is present and the value is required as per rule', () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [],
    };
    const value = null;
    expect(doesValuePassRule(value, rule)).toBe(false);
  });
  it("should return true if the value is present and the rule's validators array is empty", () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [],
    };
    const value = 1;
    expect(doesValuePassRule(value, rule)).toBe(true);
  });
  it('should return true if the value returns a true value if passed through validator function', () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [fakeTruthyValidator],
    };
    const value = true;
    expect(doesValuePassRule(value, rule)).toBe(true);
  });
  it('should return false if the value returns a false value if passed through validator function', () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [fakeTruthyValidator],
    };
    const value = false;
    expect(doesValuePassRule(value, rule)).toBe(false);
  });
  it('should run through every single evaluator in the array and return false if one fails', () => {
    const rule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [fakeTruthyValidator, fakeFalsyValidator],
    };
    const value = true;
    expect(doesValuePassRule(value, rule)).toBe(false);
  });
});

describe('isValid', () => {
  const fakePassingValidator: IValidator = {
    errorMessage: 'my error message',
    evaluator: () => true,
  };
  const fakeFailingValidator: IValidator = {
    errorMessage: 'my error message',
    evaluator: () => false,
  };
  it('should return true if object passes all schema rules', () => {
    interface IFakeUser {
      name: string;
    }
    const rule: IRule = { validators: [fakePassingValidator], _type: ObjectType.Rule };
    const schema: ISchema<IFakeUser> = { rules: { name: rule }, _type: ObjectType.Schema };
    const value = { name: 'yazan alaboudi' };
    expect(isValid(value, schema)).toBe(true);
  });
  it('should return false if object fails all schema rules', () => {
    interface IFakeUser {
      name: string;
    }
    const rule: IRule = { validators: [fakeFailingValidator], _type: ObjectType.Rule };
    const schema: ISchema<IFakeUser> = { rules: { name: rule }, _type: ObjectType.Schema };
    const value = { name: 'yazan alaboudi' };
    expect(isValid(value, schema)).toBe(false);
  });
  it('should return false if object key fails at least one rule in schema', () => {
    interface IFakeUser {
      firstName: string;
      lastName: string;
    }
    const schema: ISchema<IFakeUser> = {
      _type: ObjectType.Schema,
      rules: {
        firstName: { validators: [fakePassingValidator], _type: ObjectType.Rule },
        lastName: { validators: [fakeFailingValidator], _type: ObjectType.Rule },
      },
    };
    const value = {
      firstName: 'yazan',
      lastName: 'alaboudi',
    };
    expect(isValid(value, schema)).toBe(false);
  });
  it('should return false if the schema key is not present in the object but is required', () => {
    interface IFakeUser {
      firstName: string;
      lastName: string;
    }
    const schema: ISchema<IFakeUser> = {
      _type: ObjectType.Schema,
      rules: {
        firstName: {
          _type: ObjectType.Rule,
          validators: [fakePassingValidator],
        },
        lastName: {
          _type: ObjectType.Rule,
          required: true,
          validators: [fakePassingValidator],
        },
      },
    };
    const value = {
      firstName: 'yazan',
    };
    expect(isValid(value, schema)).toBe(false);
  });
  it('should return true if schema presented has a sub-schema and value passes both schemas', () => {
    interface IFakePet {
      breed: string;
    }
    const petSchema: ISchema<IFakePet> = {
      _type: ObjectType.Schema,
      rules: {
        breed: {
          _type: ObjectType.Rule,
          validators: [fakePassingValidator],
        },
      },
    };
    interface IFakeUser {
      firstName: string;
      lastName: string;
      pet: IFakePet;
    }
    const userSchema: ISchema<IFakeUser> = {
      _type: ObjectType.Schema,
      rules: {
        firstName: {
          _type: ObjectType.Rule,
          validators: [fakePassingValidator],
        },
        lastName: {
          _type: ObjectType.Rule,
          required: true,
          validators: [fakePassingValidator],
        },
        pet: petSchema,
      },
    };
    const value: IFakeUser = {
      firstName: 'yazan',
      lastName: 'alaboudi',
      pet: {
        breed: 'some-breed',
      },
    };
    expect(isValid(value, userSchema)).toBe(true);
  });
  it('should return false if subschema rules are not met', () => {
    interface IFakePet {
      breed: string;
    }
    const petSchema: ISchema<IFakePet> = {
      _type: ObjectType.Schema,
      rules: {
        breed: {
          _type: ObjectType.Rule,
          validators: [fakePassingValidator],
        },
      },
    };
    interface IFakeUser {
      firstName: string;
      lastName: string;
      pet: IFakePet;
    }
    const userSchema: ISchema<IFakeUser> = {
      _type: ObjectType.Schema,
      rules: {
        firstName: {
          _type: ObjectType.Rule,
          validators: [fakePassingValidator],
        },
        lastName: {
          _type: ObjectType.Rule,
          required: true,
          validators: [fakeFailingValidator],
        },
        pet: petSchema,
      },
    };
    const value: IFakeUser = {
      firstName: 'yazan',
      lastName: 'alaboudi',
      pet: {
        breed: 'some-breed',
      },
    };
    expect(isValid(value, userSchema)).toBe(false);
  });
});

describe('getRuleErrors', () => {
  const fakeTruthyValidator: IValidator = {
    errorMessage: 'this should not show up',
    evaluator: () => true,
  };
  const fakeFalsyValidator: IValidator = {
    errorMessage: 'bazinga',
    evaluator: () => false,
  };
  const fakeFalsyValidator2: IValidator = {
    errorMessage: 'bowow',
    evaluator: () => false,
  };
  it('should return an array of validator error messages if the validators fail', () => {
    const fakeRule: IRule = {
      _type: ObjectType.Rule,
      required: false,
      validators: [fakeTruthyValidator, fakeFalsyValidator, fakeFalsyValidator2],
    };
    expect(getRuleErrors(123, fakeRule)).toEqual(['bazinga', 'bowow']);
  });
  it('should return an empty array if the value is not required and not present', () => {
    const fakeRule: IRule = {
      _type: ObjectType.Rule,
      required: false,
      validators: [fakeTruthyValidator, fakeFalsyValidator, fakeFalsyValidator2],
    };
    expect(getRuleErrors(undefined, fakeRule)).toEqual([]);
  });
  it('should return an array of validator error messages along with the "required" error message', () => {
    const fakeRule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [fakeTruthyValidator, fakeFalsyValidator, fakeFalsyValidator2],
    };
    expect(getRuleErrors(null, fakeRule)).toEqual(['A value is required']);
  });
});

describe('validation', () => {
  interface IFakeUser {
    name: string;
    age: number;
  }
  const fakeTruthyValidator: IValidator = {
    errorMessage: 'error message 1',
    evaluator: () => true,
  };
  const fakeFalsyValidator: IValidator = {
    errorMessage: 'error message 2',
    evaluator: () => false,
  };
  const fakeRule: IRule = {
    _type: ObjectType.Rule,
    required: true,
    validators: [fakeTruthyValidator, fakeFalsyValidator],
  };
  const fakeRule2: IRule = {
    _type: ObjectType.Rule,
    required: false,
    validators: [fakeTruthyValidator, fakeFalsyValidator],
  };
  it('should return correct object of error message arrays when only rules are passed in', () => {
    const fakeUserSchema: ISchema<IFakeUser> = {
      _type: ObjectType.Schema,
      rules: {
        age: fakeRule2,
        name: fakeRule,
      },
    };
    const fakeUser: IFakeUser = {
      age: 18,
      name: null as any,
    };
    const expectedValidationErrors: ValidationErrors<IFakeUser> = {
      age: ['error message 2'],
      name: ['A value is required'],
    };
    expect(validate(fakeUser, fakeUserSchema)).toEqual(expectedValidationErrors);
  });
  it('should return correct object of error message arrays when supplied with a subschema', () => {
    interface IPet {
      breed: string;
    }
    const fakePet: IPet = {
      breed: 'some breed',
    };
    interface IUser {
      name: string;
      pet: IPet;
    }
    const fakeUser: IUser = {
      name: 'name',
      pet: fakePet,
    };
    const fakePetSchema: ISchema<IPet> = {
      _type: ObjectType.Schema,
      rules: {
        breed: fakeRule,
      },
    };
    const fakeUserSchema: ISchema<IUser> = {
      _type: ObjectType.Schema,
      rules: {
        name: fakeRule,
        pet: fakePetSchema,
      },
    };
    expect(validate(fakeUser, fakeUserSchema)).toEqual({
      name: ['error message 2'],
      pet: {
        breed: ['error message 2'],
      },
    });
  });
});
