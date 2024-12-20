const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require("../models/User");
const UserQuests = require("../models/UserQuest");
const UserCard = require("../models/UserCard");
const Card = require("../models/Card");

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send('Error findAllUsers user');
    }
};

const findById = async (req, res) => {
    const { id } = req.query; 
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send('Error findById user');
    }
};

const findByUsernameAndPassword = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        } else if(!user.password) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Credenciales inválidas' });
        }

        if (user) {
            user.googleAccount = req.body.googleAccount;
            await user.save();
            res.status(200).json(user);
        }

    } catch (error) {
        console.error('Error al recuperar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const findByGoogleAccount = async (req, res) => {
    const { username, email, googleAccount } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                username,
                email,
                googleAccount
            });

            const savedUser = await user.save();
            res.status(201).json(savedUser);
        } else {
            user.googleAccount = googleAccount;
            await user.save();
            res.status(200).json(user);
        }
    } catch (error) {
        console.error('Error al recuperar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateReset = async (req, res) => {
    const { userId } = req.body;
    const user = await User.findOne({ _id: userId });

    try {
        if (!user) {
            return res.status(404).json({ error: 'user no encontrado' });
        }

        if(user) {
            const now = new Date();
            const options = { timeZone: 'Europe/Madrid', year: 'numeric', month: '2-digit', day: '2-digit' };
            const formatter = new Intl.DateTimeFormat('en-GB', options);
            const [day, month, year] = formatter.format(now).split('/');
            user.resetGameDay = `${year},${month},${day}`;  
        }

        await user.save();
        res.status(200).json(user.resetGameDay);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateLevel = async (req, res) => {
    const { userid, exp } = req.body;
    const user = await User.findOne({ _id: userid });
    const userQuest = await UserQuests.findOne({ userid: userid });

    try {
        if (!user) {
            return res.status(404).json({ error: 'user no encontrado' });
        }

        if(exp) {
            let experience = user.profileExp + exp;
            if(experience > user.profileExpNextLevel) {
                user.profileLevel = user.profileLevel + 1;
                experience = experience % user.profileExpNextLevel;
                user.profileExp = experience;
                user.profileExpNextLevel = user.profileExpNextLevel + 10;
            } else if (experience === user.profileExpNextLevel) {
                user.profileLevel = user.profileLevel + 1;
                user.profileExp = 0;
                user.profileExpNextLevel = user.profileExpNextLevel + 10;
            } else {
                user.profileExp = experience;
            }
        }

        if(user.profileLevel >= 5 && userQuest.statusLevel5 < 1) {
            userQuest.statusLevel5 = 1
            await userQuest.save();
        }

        if(user.profileLevel >= 20 && userQuest.statusLevel20 < 1) {
            userQuest.statusLevel20 = 1
            await userQuest.save();
        }

        await user.save();
        res.status(200).json("user updated successfully");
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const getImageSizeInBytes = (base64String) => {
    let padding = 0;
    if (base64String.endsWith('==')) padding = 2;
    else if (base64String.endsWith('=')) padding = 1;
    
    const base64Length = base64String.length;
    const sizeInBytes = (base64Length * 3) / 4 - padding;

    return sizeInBytes;
};

const updateUserLan = async (req, res) => {
    const { userid, lan } = req.body;
    const user = await User.findOne({ _id: userid });

    try {
        if (!user) {
            return res.status(404).json({ error: 'user no encontrado' });
        }

        if(lan) {
            user.codeLan = lan;
        }

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateUser = async (req, res) => {
    const { userid, picture, username, sound } = req.body;
    const user = await User.findOne({ _id: userid });

    try {
        if (!user) {
            return res.status(404).json({ error: 'user no encontrado' });
        }

        if(picture) {
            const maxFileSize = 10 * 1024 * 1024;
            const sizeInBytes = getImageSizeInBytes(picture);

            if (sizeInBytes > maxFileSize) {
                return res.status(400).json({ error: 'La imagen supera los 10 MB permitidos.' });
            }

            user.profilePicture = picture;
        }

        if(username !== "") {
            const usernameExists = await User.findOne({ username });
            if(usernameExists) {
                return res.status(400).json({ error: 'Username already taken' });
            }
            user.username = username;
        }

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const unlockMode = async (req, res) => {
    const { userid, mode } = req.body;
    const user = await User.findOne({ _id: userid });

    try {
        if (!user) {
            return res.status(404).json({ error: 'user no encontrado' });
        }

        if(mode) {
            user.unlockModes[mode] = true;
        }

        await user.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const addUser = async (req, res) => {
    const { username, password, email  } = req.body;
    try {
        const user = await User.findOne({ username });
        const existingUserByEmail = await User.findOne({ email });

        if (user) {
            return res.status(404).json({ error: 'Nombre de usuario en uso' });
        }

        if (!password) {
            return res.status(404).json({ error: 'Password necesaria' });
        }

        if (!email) {
            return res.status(404).json({ error: 'Email necesario' });
        }

        if (existingUserByEmail) {
            return res.status(404).json({ error: 'Correo electrónico en uso' });
        }

        // Encriptar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            googleAccount: req.body.googleAccount
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const updatePower = async (req, res) => {
    const { userid, power } = req.body;
    const user = await User.findOne({ _id: userid });
    try {
        if (!user) {
            return res.status(404).json({ error: 'user no encontrado' });
        }

        if(power.totalPower) {
            user.totalPower = power.totalPower;
        }

        await user.save();
        res.status(200).json("totalPower user updated successfully");
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};


const getNumberCardsUser = async (req, res) => {
    const { userid } = req.body;

    try {
        const user = await User.findOne({ _id: userid });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }
        const objectUserId = new mongoose.Types.ObjectId(userid);

        const userCard = await UserCard.findOne({ userid: userid });
        if (!userCard) {
            return res.status(404).json({ error: 'No user cards found for this user' });
        }

        const userCards = await UserCard.aggregate([
            { $match: { userid: objectUserId } },
            { $unwind: '$cards' },
            {
                $group: {
                    _id: '$userid',
                    uniqueCards: { $addToSet: '$cards' }
                }
            }
        ]);

        if (userCards.length === 0) {
            return res.status(200).json({ uniqueCards: 0});
        }

        res.status(200).json({ uniqueCards: userCards[0].uniqueCards.length });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};




const getRanking = async (req, res) => {
    try {
        const [topTotalPowerUsers, topLevelUsers, totalCards, topCollection] = await Promise.all([
            User.find().sort({ totalPower: -1 }).limit(100),
            User.find().sort({ profileLevel: -1 }).limit(100),
            Card.find().count(),
            UserCard.aggregate([
                { $unwind: '$cards' },
                {
                    $group: {
                        _id: '$userid',
                        uniqueCards: { $addToSet: '$cards' }
                    }
                },
                {
                    $addFields: {
                        totalUniqueCards: { $size: '$uniqueCards' }
                    }
                },
                { $sort: { totalUniqueCards: -1 } },
                { $limit: 100 },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                },
                { $unwind: '$userDetails' },
                {
                    $project: {
                        _id: 0,
                        totalUniqueCards: 1,
                        'userDetails.username': 1,
                        'userDetails.profileLevel': 1,
                        'userDetails.totalPower': 1,
                        'userDetails.profilePicture': 1,
                    }
                }
            ])
        ]);
        
        res.status(200).json({
            topTotalPowerUsers,
            topLevelUsers,
            topCollection,
            totalCards
        });

    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = { getNumberCardsUser, updateReset, getRanking, updatePower, findAllUsers, findByUsernameAndPassword, addUser, findByGoogleAccount, findById, updateLevel, updateUser, updateUserLan, unlockMode };