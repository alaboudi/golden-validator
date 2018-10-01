import { ErrorMessageFactory, EvaluatorFactory } from './types';

export const createValidatorFactory = (
  evaluatorCreator: EvaluatorFactory,
  errorMessageCreator: ErrorMessageFactory,
) => (...constraints: any[]) => ({
  errorMessage: errorMessageCreator(...constraints),
  evaluator: evaluatorCreator(...constraints),
});
