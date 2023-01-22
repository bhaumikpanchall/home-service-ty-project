"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contact_us extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact_us.init(
    {
      Name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Email: {
        type: DataTypes.STRING,
      },
      Subject: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Mobile_no: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      Message: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Status: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      isActive: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Contact_us",
    }
  );
  return Contact_us;
};
