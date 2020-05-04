const user = require('./user/user.service.js');
const parser = require('./parser/parser.service.js');
const shop = require('./shop/shop.service.js');
const product = require('./product/product.service.js');
const productCategory = require('./product-category/product-category.service.js');
const productVariation = require('./product-variation/product-variation.service.js');
const productVariationHistory = require('./product-variation-history/product-variation-history.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(user);
  app.configure(parser);
  app.configure(shop);
  app.configure(product);
  app.configure(productCategory);
  app.configure(productVariation);
  app.configure(productVariationHistory);
};
