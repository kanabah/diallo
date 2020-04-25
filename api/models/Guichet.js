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
    variations: [{
        montantBrute: {
            type: Number,
            default: 0
        },
        description: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    user_id: String,
},{
    collection: 'guichets',
    timestamps: true
})

module.exports = mongoose.model('Guichet', guichetSchema);