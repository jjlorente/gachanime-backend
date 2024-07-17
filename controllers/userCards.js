const mongoose = require("mongoose");
const UserCard = require("../models/UserCard");

const findById = async (req, res) => {
    const { id } = req.query; 
    
    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        const userCards = await UserCard.findOne({ userid: id });
        if (!userCards) {
            return res.status(404).json({ error: 'Cards no encontradas' });
        }
        res.status(200).json(userCards);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const addUserCard = async (req, res) => {
    const { userId  } = req.body;
    try {
        let newUserCard = new UserCard({
            userid: userId,
            cards: []
        });

        const savedUserCard = await newUserCard.save();
        res.status(201).json(savedUserCard);

    } catch (error) {
        console.error('Error al guardar UserCard del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const addCardsToUser = async (userId, newCards) => {
  try {
    let userCard = await UserCard.findOne({ userid: userId });

    if (!userCard) {
      userCard = new UserCard({ userid: userId, cards: newCards });
    } else {
      await UserCard.updateOne(
        { userid: userId },
        { $addToSet: { cards: { $each: newCards } } }
      );
    }

    return userCard;
  } catch (err) {
    console.error(err.message);
    throw new Error('Error adding cards to user');
  }
};


module.exports = { findById, addCardsToUser, addUserCard };