var Guichet = require('../models/Guichet');

module.exports.addGuichet = async function(req, res){
    try{
        let guichet = Guichet.insertMany(req.body);

        if(guichet){
           return res.status(200).json(guichet);
        }else{
            return res.status(404).send(new Error('404 not found'));
        }
        
    }catch(err){
        return res.status(500).send(new Error('Erreur server 500...'));
    }
}

module.exports.getGuichets = async function(req, res){
    try{
        let guichets = await Guichet.find({});
        
        if(!guichets){
            return res.status(404).send(new Error('Érror 404 data not found...'));
        }else{
            return res.status(200).json(guichets);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.deleteGuichet = async function(req, res){
    let id = req.params.id;
    try{
        let guichet = await Guichet.find({"_id": id});
        guichet[0].delete = 1;
        guichet[0].save();

        if(!guichet[0]){
            return res.status(404).send(new Error('Érror 404 data not found...'));
        }else{
            return res.status(200).json(guichet[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.uodateGuichet = async function(req, res){
    let id = req.params.id;
    try{
        let guichet = await Guichet.find({"_id": id});
        guichet[0].montant = req.body.montant;
        guichet[0].type = req.body.type;
        guichet[0].description = req.body.description;
        guichet[0].save();

        if(!guichet[0]){
            return res.status(404).send(new Error('Érror 404 data not found...'));
        }else{
            return res.status(200).json(guichet[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}