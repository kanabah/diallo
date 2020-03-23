var Client = require('../models/Client');

module.exports.addClient = async function(req, res){
    try{
        console.log('Client', req.body);
        
        let client = Client.insertMany(req.body);

        if(client){
           return res.status(200).json(client);
        }else{
            return res.status(404).send(new Error('404 not found'));
        }
    }catch(err){
        return res.status(500).send(new Error('Erreur server 500...'));
    }
}

module.exports.telExist = async function(req, res){
    let tel = req.params.tel;
    if(tel !== ''){
        try{
            let client = await Client.find({$or: [{ "telOrange": tel}, { "telMtn": tel}, {"telCelcom": tel}]});
            if(!client){
                return res.status(404).send(new Error('Érror 404 data note found...'));
            }else{
                return res.status(200).json(client);
            }
            
        }catch(err){
            return res.status(500).send(new Error('Erreur 500...'));
        }
    }
}

module.exports.emailExist = async function(req, res){
    let email = req.params.email;
    if(email !== ''){
        try{
            let client = await Client.find({"email": email});
            if(!client){
                return res.status(404).send(new Error('Érror 404 data note found...'));
            }else{
                return res.status(200).json(client);
            }
            
        }catch(err){
            return res.status(500).send(new Error('Erreur 500...'));
        }
    }
}

module.exports.allClientCommande = async function(req, res){
    try{
        let clients = await Client.find({ nbCmd: { $ne: 0 }}).sort( { nbCmd: -1 } );

        if(!clients){
            return res.status(404).send(new Error('Produit not found 404'));
        }else{
            
            return res.status(200).json(clients);

        }
    }catch(err){
        return res.status(500).send(new Error('Error 500'));
    }
}

module.exports.allClient = async function(req, res){
    var nbOM = 0;
    var nbMoMo = 0;
    try{
        let clients = await Client.find({});
        let clis = await Client.aggregate([{$unwind: {path: "$commandes"}}]);

        // console.log('All client', clis);
        

          var returnInfoClient = {
            clients: clients,
            nbOM: nbOM,
            nbMoMo: nbMoMo,
            clis: clis
          }

        
        if(!clients){
            return res.status(404).send(new Error('Produit not found 404'));
        }else{
            return res.status(200).json(returnInfoClient);

        }
    }catch(err){
        return res.status(500).send(new Error('Error 500'));
    }
}

module.exports.allCommande = async function(req, res){
    try{
        let commandes = await Client.find({}).distinct('commandes');

        if(!commandes){
            return res.status(404).send(new Error('Produit not found 404'));
        }else{
            return res.status(200).json(commandes);
        }
    }catch(err){
        return res.status(500).send(new Error('Error 500'));
    }
}

