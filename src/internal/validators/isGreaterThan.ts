import { validatorCreatorFactory } from '../factories';
import { ErrorMessageFactory, EvaluatorFactory, ValidatorFactory } from '../types';

export const createIsGreaterThanEvaluator: EvaluatorFactory = constraint => input => input > constraint;
export const createIsGreaterThanErrorMessage: ErrorMessageFactory = constraint => `property is not greater than ${constraint}`;

export const isGreaterThan: ValidatorFactory = validatorCreatorFactory(createIsGreaterThanEvaluator, createIsGreaterThanErrorMessage);