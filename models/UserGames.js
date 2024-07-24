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
    triesname: {
        type: Number,
        required: true
    },
    triesimage: {
        type: Number,
        required: true
    },
    resets: {
        type: Number,
        required: true
    }
});

module.exports = UserGames = mongoose.model('UserGames', UserGamesSchema);
