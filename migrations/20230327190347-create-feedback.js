'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Feedbacks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Booking_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Bookings",
          key: "id",
        }
      },
      User_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Registrations",
          key: "id",
        }
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Feedbacks');
  }
};