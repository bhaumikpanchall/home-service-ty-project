'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Registration, {
        as: "User",
        foreignKey: "User_id",
      });

      Booking.belongsTo(models.service_provider_details, {
        as: "ServiceProvider",
        foreignKey: "Service_provider_id",
      });

      Booking.belongsTo(models.Category, {
        as: "Category_Booking",
        foreignKey: "Category_id",
      });

      Booking.hasOne(models.Feedback, {
        as: "BookingData",
        foreignKey: "Booking_id",
      });
    }
  }
  Booking.init(
    {
      User_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      Service_provider_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      Category_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      Booking_date: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Total_Amount: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      Booking_status: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      Payment_status: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      Payment_Type: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      Isactive: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
