import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createIsBetweenEvaluator: EvaluatorFactory = (min, max) => value => value >= min && value <= max;
export const createIsBetweenErrorMessage: ErrorMessageFactory = (min, max) =>
  `property is not between ${min} and ${max}`;

export const isBetween: ValidatorFactory = createValidatorFactory(
  createIsBetweenEvaluator,
  createIsBetweenErrorMessage,
);
