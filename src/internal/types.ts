export type Evaluator = (input: any) => boolean;

export type EvaluatorFactory = (...constraints: any[]) => Evaluator;

export type ErrorMessageFactory = (...constraints: any[]) => string;

export interface IValidator {
  evaluator: Evaluator;
  errorMessage: string;
}

export type ValidatorFactory = (...constraints: any[]) => IValidator;

export enum ObjectType {
  Rule,
  Schema,
}

export interface IRule {
  required?: boolean;
  validators: IValidator[];
  _type: ObjectType.Rule;
}

export type SchemaRules<T> = { [key in keyof T]: IRule };

export interface ISchema<T> {
  rules: SchemaRules<T>;
  _type: ObjectType.Schema;
}
