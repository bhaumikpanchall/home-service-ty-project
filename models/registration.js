"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Registration extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Registration.belongsTo(models.City, {
        as: "City",
        foreignKey: "City_id",
      });

      Registration.hasOne(models.service_provider_details, {
        as: "Username",
        foreignKey: "User_id",
      });

      Registration.hasOne(models.Booking, {
        as: "User",
        foreignKey: "User_id",
      });
    }
  }
  Registration.init(
    {
      Fname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Lname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      City_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      Address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Mobile_no: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Email_id: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      Profile_image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      UserType: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      Isactive: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Registration",
    }
  );
  return Registration;
};
