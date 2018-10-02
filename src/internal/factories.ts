import { ErrorMessageFactory, EvaluatorFactory, IRule, ISchema, IValidator, ObjectType } from './types';

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

export const createSchema = <T>(obj: { [key in keyof T]: IRule }): ISchema<T> => ({
  ...(obj as any),
  _type: ObjectType.Schema,
});
