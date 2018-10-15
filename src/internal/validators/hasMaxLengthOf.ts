import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createHasMaxLengthOfEvaluator: EvaluatorFactory = (constraint: number) => (value: string | any[]) =>
  value.length <= constraint;
export const createHasMaxLengthOfErrorMessage: ErrorMessageFactory = constraint =>
  `value length should be less than ${constraint}`;

export const hasMaxLengthOf: ValidatorFactory = createValidatorFactory(
  createHasMaxLengthOfEvaluator,
  createHasMaxLengthOfErrorMessage,
);
