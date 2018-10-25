const User = require('../models/user.model');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const { URL, JWT_SECRET } = require('../configuration/conf');


signToken = user => {
    //crea il token JWT
    return JWT.sign({
        iss:'bay',
        sub: user.id,
        name: user.name,
        email: user.email,
        iat: new Date().getTime(),// tempo attuale, in cui viene creato i token
        exp: new Date().setDate(new Date().getDate() + 1) 
        // crea un nuovo oggetto data, lo setta a una data
        // creando un nuovo oggetto data e settato alla data corrente
        // a cui viene aggiunto un giorno, la data di scadenza 
        // infatti è il giorno dopo della creazione del token
    }, JWT_SECRET);
}


module.exports = {

    logOut: async (req, res, next) =>{
        try {
            //disconnetti db
            await mongoose.disconnect();  
            res.status(200).json({message:'connessione chiusa'});   
        }catch (err){
            console.log(err.stack);
            next(err);
        }
    },

    signUp: async (req, res, next) => {
        try {
            // validation of email & password
            // req.value.body grazie a joi.
            // non viene pienamente usato es6
            const newUser = new User ({
                 name : req.body.name,
                 email : req.body.email,
                 password : req.body.password
            });

            //crea-connetti al db
            await mongoose.connect(URL, {
                useNewUrlParser:true,
                autoIndex: false,
                //user:this.name,
                //pass:this.pwd,
                dbName: newUser.name
            });

            // crea le collections
            await User.create(newUser, err =>{if(err) throw err ;});
            //gridFS
            //await Images.create(newUser, err =>{if(err) throw err ;});
            //await Documents.create(newUser, err =>{if(err) throw err ;});
            //await Videos.create(newUser, err =>{if(err) throw err ;});
            //await Calendar.create(newUser, err =>{if(err) throw err ;});

            // genera il token 
            const token = signToken(newUser);
            //risponde con il token abbreviazione con ES6
            res.status(200).json({token});

        }catch (err){
            console.log(err.stack);
            next(err);
        }
    },

    logIn: async (req, res, next) => {
       try { 
       /* const encodedName = encodeURIComponent(name);
        const encodedPwd = encodeURIComponent(pwd);
        const authMechanism = 'DEFAULT';
       */
        const logUser = new User ({
            name : req.body.name,
            password : req.body.password
        });

       //crea-connetti al db
       await mongoose.connect(URL, {
           useNewUrlParser:true,
           autoIndex: false,
           //user:this.name,
           //pass:this.pwd,
           dbName: logUser.name
       });
       // controlla che non ci sia un altro account con la stessa mail
            // in quel caso ritorna un errore
            //if(await userServices.getByMail(newUser.email)){
              //  return res.status(409).send({error:'Email already used'})
            //}
        // generate tokens
        const token = signToken(req.user);
        // rispondi con il token
        res.status(200).json({ token });

        }catch(err){
            console.log(err.stack);
            next(err);
        }
    },
    
    // per ogni contenuto dell'utente
    //(collezione) deve esserci una route
    // quindi un metodo
    // quindi una interfaccia col modello user service
    userContent: async (req, res, next) => {
        try{
            res.json({ secret:'resouce'});
        }catch(err){
            console.log(err.stack);
            next(err);
        }
    },
    update: async (req, res, next) => {
        try{
            res.json({ secret:'resouce'});
        }catch(err){
            console.log(err.stack);
            next(err);
        }
    }, 
    delete: async (req, res, next) => {
        try{
            res.json({ secret:'resouce'});
        }catch(err){
            console.log(err.stack);
            next(err);
        }
    }
}