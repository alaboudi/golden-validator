import { createValidatorFactory } from './factories';
import { ErrorMessageFactory, EvaluatorFactory } from './types';

describe('factory functions', () => {
  describe('createValidatorFactory', () => {
    const someEvaluatorFactory: EvaluatorFactory = constraint => input => constraint === input;
    const someErrorMessageFactory: ErrorMessageFactory = constraint => `failed to pass ${constraint}`;
    const validatorFactory = createValidatorFactory(someEvaluatorFactory, someErrorMessageFactory);
    const validator = validatorFactory(10);
    it('should return a validator factory function', () => {
      expect(validatorFactory).toBeInstanceOf(Function);
    });
    it('should return an object with errorMessage and evaluator keys when its result value is invoked', () => {
      expect(Object.keys(validator)).toEqual(['errorMessage', 'evaluator']);
    });
  });
});
