const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

var commandeSchema = new Schema({
    nom:{
        type: String,
        required: true
    },
    prenom:{
        type: String,
        required: true
    },
    telOrange: Number,
    telMtn: Number,
    telCelcom: Number,
    adress: {
        commune: String,
        quartier: String,
        secteur: String
    },
    email: String,
    genre: String,
    entreprise: String,
    description: String,
    photo: String,
    commandes: [{
        typeCmd:String,
        somPay: Number,
        somRest: Number,
        somDoit: Number,
        somCredit: Number,
        typePay: String,
        modePay: String,
        dateCmd: {
            type: Date,
            default: Date.now
        },
        numCmd: String,
        client_id: String,
        user_id: {
            type: Schema.Types.ObjectId, ref: 'User'
        }       
    }],
    active: Number,
    user_id: String,
},{
    collection: 'clients',
    timestamps: true
})

module.exports = mongoose.model('Client', clientSchema);