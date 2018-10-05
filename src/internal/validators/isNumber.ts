import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createIsNumberEvaluator: EvaluatorFactory = () => value => typeof value === 'number';
export const createIsNumberMessage: ErrorMessageFactory = () => `property is not a number`;

export const isNumber: ValidatorFactory = createValidatorFactory(createIsNumberEvaluator, createIsNumberMessage);
