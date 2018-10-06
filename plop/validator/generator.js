module.exports = function(plop) {
  plop.setGenerator('validator', {
    description: 'validator evaluator and message',
    prompts: [
      {
        type: 'input',
        name: 'validator',
        message: 'input validator name please (ex. isGreaterThan)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/internal/validators/{{validator}}.ts',
        templateFile: 'plop/validator/validator.hbs',
      },
    ],
  });
};
