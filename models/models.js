const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema , struttura dei dati
const dataSchema = new Schema({
    name:{
        type: String,
        require:[true, 'il nome è richiesto']

    },
    surname:{
        type:String
    }, 
    available:{
        type:Boolean,
        default:false
    }


});

// modello, il nome data viene pluralizzato da
// mongodb diventando datas, il nome della collezione
const Data = mongoose.model('data', dataSchema);

//esporta il modello
module.exports = Data;