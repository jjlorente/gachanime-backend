const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarketSchema = new Schema({
    userid: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    cardid: { 
        type: Schema.Types.ObjectId, 
        ref: 'Card',
        required: true 
    },
    price: { 
        type: Number,
        required: true 
    }
});

module.exports = Market = mongoose.model('Market', MarketSchema);
