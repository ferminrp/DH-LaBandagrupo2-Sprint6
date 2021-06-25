'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     // belongsTo
     Products.belongsTo(models.Brand);
     // belongsTo
     Products.belongsTo(models.User);  
     // belongsToMany
     Products.belongsToMany(models.Color, {
      as: 'colors',
      through: 'colorProduct',
    }); 
     // belongsToMany
     Products.belongsToMany(models.Category, {
      as: 'categories',
      through: 'CategoryProduct',

    });
     
    }
  };
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    image: DataTypes.STRING,
    keywords: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};