const mongoose = require("mongoose");
const Survey = require("../models/Survey");

const find = async (req, res) => {
    try {
        const survey = await Survey.findOne({});
        if (!survey) {
            return res.status(404).json({ error: 'survey no encontrado' });
        }
        res.status(200).json(survey);
    } catch (err) {
        res.status(500).send("Error: Find survey");
    }
};

const addVote = async (req, res) => {
    const { userId, voteUser } = req.body;

    try {
        let survey = await Survey.findOne({});

        if (!survey) {
            return res.status(404).json({ error: 'Survey no encontrado' });
        }

        if (survey.usersId.includes(userId)) {
            return res.status(400).json({ error: 'El usuario ya ha votado' });
        }

        survey.usersId.push(userId);
        survey.votes[voteUser] += 1;

        await survey.save();
        return res.status(200).json(survey);
    } catch (err) {
        return res.status(500).json({ error: 'Error al añadir voto' });
    }
};

const finishedPoll = async (req, res) => {

    try {
        let survey = await Survey.findOne({});

        if (!survey) {
            return res.status(404).json({ error: 'Survey no encontrado' });
        }

        survey.finished = true

        await survey.save();
        return res.status(200).json(survey);
    } catch (err) {
        console.error('Error al añadir voto:', err.message);
        return res.status(500).json({ error: 'Error al añadir voto' });
    }
};

module.exports = { find, addVote, finishedPoll };