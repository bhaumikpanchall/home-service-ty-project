"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Contact_us", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Email: {
        type: Sequelize.STRING,
      },
      Subject: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Mobile_no: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      Message: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Status: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      isActive: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Contact_us");
  },
};
