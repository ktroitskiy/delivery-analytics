// Initializes the `product-category` service on path `/product-category`
const { ProductCategory } = require('./product-category.class');
const createModel = require('../../models/product-category.model');
const hooks = require('./product-category.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/product-category', new ProductCategory(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('product-category');

  service.hooks(hooks);
};
