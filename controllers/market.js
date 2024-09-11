const mongoose = require("mongoose");
const Market = require("../models/Market");
const UserCard = require("../models/UserCard");

const addCard = async (req, res) => {
    const { userId, cardId, price } = req.body;

    try {
        let newCard = new Market({
            userid: userId,
            cardid: cardId,
            price: price
        });

        const savedCard = await newCard.save();

        const userCards = await UserCard.findOne({ userid: userId });

        if (userCards) {
            const cardIndex = userCards.cards.indexOf(cardId);

            if (cardIndex > -1) {
                userCards.cards.splice(cardIndex, 1);
                await userCards.save();
            } else {
                return res.status(404).json({ error: 'Card not found in user\'s collection' });
            }
        } else {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(201).json(savedCard);

    } catch (error) {
        console.error('Error al guardar la carta en el Market:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


module.exports = { addCard };