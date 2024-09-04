const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    name: [{ 
        type: String,
        required: true 
    }],
    expirationDate: {
        type: Date,
        required: false
    },
    finished: {
        type: Boolean,
        default: false
    },
    votes: [{ 
        type: Number,
        required: true 
    }],
    usersId: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    }]
});

module.exports = Survey = mongoose.model('Survey', SurveySchema);