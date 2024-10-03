const mongoose = require("mongoose");
const Day = require("../models/Day");
const UserQuests = require("../models/UserQuest");
const User = require("../models/User");

const findById = async (req, res) => {
    const { userId } = req.query; 

    try {
        const user = await User.findById(userId);
        if (!dayDoc) {
            return res.status(404).json({ error: 'day no encontrados' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const create = async (req, res) => {

    try {
        dayDoc = new Day();
        await dayDoc.save();
        res.status(201).json(dayDoc.lastReset);

    } catch (error) {
        console.error('Error al guardar dia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const update = async (req, res) => {
    const { userId } = req.query; 
    try {
        const user = await User.findById(userId);
        const now = new Date();
        const options = { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const [day, month, year] = formatter.format(now).split('/');

        user.dayUser = `${year},${month},${day}`;
        await user.save();
        res.status(201).json(user.dayUser);

    } catch (error) {
        console.error('Error al update dia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updateWeek = async (req, res) => {
    try {
        await UserQuests.updateMany({}, { $set: { statusWeek: 0 } });
        await UserQuests.updateMany({}, { $set: { statusSummonsWeek: 0 } });
        await UserQuests.updateMany({}, { $set: { statusLogInWeek: 1 } });

        let dayDoc = await Day.findOne({});
        const now = new Date();
        now.setDate(now.getDate() + 7);
        const options = { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const [day, month, year] = formatter.format(now).split('/');

        dayDoc.resetWeek = `${year},${month},${day}`;
        await dayDoc.save();
        res.status(201).json(dayDoc.resetWeek);

    } catch (error) {
        console.error('Error al update dia:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = { findById, create, update, updateWeek };