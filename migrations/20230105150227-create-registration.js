"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Registrations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Fname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Lname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      City_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Cities",
          key: "id",
        },
      },
      Address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Mobile_no: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Email_id: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Profile_image: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      UserType: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      Isactive: {
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
    await queryInterface.dropTable("Registrations");
  },
};
