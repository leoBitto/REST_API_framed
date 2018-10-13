const Data = require('../models/models');
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configuration/conf');

    signToken = user => {
        //crea il token JWT
        return JWT.sign({
            iss:'bay',
            sub: user.id,
            iat: new Date().getTime(),// tempo attuale, in cui viene creato i token
            exp: new Date().setDate(new Date().getDate() + 1) 
            // crea un nuovo oggetto data, lo setta a una data
            // creando un nuovo oggetto data e settato alla data corrente
            // a cui viene aggiunto un giorno, la data di scadenza 
            // infatti è il giorno dopo della creazione del token
        }, JWT_SECRET);
    }
    

module.exports = {

    getAllData: async (req, res, next) => {
        const allData = await Data.find({/*se vuoto, cerca tutti*/});
        res.status(200).json(allData);

    },

    newData: async (req, res, next) => {
        const postedData = await Data.create(req.body);
        res.status(200).json(postedData);
     
    },

    updateData: async (req, res, next) => {
        const resData = await Data.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true});
        res.status(200).json(resData);
              
    },

    deleteData: async (req, res, next) => {
        await Data.findByIdAndRemove({_id:req.params.id});
        res.status(200).send({type: 'DELETE'});

    },

    signUp: async (req, res, next) => {
        // validation of email & password
        // req.value.body grazie a joi
        // non viene usato es6...
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        // controlla che non ci sia un altro account con la stessa mail
        // in quel caso ritorna un errore
        const foundUser = await Data.findOne({email:email});
        if(foundUser){
           return res.status(409).send({error:'Email already used'})
        }
        // crea il nuovo utente nel db
        const newUser = new Data({
            name: name,
            email: email,
            password: password
        });
        await newUser.save();

        // genera il token 
        const token = signToken(newUser);

        //risponde con un token abbreviazione con ES6
        res.status(200).json({token});
        
    },

    signIn: async (req, res, next) => {
        // passport.js
        // generate tokens
        const token = signToken(req.user);
        // rispondi con il token
        res.status(200).json({ token });
    },

    userContent: async (req, res, next) => {
        res.json({ secret:'resouce'});
    }

}