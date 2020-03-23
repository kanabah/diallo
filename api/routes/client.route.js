const express = require('express');
const clientRoutes = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
const multer = require('multer');
const mkdirp = require('mkdirp');
const bodyParser= require('body-parser');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './public/images/uploads';
        mkdirp(dir, err => cb(err, dir))
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toLocaleDateString()+new Date().getTime()+ file.originalname)
    }
});
const upload = multer({ storage })

ctrClient = require('../controllers/clientControllers');

clientRoutes.route('/addClient').post(auth,ctrClient.addClient);

clientRoutes.route('/telExist/:tel').get(auth,ctrClient.telExist);

clientRoutes.route('/existEmail/:email').get(auth,ctrClient.emailExist);

clientRoutes.route('/allClient').get(auth,ctrClient.allClient);

clientRoutes.route('/allClientCommande').get(auth,ctrClient.allClientCommande);

clientRoutes.route('/allCommande').get(auth,ctrClient.allCommande);

clientRoutes.route('/detaille/:id').get(auth,ctrClient.clientDettaille);

clientRoutes.route('/getCommandeCredit/:id').get(auth,ctrClient.getCommandeCredit);

clientRoutes.route('/getMontantClient/:id/:type').get(auth,ctrClient.getMontantClient);

clientRoutes.route('/periodeDetailleCommande/:id/:myParams').get(auth,ctrClient.periodeDetailleCommande);

clientRoutes.route('/TypePayement/:typePay').get(auth,ctrClient.TypePayement);

clientRoutes.route('/testMontantRelementCommande/:montant/:id').get(auth,ctrClient.testMontantRelementCommande);

clientRoutes.route('/getCommande/:cmd_id/:client_id').get(auth,ctrClient.getCommande);

clientRoutes.route('/updateClient/:id').put(auth,ctrClient.updateClient);

clientRoutes.route('/addReglement/:id/:client_id').put(auth,ctrClient.addReglement);

clientRoutes.route('/onUpdateCommande/:cmd_id/:client_id/:user_id').put(auth,ctrClient.onUpdateCommande);

clientRoutes.route('/deleteCommande/:id/:client_id').get(auth,ctrClient.deleteCommande);

clientRoutes.route('/commandeCredit/:periode').get(auth,ctrClient.commandeCredit);

clientRoutes.route('/reglementList/:cmd_id/:client_id').get(auth,ctrClient.reglementList);

clientRoutes.route('/onAujourdhui/:client_id').get(auth,ctrClient.onAujourdhui);

clientRoutes.route('/onSemaine/:client_id').get(auth,ctrClient.onSemaine);

clientRoutes.route('/onMonth/:client_id').get(auth,ctrClient.onMonth);

clientRoutes.route('/periode/:periode').get(auth,ctrClient.periode);

clientRoutes.route('/onTranche/:client_id').get(auth,ctrClient.onTranche);

clientRoutes.route('/onCredit/:client_id').get(auth,ctrClient.onCredit);

clientRoutes.route('/onTotalCmd/:client_id').get(auth,ctrClient.onTotalCmd);

clientRoutes.route('/returnInfoHome').get(auth,ctrClient.returnInfoHome);

clientRoutes.route('/deleteReglement/:cmd_id/:reglement_id/:client_id').get(auth,ctrClient.deleteReglement);

clientRoutes.route('/addCommande/:id/user_id/:user_id').put(auth,ctrClient.addCommande);

//UPLOAD IMAGE AVATAR
clientRoutes.route('/avatar').post(upload.single('file'), (req, res) => {
    if (req.file) {
        return res.json(`${req.file.path}`);
    }
    else{
        return res.json(``);
  } 
});

module.exports = clientRoutes;