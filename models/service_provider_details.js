'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service_provider extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      service_provider.belongsTo(models.Registration, {
        as: "Username",
        foreignKey: "User_id",
      });
    }
  }
  service_provider.init({
    User_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    Experience: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    DOB: {
      allowNull: false,
      type: DataTypes.DATE
    },
    Document_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    Document_image: {
      allowNull: false,
      type: DataTypes.STRING
    },
    category: {
      allowNull: false,
      type: DataTypes.STRING
    },
    Status: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    isActive: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    }, 
  {
    sequelize,
    modelName: 'service_provider_details',
  });
  return service_provider;
};