const express = require('express');
const router = express.Router();
const {validateBody, schemas} = require('../helpers/joischema');
const controllers = require('../controllers/controllers');
const passport = require('passport');
const passportConf = require('../passport');

//HANDLERS
//GET prendi info
router.get('/', controllers.getAllData);

//POST crea nuove info
router.post('/', controllers.newData);

//PUT aggiorna info
router.put('/:id', controllers.updateData);

//DELETE
router.delete('/:id', controllers.deleteData);

//POST signup
// prima di chiamare l'handler valida il req.body
router.post('/signup',
  validateBody(schemas.authSchema), 
  controllers.signUp);

//POST signin
router.post('/signin',
  validateBody(schemas.authSchema),
  passport.authenticate('local', {session:false}),
  controllers.signIn);

//GET user content
router.get('/secret', 
  passport.authenticate('jwt', {session:false}),
  controllers.userContent);

module.exports = router;