import { doesValuePassRule, isValid } from './isvalid';
import { IRule, ISchema, IValidator, ObjectType } from './types';

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
    const rule: IRule = { validators: [fakePassingValidator], _type: ObjectType.Rule };
    const schema = { name: rule };
    const value = { name: 'yazan alaboudi' };
    expect(isValid(value, schema)).toBe(true);
  });
  it('should return false if object fails all schema rules', () => {
    const rule: IRule = { validators: [fakeFailingValidator], _type: ObjectType.Rule };
    const schema = { name: rule };
    const value = { name: 'yazan alaboudi' };
    expect(isValid(value, schema)).toBe(false);
  });
  it('should return false if object key fails at least one rule in schema', () => {
    const schema: ISchema<any> = {
      firstName: { validators: [fakePassingValidator], _type: ObjectType.Rule },
      lastName: { validators: [fakeFailingValidator], _type: ObjectType.Rule },
    };
    const value = {
      firstName: 'yazan',
      lastName: 'alaboudi',
    };
    expect(isValid(value, schema)).toBe(false);
  });
  it('should return false if the schema key is not present in the object but is required', () => {
    const schema: ISchema<any> = {
      firstName: {
        _type: ObjectType.Rule,
        validators: [fakePassingValidator],
      },
      lastName: {
        _type: ObjectType.Rule,
        required: true,
        validators: [fakePassingValidator],
      },
    };
    const value = {
      firstName: 'yazan',
    };
    expect(isValid(value, schema)).toBe(false);
  });
});
