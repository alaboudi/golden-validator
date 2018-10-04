import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createIsLessThanEvaluator: EvaluatorFactory = constraint => value => value < constraint;
export const createIsLessThanErrorMessage: ErrorMessageFactory = constraint =>
  `property is not less than ${constraint}`;

export const isLessThan: ValidatorFactory = createValidatorFactory(
  createIsLessThanEvaluator,
  createIsLessThanErrorMessage,
);
