const _ = require('lodash');

module.exports = {
  before: {
    all: [ ],
    find: [
      async hook => {
        const { app, params } = hook;
        const sequelizeClient = await app.get('sequelizeClient');
        const {
          product: productModel,
          productVariation: productVariationModel,
          productVariationHistory: productVariationHistoryModel
        } = sequelizeClient.models;

        const query = params.query;

        if(!_.size(query)) return hook;

        const result = await productModel.findAll({
          where: query,
          include: [
            {
              model: productVariationModel,
              as: 'productVariation',
              include: [
                {
                  model: productVariationHistoryModel,
                  as: 'productVariationHistory'
                }
              ]
            }
          ]
        }).then(res => JSON.parse(JSON.stringify(res)));

        const resultWithMeanPrice = _.map(result, (product) => {
          if(_.size(product.productVariation > 1)) {
            
            product.averagePrice = _.meanBy(product.productVariation, (variation) => variation.price);
          } else {
            product.averagePrice = product.productVariation[0].price;
          }
          return product;
        });

        hook.result = resultWithMeanPrice;

        return hook;
      }
    ],
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
