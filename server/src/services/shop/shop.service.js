// Initializes the `shop` service on path `/shop`
const { Shop } = require('./shop.class');
const createModel = require('../../models/shop.model');
const hooks = require('./shop.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/shop', new Shop(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('shop');

  service.hooks(hooks);
};
