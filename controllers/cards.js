const mongoose = require("mongoose");
const Card = require("../models/Card");
const User = require("../models/User");
const { ObjectId } = require('mongoose').Types;
const Gacha = require("../models/Gacha");
const UserCard = require("../models/UserCard");

const findAllCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).send("err findAllCards");
    }
};

const findCardSummoned = async (req, res) => {
    try {
        const { id, raritys, throws, gachas, type} = req.body;
        const userId = new ObjectId(id);

        let user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const gachaUser = await Gacha.findOne({ userid: userId });

        if (!gachaUser) {
            return res.status(404).json({ message: 'Gacha user not found' });
        }
        
        if(type === 0) {
            if(gachaUser.gachas - 10 < 0 ) {
                return res.status(404).json({ message: 'Gachas insuficientes' });
            }
            if (gachaUser.throws + 1 === 80) {
                gachaUser.throws = 0;
            } else {
                gachaUser.throws = gachaUser.throws + 1;
            }

            gachaUser.gachas = gachaUser.gachas - 10;
        } else if(type === 1) {
            if(gachaUser.gachas - 100 < 0 ) {
                return res.status(404).json({ message: 'Gachas insuficientes' });
            }
            if (gachaUser.throws + 10 >= 80) {
                gachaUser.throws = (gachaUser.throws+10)%80;
            } else {
                gachaUser.throws = gachaUser.throws + 10;
            }

            gachaUser.gachas = gachaUser.gachas - 100;
        }
        await gachaUser.save();

        let cards = [];
        for (const rarity of raritys) {
            const cardsWithRarity = await Card.find({ rarity: rarity });
            if (cardsWithRarity.length > 0) {
                const randomIndex = Math.floor(Math.random() * cardsWithRarity.length);
                const randomCard = cardsWithRarity[randomIndex];
                cards.push(randomCard);
            }
        }

        const cardsUser = await UserCard.findOne({ userid: userId });

        if (!cardsUser) {
            return res.status(404).json({ message: 'CardUser inexistente' });
        }

        for (const card of cards) {
            cardsUser.cards = cardsUser.cards.concat(card.id);
        }

        await cardsUser.save();
        res.status(200).json(cards);
    } catch (err) {
        res.status(500).send("err findCardSummoned");
    }
};

module.exports = { findAllCards,findCardSummoned };