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

module.exports.telExist = async function(req, res){
    let tel = req.params.tel;
    console.log('tel', tel)
    try{
        let user = await User.find({"tel": tel});
        console.log('user tel', user);
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

