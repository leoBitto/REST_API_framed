const joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return ( req, res, next) =>{
            const result = joi.validate(req.body, schema);
            // gestione dell'errore e segnalazione al client
            if(result.error){
                return res.status(400).json(result.error);
            }

            // req.value.body instead req.body
            // controllare se c'è un valore della ricesta
            // in caso contrario creane uno
            if(!req.value){
                req.value ={};
            }
            req.value['body'] = result.value;
            // questo next è necessario senno l'applicazione
            // si ferma 
            next();
        }
    },

    schemas: {
        authSchema: joi.object().keys({
            name: joi.string().required(),
            surname: joi.string(),
            email: joi.string().required(),
            password: joi.string().required(),
            available: joi.boolean()
        })
    }
}