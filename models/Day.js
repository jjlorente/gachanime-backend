const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    lastReset: {
        type: String,
        required: true,
        default: () => {
            const now = new Date();
            return `${now.getFullYear()},${now.getMonth() + 1},${now.getDate()}`;
        }
    },
});

const Day = mongoose.model('Day', daySchema);

module.exports = Day;