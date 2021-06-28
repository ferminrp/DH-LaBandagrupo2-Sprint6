modules.exports = (sequelize, dataTypes) => {
    let alias = 'sizes';
  
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
  
    const sizes = sequelize.define(alias, cols, config);
  
    sizes.associate = function(models) {
      sizes.hasMany(models.Product, {
        foreignKey: 'sizesId',
        as: 'products'
      }); 
    }
  
    return sizes
  
  }