const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


let userController = {
    billing: (req, res) => {
        res.render('billing')
    },
    login: (req, res) => {
        res.render('login')
    },
    loginProcess: async (req, res) => {
        try{
          let userToLogin = await db.User.findOne({where: {email: req.body.email}})
        // console.log(userTologin);
        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;

                if (req.body.remember_user) {
                    res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
                }

                return res.redirect('/user/profile');
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son inválidas'
                    }
                }
            });  
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'El email no figura en nuestra base de datos'
                }
            }
        });
        
        }
        catch(error){
            console.log(error);
        }

        
    },
    register: (req, res) => {
        res.render('register')
    },
    
    processRegister: async (req, res) => {
        try{
            const resultValidation = validationResult(req);
            if (resultValidation.errors.length > 0) {
                return res.render('register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body
                });
            }
            // console.log(req.body.email);
            
            let userInDB = await db.User.findOne({where: {email: req.body.email}})
            // console.log(userInDB);
           
    
            if (userInDB) {
                return res.render('register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }
    
            let userToCreate = {
                ...req.body,
                password: bcryptjs.hashSync(req.body.password, 10),
                avatar: req.file.filename,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                gender: req.body.gender,
                telephone: req.body.telephone                

            }
            console.log(`USUARIO POR CREARSE: ${userToCreate}`);
    
            let userCreated = await db.User.create(userToCreate);
            console.log(`USUARIO CREADO ${userCreated}`)
    
            return res.redirect('/user/login');
        }
        catch(error){
            console.log(error);
        }
        
    },
        cart: (req, res) => {
        res.render('productCart')
    },
    detail: (req, res) => {
        res.render('productDetail')
    },
    
    profileEdit: async (req, res)=>{
        try{
            let userInDB = await db.User.findByPk(req.params.id)
            res.render('profileEdit', {userInDB})
        }        
        
        catch(error){
            console.log(error);
        }
        },
    
    updateProfile: async (req, res) =>{
        try{
            
           const userUpdated =  await db.User.update({
                
                    ...req.body,
                    password: bcryptjs.hashSync(req.body.password, 10),
                    avatar: req.file.filename,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    gender: req.body.gender,
                    telephone: req.body.telephone                  
                
             
             
         }, {
             where: {
                 id: req.params.id
             }
         })
         return res.redirect('/user/profile');
         }
         catch(error){
             console.log(error);
         }
    },
    profile: (req, res) => {
        res.render('profile', {
            user: req.session.userLogged
        });

    },

    logout: (req, res) => {
        res.clearCookie('usuario');
        req.session.destroy();
        return res.redirect('/');
    }
}


//     ValidacionRegister: (req, res) =>{

//         const resultValidation = validationResult(req);
//         let newProductValues = req.body;
//         newProductValues.id = req.params.id;
//         if (resultValidation.errors.length > 0) {
//         return res.render('register', {
//             errors: resultValidation.mapped(),
//             oldData: newProductValues, product: newProductValues
//         });
//     }
//     let product = req.body

    
//     product.image = req.file ? req.file.filename : req.body.oldImagen;
            
//     if (req.body.image===undefined) {
//       product.image = product.oldImage
//   }
//   delete product.oldImage;

//   productModel.update(product);

// res.redirect("index")

//     }
// }

module.exports = userController;
