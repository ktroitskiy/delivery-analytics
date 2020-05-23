// Initializes the `analitics` service on path `/analitics`
const { Analitics } = require('./analitics.class');
const createModel = require('../../models/analitics.model');
const hooks = require('./analitics.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/analitics', new Analitics(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('analitics');

  service.hooks(hooks);
};
