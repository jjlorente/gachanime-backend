const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    reward: { type: Number, required: true },
    type: { type: String, required: true }
});

module.exports = Quest = mongoose.model('Quest', QuestSchema);