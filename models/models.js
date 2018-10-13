const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// schema , struttura dei dati
const dataSchema = new Schema({
    name:{
        type: String,
        require:[true, 'il nome è richiesto']
    },
    surname:{
        type:String
    }, 
    email:{
        type:String,
        require:[true, 'la mail è richiesta']
    },
    password:{
        type:String,
        require:[true, 'la password è richiesta']
    },
    available:{
        type:Boolean,
        default:false
    }

});

dataSchema.pre('save', async function(next){
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

dataSchema.methods.isValidPassword = async function(newPassword){
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}
// modello, il nome data viene pluralizzato da
// mongodb diventando datas, il nome della collezione
const Data = mongoose.model('data', dataSchema);

//esporta il modello
module.exports = Data;