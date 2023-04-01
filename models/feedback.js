'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feedback.belongsTo(models.Registration, {
        as: "UserData",
        foreignKey: "User_id",
      });

      Feedback.belongsTo(models.Booking, {
        as: "BookingData",
        foreignKey: "Booking_id",
      });
    }
  }
  Feedback.init({
    Booking_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    User_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    message: {
      allowNull: false,
      type: DataTypes.STRING
    },
    isActive: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  }, {
    sequelize,
    modelName: 'Feedback',
  });
  return Feedback;
};