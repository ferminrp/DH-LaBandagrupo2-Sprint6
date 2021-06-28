modules.exports = (sequelize, dataTypes) => {
  let alias = 'Product';

  let cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(120),
      allowNull: false
    },
    price: {
      type: dataTypes.DECIMAL(8, 2),
      allowNull: false
    },
    stock: {
      type: dataTypes.INTEGER(11),
      allowNull: false
    },
    description: {
      type: dataTypes.STRING(180),
      allowNull: false
    },
  
    
    brandsId: dataTypes.INTEGER.UNSIGNED,
    categoriesId: dataTypes.INTEGER.UNSIGNED,
    colorId: dataTypes.INTEGER.UNSIGNED,
    gendersId: dataTypes.INTEGER.UNSIGNED,
    imagesId: dataTypes.INTEGER.UNSIGNED,
  };

  let config = {
    timestamps: false
  };

  const products = sequelize.define(alias, cols, config);

  products.associate = function(models) {
    // belongsTo
    products.belongsTo(models.Brand, {
      foreignKey: 'brandsId',
      as: 'brands'
    });

    // belongsTo
    products.belongsTo(models.Color, {
      foreignKey: 'colorId',
      as: 'colors'
    });
    // belongsTo
    products.belongsTo(models.Category, {
      foreignKey: 'categoriesId',
      as: 'categories'

    });
    // hasMany
    products.hasMany(models.Order, {
        foreignKey: 'productId',
        as: "orders"
      })
  }

  return products

}