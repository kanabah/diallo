const express = require('express');
const promoteurRoutes = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

ctrPromoteur = require('../controllers/promoteurControllers');

promoteurRoutes.route('/entrerCaisse').post(auth, ctrPromoteur.entrerCaisse);

promoteurRoutes.route('/listeEntrerCaissse').get(auth, ctrPromoteur.listeEntrerCaissse);

promoteurRoutes.route('/getCaisseById/:id').get(auth, ctrPromoteur.getCaisseById);

promoteurRoutes.route('/getPromoteurs').get(auth, ctrPromoteur.getPromoteurs);

promoteurRoutes.route('/listeSortieCaissse').get(auth, ctrPromoteur.listeSortieCaissse);

promoteurRoutes.route('/getPromoteurByUserId').get(auth, ctrPromoteur.getPromoteurByUserId);

promoteurRoutes.route('/getPromoteurByUserIdForAgenceAndAdmi/:id').get(auth, ctrPromoteur.getPromoteurByUserIdForAgenceAndAdmi);

promoteurRoutes.route('/deleteCaisseById/:id').get(auth, ctrPromoteur.deleteCaisseById);

promoteurRoutes.route('/updatedCaisse/:id').put(auth, ctrPromoteur.updatedCaisse);

module.exports = promoteurRoutes;