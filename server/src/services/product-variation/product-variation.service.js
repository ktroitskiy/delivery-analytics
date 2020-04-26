// Initializes the `product-variation` service on path `/product-variation`
const { ProductVariation } = require('./product-variation.class');
const createModel = require('../../models/product-variation.model');
const hooks = require('./product-variation.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/product-variation', new ProductVariation(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('product-variation');

  service.hooks(hooks);
};
