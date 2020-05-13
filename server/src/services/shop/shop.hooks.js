const path = require('path');
const { PythonShell } = require('python-shell');
const _ = require('lodash');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [
      async hook => {
        const { app, params } = hook;

        const sequelizeClient = await app.get('sequelizeClient');
        const {
          parser: parserModel,
          shop: shopModel,
          productCategory: productCategoryModel,
          product: productModel,
          productVariation: productVariationModel,
          productVariationHistory: productVariationHistoryModel
        } = sequelizeClient.models;

        const query = params.query;

        const currentShop = await shopModel.findByPk(query.id, {
          include: [
            {
              model: parserModel,
              as: 'shopParser'
            }
          ]
        }).then(res => JSON.parse(JSON.stringify(res)));

        const parserPath = path.join(__dirname, '../../../../parsers/', currentShop.shopParser.scriptName);

        const parserResultPromise = new Promise((res, rej) => {
          PythonShell.run(parserPath, { mode: 'text' }, function (err, result) {
            res(JSON.parse(result));
            rej(err);
          });
        });

        const parserResult = await parserResultPromise;

        const createCategoriesAndProductPromise = _.map(parserResult, async (category) => {
          const defaultsCategory = {
            name: category.name,
            shopId: currentShop.id,
            url: category.url
          };

          const newCategory = await productCategoryModel.findOrCreate({
            where: defaultsCategory,
            defaults: defaultsCategory
          }).then(res => JSON.parse(JSON.stringify(res)));

          const createdCategory = newCategory[0];

          _.map(category.products, async (product) => {
            const defaultsProduct = {
              name: product.title,
              url: product.href,
              imageSrc: product.img,
              shopId: currentShop.id,
              categoryId: createdCategory.id
            };

            const newProduct = await productModel.findOrCreate({
              where: defaultsProduct,
              defaults: defaultsProduct
            }).then(res => JSON.parse(JSON.stringify(res)));

            const createdProduct = newProduct[0];

            _.map(product.variations, async (variation) => {
              const defaultsVariation = {
                productId: createdProduct.id,
                quantity: variation.count,
                weight: variation.weight,
                price: variation.price,
                composition: product.composition
              };

              const newVariation = await productVariationModel.findOrCreate({
                where: defaultsVariation,
                defaults: defaultsVariation
              }).then(res => JSON.parse(JSON.stringify(res)));

              const createdVariation = newVariation[0];
              const isJustCreatedVariation = newVariation[1];

              if(isJustCreatedVariation) {
                const defaultsVariationHistory = {
                  productVariationId: createdVariation.id,
                  price: createdVariation.price
                };

                await productVariationHistoryModel.findOrCreate({
                  where: defaultsVariationHistory,
                  defaults: defaultsVariationHistory
                }).then(res => JSON.parse(JSON.stringify(res)));
              }
            });
          });
        });

        await Promise.all(createCategoriesAndProductPromise).then((values) => {
          return values;
        }).catch((error) => {
          hook.result = {
            status: 500
          };

          throw new Error(error);
        });

        hook.result = {
          status: 200
        };

        return hook;
      }
    ],
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
