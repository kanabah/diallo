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
    let solde = req.params.solde;
    let description = req.params.description;
    try{
        let user = await User.find({"_id": id});
        let soldeActuel = {
            montant: solde,
            description: description
        }
        user[0].soldActuel.push(soldeActuel);

        user[0].save();
        console.log('User Solde', user[0]);
        

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

module.exports.getAllPromoteurs = async function(req, res){
    let agence_id = req.params.user_id;

    try{
        let users = await User.find({"active": 1, "role": 'promoteur', "agence_id": agence_id });
        
        if(!users){
            return res.status(404).send(new Error('Érror 404 data not found...'));
        }else{
            return res.status(200).json(users);
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

