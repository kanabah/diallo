const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

var promoteurSchema = new Schema({
    _id: Schema.Types.ObjectId,
    montant:{
        type: Number,
        required: true
    },
    tel: {
        type: Number,
        required: true
    },
    description: String,
    active: {
        type: Number,
        default: 0
    },
    type: String,
    agence_id: String,
    user_id: String,
    client_id: { type: Schema.Types.ObjectId, ref: 'Client' },
    
},{
    collection: 'promoteurs',
    timestamps: true
})

module.exports = mongoose.model('Promoteur', promoteurSchema);