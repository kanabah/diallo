var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    nameAgence:{
        type: String,
        required: true
    },
    adress:{
        type: String,
        required: true
    },
    tel:{
        type: Number,
        required: true
    },
    photo:{
        type: String
    },
    soldActuel: [{ //POUR LE PROMOTEUR
        montant: {
            type: Number,
            default: 0
        },
        description: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    soldSortie: [{ //POUR LE PROMOTEUR
        montant: {
            type: Number,
            default: 0
        },
        description: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    agence_id:{ //Pour l'ID de L'utilisteur qui gere l'agence pour aue si le promoteure enregistre un client on poura svoir qu'il s'agit d'un promoteur.
        type: String,
        required: false
    },
    role:{
        type: String,
        default: 'user'
    },
    active:{
        type: Number,
        default: 0
    },
    hash: String,
    salt: String
},{
    collection: 'users',
    timestamps: true
});

userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
  
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      role: this.role,
      agence_id: this.agence_id,
      exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };

  module.exports = mongoose.model('User', userSchema);