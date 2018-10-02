import { IRule, ISchema } from './types';

export const doesValuePassRule = (value: any, rule: IRule): boolean => {
  if (value === undefined || value === null) {
    return !rule.required;
  }
  return rule.validators.reduce((acc, validator) => acc && validator.evaluator(value), true);
};

export const isValid = (value: any, schema: ISchema<any>): boolean =>
  Object.keys(schema).reduce((acc, key) => {
    return doesValuePassRule(value[key], schema[key]) && acc;
  }, true);
