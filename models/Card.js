const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    anime_name: { type: String, required: true },
    base64_image: { type: String, required: true },
    rarity: { type: String, required: true },
    description: { type: String, required: true },
    power: { type: Number, required: true }
});

module.exports = Card = mongoose.model('Card', CardSchema);