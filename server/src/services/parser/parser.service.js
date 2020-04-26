// Initializes the `parser` service on path `/parser`
const { Parser } = require('./parser.class');
const createModel = require('../../models/parser.model');
const hooks = require('./parser.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/parser', new Parser(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('parser');

  service.hooks(hooks);
};
