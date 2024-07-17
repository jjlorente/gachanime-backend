const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GachaSchema = new Schema({
    userid: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    gachas: { type: Number, required: true },
    throws: { type: Number, required: true }
});

module.exports = Gacha = mongoose.model('Gacha', GachaSchema);