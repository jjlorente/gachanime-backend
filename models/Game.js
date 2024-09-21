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
    names_game_medium: [{ 
        type: String, 
        required: true 
    }],
    names_game_hard: [{ 
        type: String, 
        required: true 
    }],

    image_game: [{ 
        type: String, 
        required: true 
    }],
    image_game_medium: [{ 
        type: String, 
        required: true 
    }],
    image_game_hard: [{ 
        type: String, 
        required: true 
    }],


    opening: [{ 
        type: String, 
        required: true 
    }],
    opening_medium: [{ 
        type: String, 
        required: true 
    }],
    opening_hard: [{ 
        type: String, 
        required: true 
    }],

    eye_game: [{ 
        type: String, 
        required: true 
    }],
    eye_solution: [{ 
        type: String, 
        required: true 
    }],

    pixel_game: [{ 
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
    silueta_game_medium: [{ 
        type: String, 
        required: true 
    }],
    silueta_solution_medium: [{ 
        type: String, 
        required: true 
    }],
    silueta_game_hard: [{ 
        type: String, 
        required: true 
    }],
    silueta_solution_hard: [{ 
        type: String, 
        required: true 
    }]
});

module.exports = Game = mongoose.model('Game', GameSchema);
