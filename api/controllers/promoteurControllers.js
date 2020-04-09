let Promoteur = require('../models/Promoteur');

module.exports.entrerCaisse = async function(req, res){
    try{
        let promoteur = Promoteur.insertMany(req.body);

        if(promoteur){
           return res.status(200).json(promoteur);
        }else{
            return res.status(404).send(new Error('404 not found'));
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur server 500...'));
    }
}

module.exports.listeEntrerCaissse = async function(req, res){
    try{
        let promoteur = await Promoteur.find({"type": 'entrer', "user_id": req.payload._id}).populate('client_id');
        
        if(promoteur){
           return res.status(200).json(promoteur);
        }else{
            return res.status(404).send(new Error('404 not found'));
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur server 500...'));
    }
}

module.exports.listeSortieCaissse = async function(req, res){
    try{
        let promoteur = await Promoteur.find({"type": 'sortie', "user_id": req.payload._id}).populate('client_id');
        
        if(promoteur){
           return res.status(200).json(promoteur);
        }else{
            return res.status(404).send(new Error('404 not found'));
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur server 500...'));
    }
}

module.exports.getCaisseById = async function(req, res){
    var id = req.params.id;

    try{
        let promoteur = await Promoteur.find({"_id": id, "user_id": req.payload._id});
        
        if(promoteur){
           return res.status(200).json(promoteur);
        }else{
            return res.status(404).send(new Error('404 not found'));
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur server 500...'));
    }
}

module.exports.updatedCaisse = async function(req, res){
    var id = req.params.id;

    try{
        let promoteur = await Promoteur.find({"_id": id, "user_id": req.payload._id});
        console.log('Req Body', req.body);
        
        promoteur[0].montant = req.body.montant;
        promoteur[0].description = req.body.description;
        promoteur[0].save();

        if(promoteur){
           return res.status(200).json(promoteur);
        }else{
            return res.status(404).send(new Error('404 not found'));
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur server 500...'));
    }
}

module.exports.deleteCaisseById = async function(req, res){
    var id = req.params.id;

    try{
        let promoteur = await Promoteur.remove({"_id": id, "user_id": req.payload._id });
        if(promoteur){
           return res.status(200).json(promoteur);
        }else{
            return res.status(404).send(new Error('404 not found'));
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur server 500...'));
    }
}