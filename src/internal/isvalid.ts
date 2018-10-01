import { IRule } from './types';

export const doesValuePassRule = (value: any, rule: IRule): boolean => {
  if (value === undefined || value === null) {
    return !rule.required;
  }
  return rule.validators.reduce((acc, validator) => acc && validator.evaluator(value), true);
};
