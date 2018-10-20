import { IRule, ISchema, ObjectType } from './types';
import { isNullOrUndefined, isRule, isSchema } from './utils';

describe('isNullOrUndefined', () => {
  it('should return true if input is null', () => {
    expect(isNullOrUndefined(null)).toBe(true);
  });
  it('should return true if input is undefined', () => {
    expect(isNullOrUndefined(undefined)).toBe(true);
  });
  it('should return false if input is number', () => {
    expect(isNullOrUndefined(123)).toBe(false);
  });
});

describe('isRule', () => {
  const rule: IRule = {
    _type: ObjectType.Rule,
    required: true,
    validators: [],
  };
  const schema: ISchema<any> = {
    _type: ObjectType.Schema,
    rules: {},
  };
  it('should return false if input is string', () => {
    expect(isRule('hi')).toBe(false);
  });
  it('should return false if input is number', () => {
    expect(isRule(123)).toBe(false);
  });
  it('should return false if input is a non-rule object', () => {
    expect(isRule({})).toBe(false);
  });
  it('should return true if input is rule', () => {
    expect(isRule(rule)).toBe(true);
  });
  it('should return false if input is schema', () => {
    expect(isRule(schema)).toBe(false);
  });
});

describe('isSchema', () => {
  const rule: IRule = {
    _type: ObjectType.Rule,
    required: true,
    validators: [],
  };
  const schema: ISchema<any> = {
    _type: ObjectType.Schema,
    rules: {},
  };

  it('should return false if input is string', () => {
    expect(isSchema('hi')).toBe(false);
  });
  it('should return false if input is number', () => {
    expect(isSchema(123)).toBe(false);
  });
  it('should return false if input is a non-rule object', () => {
    expect(isSchema({})).toBe(false);
  });
  it('should return false if input is rule', () => {
    expect(isSchema(rule)).toBe(false);
  });
  it('should return true if input is schema', () => {
    expect(isSchema(schema)).toBe(true);
  });
});
