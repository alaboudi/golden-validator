import { createValidatorFactory } from './factories';
import { ErrorMessageFactory, EvaluatorFactory } from './types';

describe('factory functions', () => {
  describe('createValidatorFactory', () => {
    const someEvaluatorFactory: EvaluatorFactory = constraint => input => constraint === input;
    const someErrorMessageFactory: ErrorMessageFactory = constraint => `failed to pass ${constraint}`;
    const validatorFactory = createValidatorFactory(someEvaluatorFactory, someErrorMessageFactory);
    it(`should create object with errorMessage and evaluator keys`, () => {
      expect(Object.keys(validatorFactory)).toEqual(['errorMessage', 'evaluator']);
    });
  });
});
