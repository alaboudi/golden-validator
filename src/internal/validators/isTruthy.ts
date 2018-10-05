import { createValidatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createIsTruthyEvaluator: EvaluatorFactory = () => value => !!value;
export const createIsTruthyMessage: ErrorMessageFactory = () => `property does not truthy`;

export const isTruthy: ValidatorFactory = createValidatorFactory(createIsTruthyEvaluator, createIsTruthyMessage);
