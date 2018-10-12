import { IRule, ISchema, IValidator, ValidationErrors } from './types';

export const doesValuePassValidator = (value: any, validator: IValidator) => {
  try {
    return validator.evaluator(value);
  } catch {
    return false;
  }
};

export const doesValuePassRule = (value: any, rule: IRule): boolean => {
  if (value === undefined || value === null) {
    return !rule.required;
  }
  return !rule.validators.some(validator => !doesValuePassValidator(value, validator));
};

export const isValid = <T>(model: T, schema: ISchema<T>): boolean => {
  const rules = schema.rules;
  const keys = Object.keys(rules) as Array<keyof T>;
  return !keys.some(key => !doesValuePassRule(model[key], rules[key]));
};
