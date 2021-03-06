import { IRule, ISchema, IValidator, ValidationErrors } from './types';
import { isNullOrUndefined, isRule, isSchema } from './utils';

const REQUIRED_ERROR_MESSAGE = 'A value is required';

export const doesValuePassValidator = (value: any, validator: IValidator) => {
  try {
    return validator.evaluator(value);
  } catch {
    return false;
  }
};

export const doesValuePassRule = (value: any, rule: IRule): boolean =>
  isNullOrUndefined(value)
    ? !rule.required
    : !rule.validators.some(validator => !doesValuePassValidator(value, validator));

export const isValid = <T>(model: T, schema: ISchema<T>): boolean => {
  const rules = schema.rules;
  const keys = Object.keys(rules) as Array<keyof T>;
  return !keys.some(key => {
    const ruleOrSchema = rules[key];
    const value = model[key];
    return isRule(ruleOrSchema)
      ? !doesValuePassRule(value, ruleOrSchema as IRule)
      : !isValid(value, ruleOrSchema as ISchema<any>);
  });
};

export const getRuleErrorWhenValueUnavailable = (
  rule: IRule,
  requiredMessage: string = REQUIRED_ERROR_MESSAGE,
): string[] => {
  return rule.required ? [requiredMessage] : [];
};

export const getRuleErrorWhenValueAvailable = (value: any, rule: IRule): string[] => {
  return rule.validators.reduce(
    (errors: string[], validator) =>
      doesValuePassValidator(value, validator) ? errors : [...errors, validator.errorMessage],
    [],
  );
};

export const getRuleErrors = (value: any, rule: IRule): string[] => {
  return isNullOrUndefined(value)
    ? getRuleErrorWhenValueUnavailable(rule)
    : getRuleErrorWhenValueAvailable(value, rule);
};

export const validate = <T>(model: T, schema: ISchema<T>): ValidationErrors<T> => {
  const rules = schema.rules;
  const keys = Object.keys(rules) as Array<keyof T>;
  return keys.reduce((validationErrors: ValidationErrors<T>, key) => {
    const ruleOrSchema = rules[key];
    const value = model[key];
    return {
      ...(validationErrors as any),
      [key]: isRule(ruleOrSchema)
        ? getRuleErrors(value, ruleOrSchema as IRule)
        : validate(value, ruleOrSchema as ISchema<any>),
    };
  }, {});
};
