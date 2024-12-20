const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserQuestSchema = new Schema({
    userid: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },   
    statusQuestImage: {
        type: Number,
        required: true
    },
    statusQuestSilueta: {
        type: Number,
        required: true
    },
    statusQuestName: {
        type: Number,
        required: true
    },
    statusQuestOpening: {
        type: Number,
        required: true
    },
    statusQuestPixel: {
        type: Number,
        required: true
    },
    statusQuestAllGames: {
        type: Number,
        required: true
    },
    statusWeek: {
        type: Number,
        required: true
    },
    statusSummonsWeek: {
        type: Number,
        required: true
    },
    statusLogInWeek: {
        type: Number,
        required: true
    },
    statusLevel5: {
        type: Number,
        required: true
    },
    statusLevel20: {
        type: Number,
        required: true
    },
    statusPower1: {
        type: Number,
        required: true
    },
    statusPower10: {
        type: Number,
        required: true
    }
});

module.exports = UserQuest = mongoose.model('UserQuest', UserQuestSchema);
