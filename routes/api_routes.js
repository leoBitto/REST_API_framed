const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers');

//HANDLERS
//GET prendi info
router.get('/', controllers.getAllData);

//POST crea nuove info
router.post('/', controllers.newData);

//PUT aggiorna info
router.put('/:id', controllers.updateData);

//DELETE
router.delete('/:id', controllers.deleteData);


module.exports = router;