const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {profilePicture} = require("./profilePicture.json");

const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: false },
    email: { type: String, required: true },
    googleAccount: { type: Boolean, required: true },
    totalPower: { 
        type: Number, 
        default: 0
    },
    profileLevel: { 
        type: Number, 
        default: 1
    },
    profileExp: { 
        type: Number, 
        default: 0
    },
    profileExpNextLevel: { 
        type: Number, 
        default: 100
    },
    codeLan: { 
        type: String, 
        default: "en"
    },
    profilePicture: { 
        type: String, 
        default: profilePicture
    },
    unlockModes : {
        type: [Boolean],
        default: [true, false, false]
    },
    dayUser : {
        type: String,
        required: true,
        default: () => {
            const now = new Date();
            const options = { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' };
            const formatter = new Intl.DateTimeFormat('en-GB', options);
            const [day, month, year] = formatter.format(now).split('/');
            return `${year},${month},${day}`;
        }
    }
});

module.exports = User = mongoose.model('User', UserSchema);