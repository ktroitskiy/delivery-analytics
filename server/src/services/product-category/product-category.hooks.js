const _ = require('lodash');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async hook => {
        const { app, data } = hook;

        const sequelizeClient = await app.get('sequelizeClient');
        const { productCategory } = sequelizeClient.models;

        const existingProductCategory = await productCategory.findOne({
          where: {
            shopId: data.shopId,
            name: data.name
          },
          raw: true
        });

        if (!_.isNil(existingProductCategory)) {
          app.service('product-category').remove(existingProductCategory.id);
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
