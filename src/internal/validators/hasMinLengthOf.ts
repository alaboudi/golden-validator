import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createHasMinLengthOfEvaluator: EvaluatorFactory = constraint => (value: string | any[]) =>
  value.length >= constraint;
export const createHasMinLengthOfErrorMessage: ErrorMessageFactory = constraint =>
  `value length is not greater than ${constraint}`;

export const hasMinLengthOf: ValidatorFactory = createValidatorFactory(
  createHasMinLengthOfEvaluator,
  createHasMinLengthOfErrorMessage,
);
