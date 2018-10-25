const User = require('./user.model.js');
const mongoose = require('mongoose');

module.exports = {
    
    getById,
    getByName,
    getByMail,
    newCollection,
    update,
    //stream dati 
   
    Admin: {
        getAll,
        delete: _delete
    }
};

async function getAll(){
    return await User.find().select('-hash');
}
async function getById(id){
    return await User.findById(id);
}
async function getByName(name){
    //return await User.find().select('-hash');
}
async function getByMail(email){
    //return await User.find();
}
async function newCollection(nameColl){
    /*encoded info e authorization mechanism
    const encodedName = encodeURIComponent(name);
    const encodedPwd = encodeURIComponent(pwd);
    const authMechanism = 'DEFAULT';
    var url = "mongodb://${encodedName}:${encodedPwd}@localhost:27017/?authMechanism=${authMechanism}&authSource=${name}";
    */
    
    // crea le varie collezioni per il db utente
    // GridFS
     /*   
    await User.create()
        .createIndex({"documenti":1},null);
    console.log('collezione documenti creata');
   
    //GridFS
    await Videos.create()
        .createIndex({"video":1},null);
    console.log('collezione video creata');
   
    await Images.create()
        .createIndex({"foto":1},null);
    console.log('collezione foto creata');
 
    await calendar.create(, {"capped":true, "size":10000, "max":50000})
        .createIreateIndex({"todo":1},null);
    console.log('collezione todo creata');  
    */
}
async function update(name, newParam){
    //cercalo tramite nome
    //const user = await User.findById(id);

    //newParam deve essere un oggetto

    //...
    //nel caso sia stata cambiata la pwd 
    // la nuova pwd deve essere cryptata qui

    // copia i parametri modificati all'user
    Object.assign(user, userParam);

    await user.save();
}
async function _delete(id){
    await User.findByIdAndRemove(id)
}
