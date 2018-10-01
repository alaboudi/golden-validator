import {
    createIsGreaterThanEvaluator,
    createIsGreaterThanErrorMessage
} from './isGreaterThan';

describe('createIsGreaterThanEvaluator', () => {
    const constraint = 5;
    const isGreaterThanEvaluator = createIsGreaterThanEvaluator(constraint);
    it('should return an evaluator function loaded with a constraint when invoked with 1 parameter', () => {
        expect(isGreaterThanEvaluator).toBeInstanceOf(Function);
    });
    it('should return true when supplied with a value greater than a loaded constraint', () => {
        expect(isGreaterThanEvaluator(10)).toBe(true);
    });
    it('should return true when supplied with a value greater than a loaded constraint', () => {
        expect(isGreaterThanEvaluator(4)).toBe(false);
    });
});

describe('createIsGreaterThanErrorMessage', () => {
    it('should generate the default error message', () => {
        expect(createIsGreaterThanErrorMessage(5)).toBe('property is not greater than 5');
    });
});
