'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      id: '75442486-0878-440c-9db1-a7006c25a39f',
      name: 'Admin',
      username: 'admin',
      email: 'amazing@da.ru',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
      isDeleted: false
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
