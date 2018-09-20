export interface Evaluator {
    (input: any): boolean;
}

export interface EvaluatorFactory {
    (...constraints: any[]): Evaluator;
}

export interface ErrorMessageFactory {
    (...constraints: any[]): string
}

export interface Validator {
    evaluator: Evaluator,
    errorMessage: string,
}

export interface ValidatorFactory {
    (...constraints: any[]): Validator
}

