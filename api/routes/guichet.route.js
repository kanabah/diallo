const express = require('express');
const guichetRoutes = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

ctrGuichet = require('../controllers/guichetControllers');

guichetRoutes.route('/addGuichet').post(auth, ctrGuichet.addGuichet);

guichetRoutes.route('/getGuichets').get(auth, ctrGuichet.getGuichets);

guichetRoutes.route('/deleteGuichet/:id').get(auth, ctrGuichet.deleteGuichet);

guichetRoutes.route('/uodateGuichet/:id').put(auth, ctrGuichet.uodateGuichet);

module.exports = guichetRoutes;