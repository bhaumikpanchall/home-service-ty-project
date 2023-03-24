'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
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
      Service_provider_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "service_provider_details",
          key: "id",
        }
      },
      Category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        }
      },
      Booking_date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      Total_Amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      Booking_status: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      Payment_status: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      Payment_Type: {
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
    await queryInterface.dropTable('Bookings');
  }
};