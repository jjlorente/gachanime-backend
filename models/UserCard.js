const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserCardSchema = new Schema({
    userid: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    cards: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Card',
        required: true 
    }]
});

module.exports = UserCard = mongoose.model('UserCard', UserCardSchema);
