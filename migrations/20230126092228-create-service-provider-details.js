'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('service_provider_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      User_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Registrations",
          key: "id",
        }
      },
      Experience: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      DOB: {
        allowNull: false,
        type: Sequelize.DATE
      },
      Document_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      Document_image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('service_provider_details');
  }
};