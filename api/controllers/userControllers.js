var User = require('../models/User');

module.exports.emailExist = async function(req, res){
    let email = req.params.email;
    // console.log('email', email)
    try{
        let user = await User.find({"email": email});
        // console.log('user', user);
        if(!user){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.newUsers = async function(req, res){
    try{
        let users = await User.find({"active": 0});
        // console.log('user', user);
        if(!users){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(users);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.acpetUser = async function(req, res){
    let id = req.params.id;
    try{
        let user = await User.find({"_id": id});
        user[0].active = 1;
        user[0].save();

        if(!user[0]){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.addSoldePromoteur = async function(req, res){
    let id = req.params.id;
    let solde = req.body.montant;
    let description = req.body.description;
    try{
        let user = await User.find({"_id": id});
        let soldeActuel = {
            montant: solde,
            description: description
        }
        user[0].soldActuel.push(soldeActuel);

        user[0].save();

        if(!user[0]){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.addSoldeSortie = async function(req, res){
    let id = req.params.id;
    let solde = req.body.montant;
    let description = req.body.description;
    try{
        let user = await User.find({"_id": id});
        let soldeActuel = {
            montant: solde,
            description: description
        }
        user[0].soldSortie.push(soldeActuel);

        user[0].save();

        if(!user[0]){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.declineUser = async function(req, res){
    let id = req.params.id;
    try{
        let user = await User.deleteOne({"_id": id});
        
        if(!user){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.getAllUsersActive = async function(req, res){
    try{
        let users = await User.find({"active": 1, role: { $eq: 'user' }});
        
        if(!users){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(users);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.getUser = async function(req, res){
    let id  = req.params.id;
    try{
        let user = await User.find({"_id": id});
        
        if(!user[0]){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.updateDebitPromoteurForAgence = async function(req, res){
    let id  = req.params.id;
    let id_sold  = req.params.id_sold;
    try{
        let user = await User.find({"_id": id});
        var result = user[0].soldActuel.filter(res => {
            return res._id == id_sold;
        })

        result[0].montant = req.body.montant;
        result[0].description = req.body.description;
        
        console.log('Resulte', user[0]);
        user[0].save();
        
        if(!user[0]){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.updateDepotAgence = async function(req, res){
    let id  = req.params.id;
    let id_sold  = req.params.id_sold;
    try{
        let user = await User.find({"_id": id});
        var result = user[0].soldSortie.filter(res => {
            return res._id == id_sold;
        })

        result[0].montant = req.body.montant;
        result[0].description = req.body.description;
        
        user[0].save();
        
        if(!user[0]){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.deleteDebitPromoteurForAgence = async function(req, res){
    let id  = req.params.id;
    let id_sold  = req.params.id_sold;
    try{
        let user = await User.find({"_id": id});

        someArray = user[0].soldActuel.filter(result => result._id != id_sold);
        user[0].soldActuel = someArray;
        user[0].save();

        if(!user[0]){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.deleteDepotAgence = async function(req, res){
    let id  = req.params.id;
    let id_sold  = req.params.id_sold;
    try{
        let user = await User.find({"_id": id});

        someArray = user[0].soldSortie.filter(result => result._id != id_sold);
        user[0].soldSortie = someArray;
        user[0].save();

        if(!user[0]){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.changeEtatUser = async function(req, res){
    let id  = req.params.id;
    try{
        let user = await User.find({"_id": id});
        let active = user[0].active;
        user[0].active = active == 1 ? 0 : 1;
        // console.log('changeEtatUser', user[0]);
        user[0].save();
        

        if(!user[0]){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.getAllPromoteurs = async function(req, res){
    let agence_id = req.params.user_id;

    try{
        let users = await User.find({"role": 'promoteur', "agence_id": agence_id });
        
        if(!users){
            return res.status(404).send(new Error('Érror 404 data not found...'));
        }else{
            return res.status(200).json(users);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.getPromoteur = async function(req, res){
    let id = req.params.id;
    let agence_id = req.params.agence_id;

    try{
        let user = await User.find({"_id": id,"active": 1, "role": 'promoteur', "agence_id": agence_id });
        
        if(!user[0]){
            return res.status(404).send(new Error('Érror 404 data not found...'));
        }else{
            return res.status(200).json(user[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.attriButeRole = async function(req, res){
    let id = req.params.id; 
    let role = req.params.role;
    let agence_id = req.params.agence_id == 'Select' ? '' : req.params.agence_id;
    
    try{
        let user = await User.find({"_id": id});

        user[0].active = 1;
        // user[0].confirm = 1;
        user[0].role = role;
        user[0].agence_id = agence_id;
        user[0].save();

        if(!user[0]){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user[0]);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.telExist = async function(req, res){
    let tel = req.params.tel;
    try{
        let user = await User.find({"tel": tel});
        if(!user){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.telExistPromoteur = async function(req, res){
    let tel = req.params.tel;
    try{
        let user = await User.find({"tel": tel, "active": 1, "agence_id": req.payload._id, "role": 'promoteur'});
        if(!user){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.getUserByPhone = async function(req, res){
    let tel = req.params.tel;
    try{
        let user = await User.find({"tel": tel});
        if(!user){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user);
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.updateUser = async function(req, res){
    let id = req.params.id;
    
    try{
        let user = await User.find({"_id": id});
        
        if(!user){
            return res.status(404).send(new Error('Utilisateur not found 404'));
        }else{
            user[0].name = req.body.name;
            user[0].email = req.body.email;
            user[0].adress = req.body.adress;
            user[0].tel = req.body.tel;
            user[0].nameAgence = req.body.nameAgence;
            user[0].save();
            return res.status(200).json(user[0]);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.getUsers = async function(req, res){
    try{
        let user = await User.find({});

        if(!user){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
            return res.status(200).json(user);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}
