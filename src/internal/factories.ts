import { ErrorMessageFactory, EvaluatorFactory, IRule, IValidator, ObjectType } from './types';

export const createValidatorFactory = (
  evaluatorCreator: EvaluatorFactory,
  errorMessageCreator: ErrorMessageFactory,
) => (...constraints: any[]) => ({
  errorMessage: errorMessageCreator(...constraints),
  evaluator: evaluatorCreator(...constraints),
});

export const createRule = (obj: { required?: boolean; validators: IValidator[] }): IRule => ({
  _type: ObjectType.Rule,
  required: obj.required || false,
  validators: obj.validators,
});
