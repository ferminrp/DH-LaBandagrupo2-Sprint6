const db = require('../database/models');
const { validationResult } = require('express-validator');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
// Maneja todos los métodos para PRODUCTO, que lo pasa como parámetro


let buyerController = {
//    home: (req, res) => {
//         res.render('index')
//     },
    showById:async (req, res) =>{
        try{ 
            const product = await db.Product.findByPk(req.params.id,
            {
                include: [
                   "images","type","color","gender"
                ]
            });
            console.log(product.toJSON())
            
            /*const productosSimilares = await db.Product.findAll({
                where: {
                  type: product.types_id
                }
              });
              console.log(productosSimilares +"soy product")*/

            

            console.log(product);
            return res.render('productDetail', {product});
        }
        catch(error){
            console.log(error);
        }
    },
}

        
        

module.exports = buyerController;