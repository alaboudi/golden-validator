import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createMatchesPatternEvaluator: EvaluatorFactory = (constraint: RegExp) => value => constraint.test(value);
export const createMatchesPatternErrorMessage: ErrorMessageFactory = () => `value is not of correct pattern`;

export const matchesPattern: ValidatorFactory = createValidatorFactory(
  createMatchesPatternEvaluator,
  createMatchesPatternErrorMessage,
);
