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

userRoutes.route('/profile').get(auth, ctrProfile.profileRead);

userRoutes.route('/updatePassword/:id').put(auth, ctrUserAutentification.updatePassword);

module.exports = userRoutes;