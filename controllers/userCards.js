const mongoose = require("mongoose");
const UserCard = require("../models/UserCard");

const findById = async (req, res) => {
    const { id } = req.query; 
    
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        console.log(id)
        const userCards = await UserCard.findOne({ userid: id });
        console.log(userCards)
        if (!userCards) {
            return res.status(404).json({ error: 'Cards no encontradas' });
        }
        res.status(200).json(userCards);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { findById };