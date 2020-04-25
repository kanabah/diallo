const express = require('express');
const guichetRoutes = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

ctrGuichet = require('../controllers/guichetControllers');

guichetRoutes.route('/addGuichet').post(auth, ctrGuichet.addGuichet);

module.exports = guichetRoutes;