const mongoose = require("mongoose");
const Card = require("../models/Card");

const findAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { findAllCards };