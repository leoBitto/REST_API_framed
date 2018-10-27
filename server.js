const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api_routes');
const history = require('connect-history-api-fallback');
//const Morgan = require('morgan')('dev');
const errorHandlers = require('./helpers/errorHandlers');
const {URL}= require('./configuration/conf');

// aggiornamento promise di mongoose
mongoose.Promise = global.Promise;

// setup express web server
const server = express();

//LOGGER
//server.use(Morgan);
server.use(history());
//PARSER 
// parser da json(in mongo) a oggetto per essere letto
server.use(bodyParser.json());
//ROUTES
server.use('/api', routes);
// 404 handlers
server.use(errorHandlers);

//${encodedName}:${encodedPwd}@  ?authMechanism=${authMechanism}&authSource=${name}
//crea connessione a mongo
mongoose.connect(URL, {
    useNewUrlParser:true,
    autoIndex: false,
    //user:this.name,
    //pass:this.pwd,
    //dbName:this.name
});

//START SERVER
const port = process.env.port || 4000;
server.listen(port, ()=>{
    console.log('listening on port: ' + port);
});
