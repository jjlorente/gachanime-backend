const mongoose = require("mongoose");
const UserCard = require("../models/UserCard");
const Card = require("../models/Card");
const UserQuests = require("../models/UserQuest");
const { updateLevel } = require("./users");

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
        res.status(500).send("Cartas no encontradas");
    }
};

const calculateTotalPower = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'ID is required' });
  }

  try {
    const [userCards, userQuest] = await Promise.all([
      UserCard.findOne({ userid: userId }),
      UserQuests.findOne({ userid: userId })
    ]);

    if (!userCards) {
      return res.status(404).json({ error: 'Cards not found' });
    }

    const cardsData = await Card.find({ _id: { $in: userCards.cards } });

    const cardPowerMap = new Map(cardsData.map(card => [card._id.toString(), card.power]));

    let totalPower = 0;
    for (const cardId of userCards.cards) {
      const cardPower = cardPowerMap.get(cardId.toString());
      if (cardPower) {
        totalPower += cardPower;
      }
    }

    if (totalPower >= 150000 && userQuest && userQuest.statusPower1 < 1) {
      userQuest.statusPower1 = 1;
      await userQuest.save();
    }

    if (totalPower >= 500000 && userQuest && userQuest.statusPower10 < 1) {
      userQuest.statusPower10 = 1;
      await userQuest.save();
    }

    res.status(200).json({ totalPower });
  } catch (err) {
    res.status(500).send("Error al calcular el poder total.");
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
    throw new Error('Error adding cards to user');
  }
};


module.exports = { findById, addCardsToUser, addUserCard, calculateTotalPower };