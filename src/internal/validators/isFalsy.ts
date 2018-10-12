import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createIsFalsyEvaluator: EvaluatorFactory = () => value => !value;
export const createIsFalsyMessage: ErrorMessageFactory = () => `value is not falsy`;

export const isFalsy: ValidatorFactory = createValidatorFactory(createIsFalsyEvaluator, createIsFalsyMessage);
