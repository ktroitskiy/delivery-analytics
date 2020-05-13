'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('parser', [{
      id: '75442486-0808-440c-9db1-a7016c25a39a',
      name: 'sushibox parser',
      scriptName: 'sushibank.py',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('parser', null, {});
  }
};
