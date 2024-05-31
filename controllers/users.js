const mongoose = require("mongoose");
const User = require("../models/User");

const findAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = { findAllUsers };

// const findById = (req, res) => {
//     User.findById(req.params.id)
//         .then(user => {
//             if (user) {
//                 res.status(200).json(user);
//             } else {
//                 res.status(404).json({ error: 'Usuario no encontrado' });
//             }
//         })
//         .catch(error => {
//             console.error('Error al recuperar el usuario:', error);
//             res.status(500).json({ error: 'Error interno del servidor' });
//         });
// };

// const addUser = (req, res) => {
//     let user = new User({
//         name: req.body.name,
//         age: req.body.age,
//         gender: req.body.gender,
//         sexuality: req.body.sexuality,
//         ageRange: req.body.ageRange
//     });

//     user.save()
//     .then(savedUser => {
//         res.status(201).json(savedUser);
//     })
//     .catch(error => {
//         console.error('Error al guardar el usuario:', error);
//         res.status(500).json({ error: 'Error interno del servidor' });
//     });

// }

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