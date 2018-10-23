const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// schema , struttura dei dati
const userSchema = new Schema({
    name:{
        type: String,
        required:[true, 'il nome è richiesto'],
        index:true
    },
    surname:{
        type:String
    }, 
    email:{
        type:String,
        unique:true,
        required:[true, 'la mail è richiesta'],
        index:true
    },
    password:{
        type:String,
        required:[true, 'la password è richiesta']
    },
    available:{
        type:Boolean,
        default:false
    },
    hash:{
        type:String
    },
    salt:{
        type: String
    },
    createdDate:{
        type: Date, 
        default: Date.now
    },
    lastLoggedIn:{
        type:Date
    }
});

// prima di salvare l'utente crypta la pwd
userSchema.pre('save', async function(next){
    try {
        //genera un salt
        const salt = await bcrypt.genSalt(10);
        //genera una password con hash (salt + hash)
        const passwordHashed = await bcrypt.hash(this.password, salt);
        //sostituisci la password con la sua versione hashed
        this.password = passwordHashed;
        next();

    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(newPassword){
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}
// esporta modello, il nome data viene pluralizzato da
// mongodb diventando datas, il nome della collezione
module.exports = mongoose.model('user', userSchema);
