'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Otp.belongsTo(models.Registration, {
        as: "OTPUserData",
        foreignKey: "User_id",
      });
    }
  }
  Otp.init({
    otp: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    User_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    expires: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Otp',
  });
  return Otp;
};