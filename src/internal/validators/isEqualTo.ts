import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createIsEqualToEvaluator: EvaluatorFactory = constraint => value => value === constraint;
export const createIsEqualToMessage: ErrorMessageFactory = constraint => `value is not equal to ${constraint}`;

export const isEqualTo: ValidatorFactory = createValidatorFactory(createIsEqualToEvaluator, createIsEqualToMessage);
