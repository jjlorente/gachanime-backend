const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    anime_name: { 
        type: String, 
        required: true 
    },
    names_game: [{ 
        type: String, 
        required: true 
    }],
    image_game: [{ 
        type: String, 
        required: true 
    }],
    silueta_game: [{ 
        type: String, 
        required: true 
    }],
    silueta_solution: [{ 
        type: String, 
        required: true 
    }],
    opening: [{ 
        type: String, 
        required: true 
    }]
});

module.exports = Game = mongoose.model('Game', GameSchema);
