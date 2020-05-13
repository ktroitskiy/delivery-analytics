const path = require('path');
const  { PythonShell } = require('python-shell');
const _ = require('lodash');

module.exports = {
  before: {
    all: [],
    find: [
      async hook => {
        const { app, params } = hook;

        const sequelizeClient = await app.get('sequelizeClient');
        const { parser, shop, productCategory } = sequelizeClient.models;
        const query = params.query;

        const currentShop = await shop.findByPk(query.id, {
          include: [
            {
              model: parser,
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

        /* create categories */
        const productCategoriesPromise = _.map(parserResult, async (category) => {
          const newCategory = await productCategory.upsert({
            name: category.name,
            shopId: currentShop.id,
            url: category.url
          });

          console.log(newCategory);

          /* _.map(category.products, async (product) => {
            const newProduct = await app.service('product').create({
              name: product.title,
              url: product.href,
              imageSrc: product.img,
              shopId: currentShop.id,
              categoryId: newCategory.id
            });

            console.log(newProduct)
          }); */
        });

        // const productCategories = await Promise.all(productCategoriesPromise).then((values) => {
        //   return values;
        // });


        // console.log(parserResult);
        
        return hook;
      }
    ],
    get: [],
    create: [],
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
