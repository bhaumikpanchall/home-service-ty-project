'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('cities', [
      {
        City_name: 'Ahmedabad',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        City_name: 'Rajkot',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        City_name: 'Surat',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        City_name: 'Gandhinagar',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        City_name: 'Mahesana',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        City_name: 'Bhavnagar',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        City_name: 'Anand',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        City_name: 'Nadiad',
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        City_name: 'Bhuj',
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
