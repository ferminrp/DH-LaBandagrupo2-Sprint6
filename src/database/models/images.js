modules.exports = (sequelize, dataTypes) => {
    let alias = 'images';
  
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
  
    const images = sequelize.define(alias, cols, config);
  
    images.associate = function(models) {
      // hasMany
      images.belognsTo(models.Product, {
        foreignKey: 'imagesId',
        as: 'products',
      });
    }
  
    return images
  
  }