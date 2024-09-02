const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    lastReset: {
        type: String,
        required: true,
        default: () => {
            const now = new Date();
            const options = { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' };
            const formatter = new Intl.DateTimeFormat('en-GB', options);
            const [day, month, year] = formatter.format(now).split('/');
            return `${year},${month},${day}`;
        }
    },
    resetWeek: {
        type: String,
        required: true,
        default: () => {
            const now = new Date();
            now.setDate(now.getDate() + 7);
            const options = { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' };
            const formatter = new Intl.DateTimeFormat('en-GB', options);
            const [day, month, year] = formatter.format(now).split('/');
            return `${year},${month},${day}`;
        }
    }
});


const Day = mongoose.model('Day', daySchema);

module.exports = Day;