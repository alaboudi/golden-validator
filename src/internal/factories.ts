import { ErrorMessageFactory, EvaluatorFactory } from './types';

export const validatorCreatorFactory = (evaluatorCreator: EvaluatorFactory, errorMessageCreator: ErrorMessageFactory) => (...constraints: any[]) => ({
  evaluator: evaluatorCreator(...constraints),
  errorMessage: errorMessageCreator(...constraints)
});