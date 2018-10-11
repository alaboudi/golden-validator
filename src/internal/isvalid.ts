import { IRule, ISchema } from './types';

export const doesValuePassRule = (value: any, rule: IRule): boolean => {
  if (value === undefined || value === null) {
    return !rule.required;
  }
  return !rule.validators.some(validator => !validator.evaluator(value));
};

export const isValid = <T>(model: T, schema: ISchema<T>): boolean => {
  const rules = schema.rules;
  const keys = Object.keys(schema.rules) as Array<keyof T>;
  return !keys.some(key => !doesValuePassRule(model[key], rules[key]));
};
