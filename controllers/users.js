const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require("../models/User");

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err.message);
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
        res.status(500).send(err.message);
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


const addUser = async (req, res) => {
    const { username, password, email  } = req.body;
    try {
        const user = await User.findOne({ username });
        const existingUserByEmail = await User.findOne({ email });

        if (user) {
            return res.status(404).json({ error: 'Nombre de usuario en uso' });
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

module.exports = { findAllUsers, findByUsernameAndPassword, addUser, findByGoogleAccount, findById };

// const updateUser = (req, res) => {
//     const userId = req.params.id;
  
//     User.findByIdAndUpdate(
//       userId,
//       {
//         name: req.body.name,
//         age: req.body.age,
//         gender: req.body.gender,
//         sexuality: req.body.sexuality,
//         ageRange: req.body.ageRange
//       },
//       { new: true }
//     )
//       .then(updatedUser => {
//         if (!updatedUser) {
//           return res.status(404).json({ error: 'Usuario no encontrado' });
//         }
//         res.status(200).json(updatedUser);
//       })
//       .catch(error => {
//         console.error('Error al actualizar el usuario:', error);
//         res.status(500).json({ error: 'Error interno del servidor' });
//       });
// };