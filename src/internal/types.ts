export type Evaluator = (input: any) => boolean;

export type EvaluatorFactory = (...constraints: any[]) => Evaluator;

export type ErrorMessageFactory = (...constraints: any[]) => string;

export interface IValidator {
  evaluator: Evaluator;
  errorMessage: string;
}

export type ValidatorFactory = (...constraints: any[]) => IValidator;

export interface IRule {
  required: boolean;
  validators: IValidator[];
}

export interface ISchema {
  [key: string]: IRule | ISchema;
}
