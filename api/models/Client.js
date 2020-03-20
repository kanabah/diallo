const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

var clientSchema = new Schema({
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
    telPerso: Number,
    adress: {
        commune: String,
        quartier: String,
        secteur: String
    },
    email: String,
    genre: String,
    entreprise: String,
    description: String,
    avatar: String,
    commandes: [{
        typeCmd:String,
        somPay: Number,
        somRest: {
            type: Number,
            default: 0
        },
        somDoit: Number,
        somCredit: Number,
        typePay: String,
        modePay: String,
        nbStartTimes: Number,
        typePayGard: String,
        opperateur: String,
        dateCmd: {
            type: Date,
            default: Date.now
        },
        numCmd: String,
        client_id: String,
        user_id: {
            type: Schema.Types.ObjectId, ref: 'User'
        },
        traitement: Number,
        update: {
            type: Number,
            default: 0
        },
        delete: {
            type: Number,
            default: 0
        },
        reglement: [{
            typeCmd:String,
            somPay: Number,
            somRest: Number,
            somCredit: Number,
            typePay: String,
            modePay: String,

            someRegler: {
                type: Number,
                default: 0
            },
            // somePayer: Number,
            // someRestant: Number,
            datePay: {
                type: Date,
                default: Date.now
            },
            delete: {
                type: Number,
                default: 0
            },  
            cmd_direct: {
                type: Number,
                default: 0
            },  
            
        }]       
    }],
    active: Number,
    nbCmd: {
        type: Number,
        default: 0
    },
    deteCmdUpdate: {
        type: Date,
        default: null
    },
    user_id: String,
},{
    collection: 'clients',
    timestamps: true
})

module.exports = mongoose.model('Client', clientSchema);