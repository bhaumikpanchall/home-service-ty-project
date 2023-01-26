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
    }
  }
  service_provider.init({
    Experience: DataTypes.INTEGER,
    DOB: DataTypes.DATE,
    Document_name: DataTypes.STRING,
    Document_image: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'service_provider',
  });
  return service_provider;
};