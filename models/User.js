const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: false },
    email: { type: String, required: true },
    googleAccount: { type: Boolean, required: true }
});

module.exports = Card = mongoose.model('User', UserSchema);