import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createIsEmailEvaluator: EvaluatorFactory = () => value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
export const createIsEmailMessage: ErrorMessageFactory = () => `property is not an email`;

export const isEmail: ValidatorFactory = createValidatorFactory(createIsEmailEvaluator, createIsEmailMessage);
