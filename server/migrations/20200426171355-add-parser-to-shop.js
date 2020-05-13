'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.describeTable('shop').then(async attributes => {
      if (!attributes.parserId) {
        await queryInterface.addColumn('shop', 'parserId', {
          type: Sequelize.UUID,
          allowNull: false
        });
      }
      return queryInterface;
    });
  },

  down: (queryInterface) => {
    return queryInterface.describeTable('shop').then(async attributes => {
      if (attributes.parserId) {
        await queryInterface.removeColumn('shop', 'parserId');
      }
      return queryInterface;
    });
  }
};
