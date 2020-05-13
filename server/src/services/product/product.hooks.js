const _ = require('lodash');

module.exports = {
  before: {
    all: [ ],
    find: [],
    get: [],
    create: [
      async hook => {
        const { app, data } = hook;
        const sequelizeClient = await app.get('sequelizeClient');
        const { product: productModel } = sequelizeClient.models;

        const existingProduct = await productModel.findOne({
          where: {
            categoryId: data.categoryId,
            name: data.name
          },
          raw: true
        });

        if (!_.isNil(existingProduct)) {
          app.service('product').remove(existingProduct.id);
        }

        return hook;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
