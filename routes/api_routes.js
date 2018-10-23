const express = require('express');
const router = express.Router();
const {validateBody, schemas} = require('../helpers/joischema');
const controllers = require('../controllers/controllers');
const passport = require('passport');
const passportConf = require('../helpers/passport');

/*to do
add passport redirections

router.put('/:id', update);
router.delete('/:id', _delete);
*/

router.post('/signup',
  //joi schema da sostituire
  validateBody(schemas.authSchema), 
  controllers.signUp);

router.post('/login',
  validateBody(schemas.authSchema),
  passport.authenticate('local', {session:false}),
  controllers.logIn);

router.post('/loginAdmin',
  validateBody(schemas.authSchema),
  passport.authenticate('local', {session:false}),
  controllers.logInAdmin);

router.get('/:id', 
  passport.authenticate('jwt', {session:false}),
  controllers.userContent);

router.put('/:id', 
  passport.authenticate('jwt', {session:false}),
  controllers.update);

router.delete('/:id', 
  passport.authenticate('jwt', {session:false}),      
  controllers.delete);

module.exports = router;