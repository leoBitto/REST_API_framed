const User = require('./user.model.js');
const mongoose = require('mongoose');

module.exports = {
    
    getById,
    getByName,
    getByMail,
    createUser,
    update,
    //stream dati 
    //crea collezioni
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
    //return await User.find().select('-hash');
}
async function createUser(userParams){
    /*encoded info e authorization mechanism
    const encodedName = encodeURIComponent(name);
    const encodedPwd = encodeURIComponent(pwd);
    const authMechanism = 'DEFAULT';
    var url = "mongodb://${encodedName}:${encodedPwd}@localhost:27017/?authMechanism=${authMechanism}&authSource=${name}";
    */
    
    //salva l'istanza dell'utente nel admin
    await userParams.save( err =>{ if(err) throw err });
    // crea le varie collezioni per il db utente
    // GridFS
    await User.createCollection(/*'Musica'*/)
    
    console.log('collezione musica creata');
    
    /*await User.createCollection('Documenti')
        .createIndex({"documenti":1},null);
    console.log('collezione documenti creata');
   
    //GridFS
    await User.createCollection('Video')
        .createIndex({"video":1},null);
    console.log('collezione video creata');
   
    await User.createCollection('Foto')
        .createIndex({"foto":1},null);
    console.log('collezione foto creata');
 
    await User.createCollection('MetaUser')
        .createIndex({"meta":1},null);
    console.log('collezione meta creata');

    await User.createCollection('ToDo', {"capped":true, "size":10000, "max":50000})
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
