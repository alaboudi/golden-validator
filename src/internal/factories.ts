import { ErrorMessageFactory, EvaluatorFactory, IRule, ISchema, IValidator, ObjectType, SchemaRules } from './types';

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

export const createSchema = <T>(obj: SchemaRules<T>): ISchema<T> => ({
  _type: ObjectType.Schema,
  rules: obj,
});
