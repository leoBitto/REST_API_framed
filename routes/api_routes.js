const express = require('express');
const router = express.Router();
const Data = require('../models/models');

//HANDLERS
//GET prendi info
router.get('/lorem', function(req, res, next){
    Data.find({/*se vuoto, cerca tutti*/}).then(function(data){
        res.send(data);
    });
});

//HANDLERS
//POST crea nuove info
 
router.post('/lorem', function(req, res, next){

    Data.create(req.body).then(function(data){
        res.send(data);
    }).catch(next); 

});

//HANDLERS
//PUT aggiorna info
router.put('/lorem/:id', function(req, res, next){
    Data.findByIdAndUpdate({
        _id:req.params.id
    }, req.body).then(function(){
        Data.findOne({
            _id:req.params.id
        }).then(function(data){
        res.send(data);
        });
    });
});

//HANDLERS
//DELETE
router.delete('/lorem/:id', function(req, res, next){
    Data.findByIdAndRemove({
        _id:req.params.id
    }).then(function(data){
        res.send(data);
    });
    res.send({type: 'DELETE'});
});


module.exports = router;