import { createRule, createSchema, createValidatorFactory } from './factories';
import { ErrorMessageFactory, EvaluatorFactory, IRule, IValidator, ObjectType } from './types';

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
  describe('createRule', () => {
    it('should return a rule if both the required and validator keys are present in input object', () => {
      const obj = {
        required: true,
        validators: [],
      };
      expect(createRule(obj)).toEqual({ ...obj, _type: ObjectType.Rule });
    });
    it('should return a rule with required field set to false if only the validators are set', () => {
      const obj = {
        validators: [],
      };
      expect(createRule(obj)).toEqual({ ...obj, required: false, _type: ObjectType.Rule });
    });
  });
  describe('createSchema', () => {
    interface IFakeUser {
      first: string;
      last: string;
    }
    const fakeTruthyValidator: IValidator = {
      errorMessage: 'hi',
      evaluator: () => true,
    };
    const fakeTruthyRule: IRule = {
      _type: ObjectType.Rule,
      required: true,
      validators: [fakeTruthyValidator],
    };
    const rules = { first: fakeTruthyRule, last: fakeTruthyRule };
    const userSchema = createSchema<IFakeUser>(rules);
    expect(userSchema).toEqual({ rules, _type: ObjectType.Schema });
  });
});