module.exports.clientDettaille = async function(req, res){
    let id = req.params.id;
    
    try{
        let client = await Client.find({"_id": id});
        
        if(!client){
            return res.status(404).send(new Error('Utilisateur not found 404'));
        }else{
            
            return res.status(200).json(client[0]);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.getCommandeCredit = async function(req, res){
    let id = req.params.id;
    
    try{
        let client = await Client.find({"_id": id});
        
        if(!client){
            return res.status(404).send(new Error('Utilisateur not found 404'));
        }else{
            
            return res.status(200).json(client[0]);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.reglementList = async function(req, res){
    let cmd_id = req.params.cmd_id;
    let client_id = req.params.client_id;
    
    try{
        let client = await Client.find({"_id": client_id});
        
        if(!client){
            return res.status(404).send(new Error('Utilisateur not found 404'));
        }else{
            commandes = client[0].commandes.filter(function(res){
                return res._id == cmd_id && res.delete == 0;
            })    

            // console.log('MY COMMANDES', commandes.reglement);
            
            return res.status(200).json(commandes);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.testMontantRelementCommande = async function(req, res){
    let id = req.params.id;
    let montant = req.params.montant;
    
    try{
        let client = await Client.distinct('commandes');

        commande = client.filter(function(res){
            return res._id == id;
        })
        
        if(!commande){
            return res.status(404).send(new Error('Commande not found 404'));
        }else{
            return res.status(200).json(commande[0]);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.updateClient = async function(req, res){
    let id = req.params.id;
    
    try{
        let client = await Client.find({"_id": id});
        
        if(!client){
            return res.status(404).send(new Error('Utilisateur not found 404'));
        }else{
            console.log('Detailele Update', req.body);
            
            client[0].avatar = req.body.avatar == '' ? client[0].avatar : req.body.avatar;
            client[0].nom = req.body.nom;
            client[0].prenom = req.body.prenom;
            client[0].email = req.body.email;
            client[0].telOrange = req.body.telOrange;
            client[0].telMtn = req.body.telMtn;
            client[0].telCelcom = req.body.telCelcom;
            client[0].telPerso = req.body.telPerso;
            client[0].entreprise = req.body.entreprise;
            client[0].description = req.body.description;
            client[0].genre = req.body.genre;
            client[0].adress.commune = req.body.adress.commune;
            client[0].adress.quartier = req.body.adress.quartier;
            client[0].adress.secteur = req.body.adress.secteur;
            client[0].save();
            return res.status(200).json(client[0]);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}


module.exports.addCommande = async function(req, res){
    let id = req.params.id;
    let user_id = req.params.user_id;
    let date = new Date();

    try{
        let client = await Client.find({"_id": id});
        
        if(!client){
            return res.status(404).send(new Error('Utilisateur not found 404'));
        }else{
            req.body.commandes.user_id = user_id;
            req.body.commandes.client_id = id;
            req.body.commandes.typePayGard = req.body.commandes.typePay;

            req.body.commandes.reglement = {
                typeCmd: req.body.commandes.typeCmd,
                somPay: req.body.commandes.somPay,
                somRest: req.body.commandes.somRest,
                somCredit: req.body.commandes.somCredit,
                typePay: req.body.commandes.typePay,
                modePay: req.body.commandes.modePay,
                
                someRegler: 0,
                somePayer: 0,
                someRestant: req.body.commandes.somRest,
                cmd_direct: 1
            }
            client[0].nbCmd = client[0].nbCmd + 1;
            client[0].deteCmdUpdate = date;
            
            client[0].commandes.push(req.body.commandes);
            client[0].save();

            return res.status(200).json(client[0]);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.addReglement = async function(req, res){
    let id = req.params.id;
    let client_id = req.params.client_id;

    try{
        let client = await Client.find({'_id': client_id});
        
        commande = client[0].commandes.filter(function(res){
            return res._id == id;
        })

        commande[0].somRest = commande[0].somRest - req.body.montant;
        if(commande[0].somCredit){
            commande[0].somCredit = commande[0].somCredit - req.body.montant;
        }
        if(commande[0].somRest == 0){
            commande[0].typePay = 'Total';
            commande[0].traitement = 0;
        }
        
        commande[0].somPay = Number(commande[0].somPay) +  Number(req.body.montant);

        let insert = {
            someRegler: req.body.montant,
            somPay: commande[0].somPay,
            somRest: commande[0].somRest,
            typePay: commande[0].typePay,
            typeCmd: commande[0].typeCmd,
            somCredit: commande[0].somCredit,
            modePay: req.body.modePay
        }
        commande[0].reglement.push(insert);
        commande[0].update = 1;
        

        if(!client){
            return res.status(404).send(new Error('Utilisateur not found 404'));
        }else{
            client[0].save();
            return res.status(200).json(client[0]);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.deleteCommande = async function(req, res){
    let id = req.params.id;
    let client_id = req.params.client_id;

    try{
        let client = await Client.find({'_id': client_id});
        
        commande = client[0].commandes.filter(function(res){
            return res._id == id;
        })
        commande[0].delete = 1;
        
        if(!client){
            return res.status(404).send(new Error('Utilisateur not found 404'));
        }else{
            client[0].save();
            return res.status(200).json(client[0]);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.deleteReglement = async function(req, res){
    let reglement_id = req.params.reglement_id;
    let cmd_id = req.params.cmd_id;
    let client_id = req.params.client_id;

    try{
        let client = await Client.find({"_id": client_id});
        let commandes = client[0].commandes;
        
        if(!client){
            return res.status(404).send(new Error('Utilisateur not found 404'));
        }else{
            commande = commandes.filter(function(res){
                return res._id == cmd_id;
            })

            
            reglementCount = commande[0].reglement.filter(function(res){
                return res.delete == 0;
            })
            // console.log('Reglement', reglementCount.length);
            
            
            reglement = commande[0].reglement.filter(function(res){
                return res._id == reglement_id;
            })
            
            if(commande[0].somRest == 0){
                commande[0].typePay = commande[0].typePayGard;
                commande[0].traitement = 1;    
            }

            if(commande[0].typePayGard == 'Credit'){
                commande[0].somCredit = commande[0].somCredit + reglement[0].someRegler;
            }
            commande[0].somPay = commande[0].somPay - reglement[0].someRegler;
            commande[0].somRest = Number(commande[0].somRest) + Number(reglement[0].someRegler);
            reglement[0].delete = 1;

            if(reglementCount.length == 2){
                commande[0].update = 0;
            }
            
            client[0].save();
            return res.status(200).json(client[0]);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.getCommande = async function(req, res){
    let cmd_id = req.params.cmd_id;
    let client_id = req.params.client_id;

    try{
        let client = await Client.find({"_id": client_id});
        let commandes = client[0].commandes;
        
        if(!client){
            return res.status(404).send(new Error('Utilisateur not found 404'));
        }else{
            commande = commandes.filter(function(res){
                return res._id == cmd_id;
            })
            
            return res.status(200).json(commande);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.onUpdateCommande = async function(req, res){
    let cmd_id = req.params.cmd_id;
    let client_id = req.params.client_id;
    let user_id = req.params.user_id;

    try{
        let client = await Client.find({"_id": client_id});
        
        if(!client){
            return res.status(404).send(new Error('Utilisateur not found 404'));
        }else{
            commande = client[0].commandes.filter(function(res){
                return res._id == cmd_id
            })

            reglement = commande[0].reglement[0];

            commande[0].user_id = user_id;
            commande[0].client_id = client_id;
            commande[0].typePayGard = req.body.commandes.typePay;
            commande[0].typePay = req.body.commandes.typePay;
            commande[0].somPay = req.body.commandes.somPay;
            commande[0].somRest = req.body.commandes.somRest;
            commande[0].somCredit = req.body.commandes.somCredit;
            commande[0].typePay = req.body.commandes.typePay;
            commande[0].modePay = req.body.commandes.modePay;
            commande[0].opperateur = req.body.commandes.opperateur;
            commande[0].nbStartTimes = req.body.commandes.nbStartTimes;
            commande[0].traitement = req.body.commandes.traitement;
            // commande[0].dateCmd = Date.now();

            reglement.somPay = req.body.commandes.somPay;
            reglement.somRest = req.body.commandes.somRest;
            reglement.somCredit = req.body.commandes.somCredit;
            reglement.typePay = req.body.commandes.typePay;
            reglement.modePay = req.body.commandes.modePay;
            // reglement.datePay = Date.now();

            client[0].save();

            return res.status(200).json(client[0]);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

//=============DEBUT CUSTUM DATE GET WEEK IN JAVASCRIPT==================
Date.prototype.getWeek = function (dowOffset) {
    /*getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com */

    dowOffset = typeof(dowOffset) == 'int' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.getFullYear(),0,1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = (day >= 0 ? day : day + 7);
    var daynum = Math.floor((this.getTime() - newYear.getTime() - 
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if(day < 4) {
        weeknum = Math.floor((daynum+day-1)/7) + 1;
        if(weeknum > 52) {
            nYear = new Date(this.getFullYear() + 1,0,1);
            nday = nYear.getDay() - dowOffset;
            nday = nday >= 0 ? nday : nday + 7;
            /*if the next year starts before the middle of
                the week, it is week #1 of that year*/
                weeknum = nday < 4 ? 1 : 53;
        }
    }
    else {
        weeknum = Math.floor((daynum+day-1)/7);
    }
    return weeknum;
};
//=============FIN CUSTUM DATE GET WEEK IN JAVASCRIPT==================

//============DEBUT CUSTUM FORMAT DATE ======================================

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
//============FIN CUSTUM FORMA DATE===================================

module.exports.onAujourdhui = async function(req, res){

    let client_id = req.params.client_id;
    date = new Date();

    try{
        let client = await Client.find({"_id": client_id});
        commandes = client[0].commandes.filter(function(res){
            return  res.delete == 0 && res.dateCmd.getDate() == date.getDate() && res.dateCmd.getMonth() == date.getMonth() && res.dateCmd.getFullYear() == date.getFullYear();
        })  

        return res.status(200).json(commandes);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.getMontantClient = async function(req, res){
    let client_id = req.params.id;
    let type = req.params.type;
    var sumTotal = 0;
    var sumOM = 0;
    var sumMoMo = 0;
    var sumST = 0;
    var sumTransfert = 0;
    try{
        let client = await Client.find({"_id": client_id});
        // let client = await Client.aggregate([{$unwind: "$commandes"}, {$group: {_id: null, sum: {$sum: "$commandes.somRest"}}}]);

        client[0].commandes.forEach(res =>{
            sumTotal +=res.somRest;
            
            if(res.typeCmd == 'OM'){
                sumOM +=res.somRest;
            }

            if(res.typeCmd == 'MoMo'){
                sumMoMo +=res.somRest;
            }
            if(res.typeCmd == 'ST'){
                sumST +=res.somRest;
            }
            if(res.typeCmd == 'Transfert'){
                sumTransfert +=res.somRest;
            }
        });
        
        var resultats = {
            somRestOM: sumOM,
            somRestMoMo: sumMoMo,
            somRestST: sumST,
            somRestTransfert: sumTransfert,
            somRestTotal: sumTotal,
        }

        console.log('Get Some Credit', resultats);
        
        return res.status(200).json(resultats);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.onSemaine = async function(req, res){

    let client_id = req.params.client_id;
    date = new Date(); 
    try{
        let client = await Client.find({"_id": client_id});
        commandes = client[0].commandes.filter(function(res){
            return  res.delete == 0 && res.dateCmd.getWeek() == date.getWeek() && res.dateCmd.getFullYear() == date.getFullYear();
        })  

        return res.status(200).json(commandes);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.onMonth = async function(req, res){

    let client_id = req.params.client_id;
    date = new Date(); 
    
    try{
        let client = await Client.find({"_id": client_id});
        commandes = client[0].commandes.filter(function(res){
            return res.delete == 0 && res.dateCmd.getMonth() == date.getMonth() && res.dateCmd.getFullYear() == date.getFullYear();
        })  

        return res.status(200).json(commandes);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.onTranche = async function(req, res){
    let client_id = req.params.client_id;
    
    try{
        let client = await Client.find({"_id": client_id});
        commandes = client[0].commandes.filter(function(res){
            return res.delete == 0 && res.typePay == 'Tranche';
        })  

        return res.status(200).json(commandes);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.onCredit = async function(req, res){
    let client_id = req.params.client_id;
    
    try{
        let client = await Client.find({"_id": client_id});
        commandes = client[0].commandes.filter(function(res){
            return res.delete == 0 && res.typePay == 'Credit';
        })  

        return res.status(200).json(commandes);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.onTotalCmd = async function(req, res){
    let client_id = req.params.client_id;
    
    try{
        let client = await Client.find({"_id": client_id});
        commandes = client[0].commandes.filter(function(res){
            return res.delete == 0 && res.typePay == 'Total';
        })  

        return res.status(200).json(commandes);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.returnInfoHome = async function(req, res){
    var date = new Date();
    
    try{
        var sumTotalOM = 0;  
        var sumTotalMoMo = 0;  
        var sumTotalST = 0;  
        var sumTotalTransfert = 0;  

        var sumCreditOM = 0;  
        var sumCreditMoMo = 0;  
        var sumCreditST = 0;  
        var sumCreditTransfert = 0;

        var sumEntrerJour = 0;  
        var sumEntrerWeek = 0;  
        var sumEntrerMonth = 0;  
        var sumEntrerYear = 0;  
        var sumEntrerAll = 0;  

        var total = 0;  
        var pourcentOM = 0;  
        var pourcentMoMo = 0;  
        var pourcentST = 0;  
        var pourcentTransfert = 0;
        var month = date.getMonth() + 1;
        var year =  date.getFullYear();
        var countNbCmdMonth = 0;
        var countNbCmdDay = 0;
        var countNbCmdWeek = 0;
        var countNbCmdYear = 0;
        var countNbCmdAll = 0;
        var myDate;

        var pourcentNbCmdDay = 0;
        var pourcentNbCmdMonth = 0;
        var pourcentNbCmdWeek = 0;
        var pourcentNbCmdYear = 0;

        myDate = formatDate(date);

        let cmds = await Client.distinct('commandes');
        let nbClientTranche = await Client.find({"commandes.typePay": 'Tranche', "commandes.delete": 0}).count();
        let nbClientCredit = await Client.find({"commandes.typePay": 'Credit', "commandes.delete": 0}).count();
        let nbClientTotal = await Client.find({"commandes.typePay": 'Total', "commandes.delete": 0}).count();
        let clients = await Client.find({nbCmd: { $ne: 0 }}).sort( { nbCmd: -1 } ).limit(5);
        let nbClients = await Client.find({}).count();

        commandes = cmds.filter(function(res){
            return res.delete == 0;
        });
        
        let commandeMonth = [];
            commandes.forEach(result => {
                if(result.delete == 0 && result.dateCmd.getMonth() == date.getMonth() && result.dateCmd.getFullYear() == date.getFullYear()){
                    countNbCmdMonth += 1;
                    commandeMonth.push(result);
                }
                if(result.delete == 0 && result.dateCmd.getDate() == date.getDate() && result.dateCmd.getMonth() == date.getMonth() && result.dateCmd.getFullYear() == date.getFullYear()){
                    countNbCmdDay += 1;
                    commandeMonth.push(result);
                }
                if(result.delete == 0 && result.dateCmd.getWeek() == date.getWeek() && result.dateCmd.getFullYear() == date.getFullYear()){
                    countNbCmdWeek += 1;
                    commandeMonth.push(result);
                }
                if(result.delete == 0 && result.dateCmd.getFullYear() == date.getFullYear()){
                    countNbCmdYear += 1;
                    commandeMonth.push(result);
                }
                if(result.delete == 0){
                    countNbCmdAll += 1;
                    commandeMonth.push(result);
                }
            })

        commandes.forEach(res => {
            if(res.typeCmd == 'OM'){
                sumTotalOM += res.somPay
                sumCreditOM += res.somRest;
            }else if(res.typeCmd == 'MoMo'){
                sumTotalMoMo += res.somPay
                sumCreditMoMo += res.somRest
            }else if(res.typeCmd == 'ST'){
                sumTotalST += res.somPay
                sumCreditST += res.somRest
            }else if(res.typeCmd == 'Transfert'){
                sumTotalTransfert += res.somPay
                sumCreditTransfert += res.somRest
            }
            
            if(res.delete == 0 && res.dateCmd.getDate() == date.getDate() && res.dateCmd.getMonth() == date.getMonth() && res.dateCmd.getFullYear() == date.getFullYear()){
                sumEntrerJour += res.somPay;
            }

            if(res.delete == 0 && res.dateCmd.getWeek() == date.getWeek() && res.dateCmd.getFullYear() == date.getFullYear()){
                sumEntrerWeek += res.somPay;
            }

            if(res.delete == 0 && res.dateCmd.getMonth() == date.getMonth() && res.dateCmd.getFullYear() == date.getFullYear()){
                sumEntrerMonth += res.somPay;
            }

            if(res.delete == 0 && res.dateCmd.getFullYear() == date.getFullYear()){
                sumEntrerYear += res.somPay;
            }

            if(res.delete == 0){
                sumEntrerAll += res.somPay;
            }
        });

        // console.log('Somme Credit Orange Money', sumCreditOM);
        // console.log('Somme Credit MoMo', sumCreditMoMo);
        // console.log('Somme Credit ST', sumCreditST);
        // console.log('Somme Credit TRansfert', sumCreditTransfert);
        
        
        total = sumTotalOM + sumTotalMoMo + sumTotalST + sumTotalTransfert;
        
        pourcentOM = Math.round((sumTotalOM * 100)/ total);
        pourcentMoMo = Math.round((sumTotalMoMo * 100)/ total);
        pourcentST = Math.round((sumTotalST * 100)/ total);
        pourcentTransfert = Math.round((sumTotalTransfert * 100)/ total);

        //CALCUL POURCENTAGE COOMMANDE
        pourcentNbCmdDay = Math.round((countNbCmdDay * 100)/40);
        pourcentNbCmdWeek = Math.round((countNbCmdWeek * 100)/240);
        pourcentNbCmdMonth = Math.round((countNbCmdMonth * 100)/960);
        pourcentNbCmdYear = Math.round((countNbCmdYear * 100)/11520);

        var returnSumTotal = {
            sumTotalOM: sumTotalOM,
            sumTotalMoMo: sumTotalMoMo,
            sumTotalST: sumTotalST,
            sumTotalTransfert: sumTotalTransfert,
            pourcentOM: pourcentOM,
            pourcentMoMo: pourcentMoMo,
            pourcentST: pourcentST,
            pourcentTransfert: pourcentTransfert,
            total: total,
            sumCreditOM: sumCreditOM,
            sumCreditMoMo: sumCreditMoMo,
            sumCreditST: sumCreditST,
            sumCreditTransfert: sumCreditTransfert,
            sumEntrerJour: sumEntrerJour,
            sumEntrerWeek: sumEntrerWeek,
            sumEntrerMonth: sumEntrerMonth,
            sumEntrerYear: sumEntrerYear,
            sumEntrerAll: sumEntrerAll,
            countNbCmdMonth: countNbCmdMonth,
            countNbCmdDay: countNbCmdDay,
            countNbCmdWeek: countNbCmdWeek,
            countNbCmdYear: countNbCmdYear,
            countNbCmdAll: countNbCmdAll,
            nbClientTranche: nbClientTranche,
            nbClientCredit: nbClientCredit,
            nbClientTotal: nbClientTotal,
            pourcentNbCmdDay: pourcentNbCmdDay,
            pourcentNbCmdMonth: pourcentNbCmdMonth,
            pourcentNbCmdWeek: pourcentNbCmdWeek,
            pourcentNbCmdYear: pourcentNbCmdYear,
            nbClients: nbClients,
            clients: clients,
        }

        // console.log('Somme Total OM', sumTotalOM);
        // console.log('Somme Total MoMo', sumTotalMoMo);
        // console.log('Somme Total ST', sumTotalST);
        // console.log('Somme Total Transfert', sumTotalTransfert);
        // console.log('pourcentOM', pourcentOM);
        // console.log('Total', total);

        // console.log('Sum Entrer Jour', sumEntrerJour);
        // console.log('Sum Entrer Week', sumEntrerWeek);
        // console.log('Sum Entrer Month', sumEntrerMonth);
        

        return res.status(200).json(returnSumTotal);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.periode = async function(req, res){
    var date = new Date();
    let periode = req.params.periode;
    var month = date.getMonth() + 1;
    var year =  date.getFullYear();
    var day =  date.getDate();
    var somPayTotal = 0;
    var somCreditTotal = 0;
    // console.log('Date', year);
    

    try{
        let clis = await Client.find({}).sort( { nbCmd: -1 } ); 
            if(periode == 'today'){
                clients = clis.filter(function(result){
                    if(result.deteCmdUpdate){
                        return result.deteCmdUpdate.getDate() == date.getDate() && result.deteCmdUpdate.getMonth() == date.getMonth() && result.deteCmdUpdate.getFullYear() == date.getFullYear();
                    }
                    
                })

                clients.forEach(res => {
                    res.commandes.forEach(result => {
                        if(result.delete == 0 && result.dateCmd.getDate() == date.getDate() && result.dateCmd.getMonth() == date.getMonth() && result.dateCmd.getFullYear() == date.getFullYear()){
                            // commandeMonth.push(result);
                            somPayTotal += result.somPay;
                            somCreditTotal += result.somRest;
                        }
                    })
                })

            }else if(periode == 'ceMois'){
                clients = clis.filter(function(result){
                    if(result.deteCmdUpdate){
                        return  result.deteCmdUpdate.getMonth() == date.getMonth() && result.deteCmdUpdate.getFullYear() == date.getFullYear();
                    }
                    
                })

                clients.forEach(res => {
                    res.commandes.forEach(result => {
                        if(result.delete == 0 && result.dateCmd.getMonth() == date.getMonth() && result.dateCmd.getFullYear() == date.getFullYear()){
                            // commandeMonth.push(result);
                            somPayTotal += result.somPay;
                            somCreditTotal += result.somRest;
                        }
                    })
                })
            }else if(periode == 'week'){
                clients = clis.filter(function(result){
                    if(result.deteCmdUpdate){
                        return  result.deteCmdUpdate.getWeek() == date.getWeek() && result.deteCmdUpdate.getFullYear() == date.getFullYear();
                    }
                    
                })

                clients.forEach(res => {
                    res.commandes.forEach(result => {
                        if(result.delete == 0 && result.dateCmd.getWeek() == date.getWeek() && result.dateCmd.getFullYear() == date.getFullYear()){
                            // commandeMonth.push(result);
                            somPayTotal += result.somPay;
                            somCreditTotal += result.somRest;
                        }
                    })
                })
            }else if(periode == 'year'){
                clients = clis.filter(function(result){
                    if(result.deteCmdUpdate){
                        return result.deteCmdUpdate.getFullYear() == date.getFullYear();
                    }
                    
                })

                clients.forEach(res => {
                    res.commandes.forEach(result => {
                        if(result.delete == 0 && result.dateCmd.getFullYear() == date.getFullYear()){
                            // commandeMonth.push(result);
                            somPayTotal += result.somPay;
                            somCreditTotal += result.somRest;
                        }
                    })
                })
            }else if(periode == 'all'){
                
                clients = clis.filter(function(result){
                    if(result.deteCmdUpdate){
                        return result;
                    }
                    
                });

                clients.forEach(res => {
                    res.commandes.forEach(result => {
                        if(result.delete == 0){
                            // commandeMonth.push(result);
                            somPayTotal += result.somPay;
                            somCreditTotal += result.somRest;
                        }
                    })
                })

            }

            var clientNumber = clients.length;
            var returnInfoPeriode = {
                clientNumber: clientNumber,
                clients: clients,
                somPayTotal: somPayTotal,
                somCreditTotal: somCreditTotal
        }
        
        return res.status(200).json(returnInfoPeriode);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.periodeDetailleCommande = async function(req, res){
    var date = new Date();
    let id = req.params.id;
    let myParams = req.params.myParams;
    var month = date.getMonth() + 1;
    var year =  date.getFullYear();
    var somPayClient = 0;
    var somCreditClient = 0;
    var nbCmd = 0;
    // console.log('myParams', myParams);
    
    try{
        let client = await Client.find({"_id": id});
        cmds = client[0].commandes;
        
        if(myParams == 'today'){
            commandes = cmds.filter(function(result){
                return result.delete == 0 && result.dateCmd.getDate() == date.getDate() && result.dateCmd.getMonth() == date.getMonth() && result.dateCmd.getFullYear() == date.getFullYear();
            })

        }else if(myParams == 'ceMois'){
            commandes = cmds.filter(function(result){
                return result.delete == 0 && result.dateCmd.getMonth() == date.getMonth() && result.dateCmd.getFullYear() == date.getFullYear();
            })
        }else if(myParams == 'week'){
            commandes = cmds.filter(function(result){
                return result.delete == 0 && result.dateCmd.getWeek() == date.getWeek() && result.dateCmd.getFullYear() == date.getFullYear();
            })
        }else if(myParams == 'year'){
            commandes = cmds.filter(function(result){
                return result.delete == 0 && result.dateCmd.getFullYear() == date.getFullYear();
            })
        }else if(myParams == 'all'){
            commandes = cmds.filter(function(result){
                return result.delete == 0;
            })
        }

        commandes.forEach(function(res){
            somPayClient += res.somPay;
            somCreditClient += res.somRest;
        })
        returnInfoPeriodeDetailleCommande= {
            client: client,
            commandes: commandes,
            somPayClient: somPayClient,
            somCreditClient: somCreditClient,
            nbCmd: commandes.length
        }

        
        // console.log('Periode Month', commandes);
        

        return res.status(200).json(returnInfoPeriodeDetailleCommande);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}


module.exports.TypePayement = async function(req, res){
    // var date = new Date();
    let typePay = req.params.typePay;
    // var month = date.getMonth() + 1;
    // var year =  date.getFullYear();
    // console.log('Tranche')
    try{
        let typePayements = await Client.aggregate([
             {$unwind: {path: "$commandes"}},
             { $match: {"commandes.typePay": { "$eq": typePay}, "commandes.delete": { "$eq": 0}}}]).sort( { "commandes.dateCmd": -1 } );
            // console.log('nbNomPay Tranche', typePayements  );
        
        
        return res.status(200).json(typePayements);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}

module.exports.commandeCredit = async function(req, res){
    var date = new Date();
    let periode = req.params.periode;
    var day =  date.getDate();
    var week =  date.getWeek();
    var month = date.getMonth();
    var year =  date.getFullYear();
    // console.log('Tranche')
    try{
        let commandeCredits = await Client.aggregate([
             {$unwind: {path: "$commandes"}},
             { $match: {"commandes.typePay": { "$in": ['Credit', 'Tranche']}, "commandes.delete": { "$eq": 0}}}
            ]).sort( { "commandes.dateCmd": -1 } );
            if(periode == 'today'){
                clients = commandeCredits.filter(function(result){
                    return result.commandes.dateCmd.getDate() == day && result.commandes.dateCmd.getMonth() == month && result.commandes.dateCmd.getFullYear() == year;
                })
            }else if(periode == 'week'){
                clients = commandeCredits.filter(function(result){
                    return result.commandes.dateCmd.getWeek() == week && result.commandes.dateCmd.getFullYear() == year;
                })
            }else if(periode == 'month'){
                clients = commandeCredits.filter(function(result){
                    return result.commandes.dateCmd.getMonth() == month && result.commandes.dateCmd.getFullYear() == year;
                })
            }else if(periode == 'year'){
                clients = commandeCredits.filter(function(result){
                    return result.commandes.dateCmd.getFullYear() == year;
                })
            }else if(periode == 'all'){
                clients = commandeCredits;
                console.log('All', clients);
                
            }
        
        return res.status(200).json(clients);
    }catch(err){
        return res.status(500).send(new Error('Erreur de server 500...'));
    }
}
