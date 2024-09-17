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
    openingid: { 
        type: Schema.Types.ObjectId, 
        ref: 'Game',
        required: true 
    },
    eyeid: { 
        type: Schema.Types.ObjectId, 
        ref: 'Game',
        required: true 
    },
    pixelid: { 
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
    triesopening: {
        type: Number,
        required: true
    },
    triessilueta: {
        type: Number,
        required: true
    },
    trieseye: {
        type: Number,
        required: true
    },
    triespixel: {
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
    finishedOpening: {
        type: Boolean,
        required: true
    },
    finishedEye: {
        type: Boolean,
        required: true
    },
    finishedPixel: {
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
    statusRewardName: {
        type: Number,
        required: true
    },
    statusRewardOpening: {
        type: Number,
        required: true
    },
    statusRewardEye: {
        type: Number,
        required: true
    }, 
    statusRewardPixel: {
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
    },
    nameSelected: {
        type: Number,
        required: false
    },
    openingSelected: {
        type: Number,
        required: false
    },
    eyeSelected: {
        type: Number,
        required: false
    },
    pixelSelected: {
        type: Number,
        required: false
    }
});

module.exports = UserGames = mongoose.model('UserGames', UserGamesSchema);
