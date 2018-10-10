const express = require('express');
const bodyParser  = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api_routes');

// setup express app
const app = express();

// connect to mongo il db non esiste viene creato da mongoose
mongoose.connect('mongodb://localhost/dataUser', {useNewUrlParser:true});
// aggiornamento promise di mongoose
mongoose.Promise = global.Promise;

//PARSER 
// parser da json(in mongo) a oggetto per essere letto
app.use(bodyParser.json());

//ROUTES
app.use('/api', routes);

// 404 handlers
app.use((req, res, next) => {
    const err = new Error('not found');
    err.status = 404;
    next(err);
});

//ERROR handling MIDDLEWARE
app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send({error: err.message});

    console.error(err);
});

//START SERVER
const port = process.env.port || 4000;
app.listen(port, function(){
    console.log('listening on port: ' + port);
});
