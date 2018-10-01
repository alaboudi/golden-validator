import { IRule } from './types';

export const doesValuePassRule = (value: any, rule: IRule): boolean => {
  if (value === undefined || value === null) {
    return !rule.required;
  }
  return rule.validators.map(validator => validator.evaluator(value)).reduce((acc, curr) => acc && curr, true);
};
