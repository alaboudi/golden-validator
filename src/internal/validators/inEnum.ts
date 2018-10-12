import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createInEnumEvaluator: EvaluatorFactory = (constraint: any[]) => value => constraint.indexOf(value) !== -1;
export const createInEnumErrorMessage: ErrorMessageFactory = constraint => `value is not a valid option`;

export const inEnum: ValidatorFactory = createValidatorFactory(createInEnumEvaluator, createInEnumErrorMessage);
