import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createHasLengthOfEvaluator: EvaluatorFactory = constraint => (value: string | any[]) => {
  return value.length === constraint;
};
export const createHasLengthOfErrorMessage: ErrorMessageFactory = constraint => `length does not match ${constraint}`;

export const hasLengthOf: ValidatorFactory = createValidatorFactory(
  createHasLengthOfEvaluator,
  createHasLengthOfErrorMessage,
);
