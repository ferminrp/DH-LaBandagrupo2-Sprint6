modules.exports = (sequelize, dataTypes) => {
  let alias = 'color';

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

  const color = sequelize.define(alias, cols, config);

  color.associate = function(models) {
    color.hasMany(models.Product, {
      foreignKey: 'colorId',
      as: 'products'
    }); 
  }

  return color

}