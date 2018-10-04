import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createIsGreaterThanEvaluator: EvaluatorFactory = constraint => value => value > constraint;
export const createIsGreaterThanErrorMessage: ErrorMessageFactory = constraint =>
  `property is not greater than ${constraint}`;

export const isGreaterThan: ValidatorFactory = createValidatorFactory(
  createIsGreaterThanEvaluator,
  createIsGreaterThanErrorMessage,
);
