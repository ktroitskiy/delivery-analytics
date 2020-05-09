'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable('productCategory').then(async attributes => {
      if (!attributes.parserId) {
        await queryInterface.addColumn('productCategory', 'shopId', {
          type: Sequelize.UUID,
          allowNull: false
        });
        await queryInterface.addColumn('productCategory', 'url', {
          type: Sequelize.STRING,
          allowNull: false
        });
      }
      return queryInterface;
    });
  },

  down: (queryInterface) => {
    return queryInterface.describeTable('productCategory').then(async attributes => {
      if (attributes.parserId) {
        await queryInterface.removeColumn('productCategory', 'shopId');
        await queryInterface.removeColumn('productCategory', 'url');
      }
      return queryInterface;
    });
  }
};
