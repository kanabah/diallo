var Guichet = require('../models/Guichet');

module.exports.addGuichet = async function(req, res){
    try{
        var type = req.body.type;
        var montant = req.body.montant;
        
    }catch(err){
        return res.status(500).send(new Error('Erreur server 500...'));
    }
}