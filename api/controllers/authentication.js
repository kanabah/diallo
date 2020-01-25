var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/User');

module.exports.register = function(req, res) {
    var user = new User();
  
    user.name = req.body.name;
    user.email = req.body.email;
    user.nameAgence = req.body.nameAgence;
    user.adress = req.body.adress;
    user.tel = req.body.tel;
  
    user.setPassword(req.body.password);
  
    user.save(function(err) {
      var token;
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    });
};

module.exports.login = function(req, res){
  username = req.body.email;

  password = req.body.password;
  
  User.findOne({ "email": { "$eq": username}, "active": { "$eq": 1} }, function (err, user) {
    if (err) { return new Error('error'); }
    // Return if user not found in database
    if (!user) {
      return new Error('úser not dound');
    }
    // Return if password is wrong
    if (!user.validPassword(password)) {
      return res.json(false);
    }
        // If credentials are correct, return the user object
      var token;
      token = user.generateJwt();
      // console.log('TOKEN:', token);
      res.status(200);
      res.json({
        "token" : token
      });
      //  return res.status(200).json(user)
    });
   
  };

  module.exports.updatePassword = async function(req, res) {
    var id = req.params.id
    try{
        var us = new User();
        us.setPassword(req.body.password);

        let user = await User.findOneAndUpdate({"_id": id},{ $set: us })
        if(user){
          console.log('User', req.body.passwordNew);
          
          // var user = new User();

          // user.setPassword(req.body.passwordNew);

          // var resettoken = new passwordResetToken({ _id: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
          // resettoken.save(function (err) {
          // if (err) { return res.status(500).send({ msg: err.message }); }
          // passwordResetToken.find({ _id: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
          // res.status(200).json({ message: 'Reset Password successfully.' });
          // })
      
          // user.save(function(err) {
          //   var token;
          //   token = user.generateJwt();
          //   res.status(200);
          //   res.json({
          //     "token" : token
          //   });
          // })
          
        }else{
          return res.status(404).send(new Error('Erreur 404...'));
        }
    }catch(err){
      return res.status(500).send(new Error('Erreur 500...'));

    }
    
};

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
