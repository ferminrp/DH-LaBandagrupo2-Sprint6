modules.exports = (sequelize, dataTypes) => {
    let alias = 'genders';
  
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
  
    const genders = sequelize.define(alias, cols, config);
  
    genders.associate = function(models) {
      genders.hasMany(models.Product, {
        foreignKey: 'gendersId',
        as: 'products'
      }); 
    }
  
    return genders
  
  }