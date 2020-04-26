// Initializes the `product-variation-history` service on path `/product-variation-history`
const { ProductVariationHistory } = require('./product-variation-history.class');
const createModel = require('../../models/product-variation-history.model');
const hooks = require('./product-variation-history.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/product-variation-history', new ProductVariationHistory(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('product-variation-history');

  service.hooks(hooks);
};
