const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

var guichetSchema = new Schema({
    _id: Schema.Types.ObjectId,
    type:{
        type: String,
        required: true
    },
    montant: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    tel: {
        type: Number,
    },
    code: String,
    autorise: {
        type: Number,
        default: 0
    },
    action: {
        type: Number,
        default: 0
    },
    delete: {
        type: Number,
        default: 0
    },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    // agence_id: { type: Schema.Types.ObjectId, ref: 'User' },
},{
    collection: 'guichets',
    timestamps: true
})

module.exports = mongoose.model('Guichet', guichetSchema);