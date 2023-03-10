'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('admins', [
      {
        username: 'bhaumik@quickfix.com',
        password: 'bhaumik123',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'akshay@quickfix.com',
        password: 'akshay123',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'meet@quickfix.com',
        password: 'meet123',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
