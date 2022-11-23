'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Categry.init({
    category:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    cat_image: {
      type: DataTypes.BLOB,
    }
  }, {
    sequelize,
    modelName: 'Categry',
  });
  return Categry;
};