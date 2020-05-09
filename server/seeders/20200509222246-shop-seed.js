'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('shop', [{
      id: '75442486-0808-440c-9db1-a7016c25a39f',
      name: 'SushiBOX',
      url: 'https://www.sushibank.ru/',
      parserId: '75442486-0808-440c-9db1-a7016c25a39a',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('shop', null, {});
  }
};
