const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserGamesSchema = new Schema({
    userid: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    nameid: { 
        type: Schema.Types.ObjectId, 
        ref: 'Game',
        required: true 
    },
    imageid: { 
        type: Schema.Types.ObjectId, 
        ref: 'Game',
        required: true 
    },
    siluetaid: { 
        type: Schema.Types.ObjectId, 
        ref: 'Game',
        required: true 
    },
    triesname: {
        type: Number,
        required: true
    },
    triesimage: {
        type: Number,
        required: true
    },
    triessilueta: {
        type: Number,
        required: true
    },
    resets: {
        type: Number,
        required: true
    },
    finishedImage: {
        type: Boolean,
        required: true
    },
    finishedName: {
        type: Boolean,
        required: true
    },
    finishedSilueta: {
        type: Boolean,
        required: true
    },
    statusRewardImage: {
        type: Number,
        required: true
    },
    statusRewardSilueta: {
        type: Number,
        required: true
    },
    imageSelected: {
        type: Number,
        required: false
    },
    siluetaSelected: {
        type: Number,
        required: false
    }
});

module.exports = UserGames = mongoose.model('UserGames', UserGamesSchema);
