"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasOne(models.service_provider_details, {
        as: "Category",
        foreignKey: "Category_id",
      });

      Category.hasOne(models.Booking, {
        as: "Category_Booking",
        foreignKey: "Category_id",
      });
    }
  }
  Category.init(
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cat_image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visiting_charge: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      charge_perhour: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isActive: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
