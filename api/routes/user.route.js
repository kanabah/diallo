const express = require('express');
const userRoutes = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

ctrUserAutentification = require('../controllers/authentication');
ctrUser = require('../controllers/userControllers');
ctrProfile = require('../controllers/profile');

userRoutes.route('/addUser').post(ctrUserAutentification.register);
userRoutes.route('/login').post(ctrUserAutentification.login);

userRoutes.route('/existEmail/:email').get(ctrUser.emailExist);
userRoutes.route('/telExist/:tel').get(ctrUser.telExist);

userRoutes.route('/updateUser/:id').put(auth,ctrUser.updateUser);

userRoutes.route('/changeEtatUser/:id').get(auth,ctrUser.changeEtatUser);

userRoutes.route('/updateDebitPromoteurForAgence/:id/:id_sold').put(auth,ctrUser.updateDebitPromoteurForAgence);

userRoutes.route('/deleteDebitPromoteurForAgence/:id/:id_sold').get(auth,ctrUser.deleteDebitPromoteurForAgence);

userRoutes.route('/profile').get(auth, ctrProfile.profileRead);

userRoutes.route('/newUsers').get(auth, ctrUser.newUsers);

userRoutes.route('/getUsers').get(auth, ctrUser.getUsers);

userRoutes.route('/getAllUsersActive').get(auth, ctrUser.getAllUsersActive);

userRoutes.route('/getAllPromoteurs/:user_id').get(auth, ctrUser.getAllPromoteurs);

userRoutes.route('/acpetUser/:id').get(auth, ctrUser.acpetUser);

userRoutes.route('/telExistPromoteur/:tel').get(auth, ctrUser.telExistPromoteur);

userRoutes.route('/addSoldePromoteur/:id').put(auth, ctrUser.addSoldePromoteur);

userRoutes.route('/attriButeRole/:id/:role/:agence_id').get(auth, ctrUser.attriButeRole);

userRoutes.route('/declineUser/:id').get(auth, ctrUser.declineUser);

userRoutes.route('/getUser/:id').get(auth, ctrUser.getUser);

userRoutes.route('/getPromoteur/:id/:agence_id').get(auth, ctrUser.getPromoteur);

userRoutes.route('/updatePassword/:id').put(auth, ctrUserAutentification.updatePassword);

module.exports = userRoutes;