modules.exports = (sequelize, dataTypes) => {
  let alias = 'brands';

  let cols = {
    id: {
      type: dataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: dataTypes.STRING(45),
      allowNull: false
    }
  };

  let config = {
    timestamps: false
  };

  const brands = sequelize.define(alias, cols, config);

  brands.associate = function(models) {
    // hasMany
    brands.hasMany(models.Product, {
      foreignKey: 'brandsId',
      as: "products"
    })
  }

  return brands;

}