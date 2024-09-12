const mongoose = require("mongoose");
const Market = require("../models/Market");
const UserCard = require("../models/UserCard");
const User = require("../models/User");
const Card = require("../models/Card");
const Gacha = require("../models/Gacha");

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

const getDataMarket = async (req, res) => {
    try {
        const cardsMarket = await Market.find();

        let marketData = [];

        if (cardsMarket && cardsMarket.length > 0) {
            for (const marketItem of cardsMarket) {
                const user = await User.findById(marketItem.userid);
                
                const card = await Card.findById(marketItem.cardid);
                
                const price = marketItem.price;

                if (user && card && price) {
                    marketData.push({
                        user: user,
                        card: card,
                        price: price
                    });
                }
            }

            if(marketData.length > 0) {
                marketData.reverse();
                res.status(201).json(marketData);
            }
        } else {
            return res.status(404).json({ error: 'No cards found in the market' });
        }

    } catch (error) {
        console.error('Error retrieving data from Market:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const buyCard = async (req, res) => {
    const { userId, cardId, price, userIdMarket } = req.body;

    try {
        const userCards = await UserCard.findOne({ userid: userId }); 
        if(userCards) {
            userCards.cards.push(cardId)
            await userCards.save(); 
        } else {
            userCards = new UserCard({ userid: userId, cards: cardId });
        }

        const userGachas = await Gacha.findOne({ userid: userId });
        const userGachasMarket = await Gacha.findOne({ userid: userIdMarket });
        if(userGachas && userGachasMarket) {
            userGachas.gachas = userGachas.gachas - price;
            await userGachas.save(); 

            userGachasMarket.gachas = userGachasMarket.gachas + price;
            await userGachasMarket.save();
        }

        const result = await Market.deleteOne({ userid: userIdMarket, cardid: cardId, price: price});
        if(result) {
            console.log('Card eliminada exitosamente');
        }

        res.status(201).json(userGachas);
    } catch (error) {
        console.error('Error al guardar la carta en el Market:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }

};

const cancelCard = async (req, res) => {
    const { userId, cardId, price } = req.body;
    try {
        const userCards = await UserCard.findOne({ userid: userId }); 
        if(userCards) {
            userCards.cards.push(cardId)
            await userCards.save(); 
        } else {
            userCards = new UserCard({ userid: userId, cards: cardId });
        }

        const result = await Market.deleteOne({ userid: userId, cardid: cardId, price: price });
        if(result) {
            console.log('Card eliminada exitosamente');
        }else {
            res.status(500).json('Error al eliminar card');
        }

        res.status(201).json(result);
    } catch (error) {
        console.error('Error al guardar la carta en el Market:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = { addCard, getDataMarket, buyCard, cancelCard };