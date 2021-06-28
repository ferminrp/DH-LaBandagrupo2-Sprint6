modules.exports = (sequelize, dataTypes) => {
  let alias = 'categories';

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

  const categories = sequelize.define(alias, cols, config);

  categories.associate = function(models) {
    // hasMany
    categories.hasMany(models.Product, {
      foreignKey: 'categoriesId',
      as: 'products',
    });
  }

  return categories

}