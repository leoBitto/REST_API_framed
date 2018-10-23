const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('../configuration/conf');
const data = require('../models/user.model');


//JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: JWT_SECRET 
    }, async (payload, done) => {
        try {
            //trova utente, specificato nel token
            const user = await data.findById(payload.sub);
            // se l'utente non esiste gestiscilo
            if(!user){
                return done(null, false, {
                    message: 'user not found'
                });
            }

            // in caso contrario ritorna l'utente
            done(null, user);

        } catch (error) {
            done(error, false);
        }
    }));

//LOCAL STRATEGY
passport.use(new LocalStrategy({
    //sovrascrive il campo username che si aspetta
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        //trova l'utente tramite mail
        const user = await data.findOne({ email });
        //se non lo trova gestisci
        if(!user){ 
            return done(null, false, {
                message: 'user not found'
            }); 
        };

        //controlla se password è corretta
        const isMatch = await user.isValidPassword(password);
        //se non lo è gestiscila
        if(!isMatch){ 
            return done(null, false, {
                message: 'wrong password'
            }); 
        }

        //in caso contrario ritorna l'utente
        done(null, user); 

    } catch (error) {
        console.log('error occurred' + err);
        done(error, false);
    }
   

}));