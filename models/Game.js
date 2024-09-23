const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    anime_name: { 
        type: String, 
        required: true 
    },

    names_game: [{ 
        type: String, 
        required: false 
    }],
    names_game_medium: [{ 
        type: String, 
        required: false 
    }],
    names_game_hard: [{ 
        type: String, 
        required: false 
    }],

    image_game: [{ 
        type: String, 
        required: false 
    }],
    image_game_medium: [{ 
        type: String, 
        required: false 
    }],
    image_game_hard: [{ 
        type: String, 
        required: false 
    }],


    opening: [{ 
        type: String, 
        required: false 
    }],
    opening_medium: [{ 
        type: String, 
        required: false 
    }],
    opening_hard: [{ 
        type: String, 
        required: false 
    }],
    opening_solutions: {
        type: [[String]],  
        required: false
    },
    
    eye_game: [{ 
        type: String, 
        required: false 
    }],
    eye_solution: [{ 
        type: String, 
        required: false 
    }],

    pixel_game: [{ 
        type: String, 
        required: false 
    }],

    
    silueta_game: [{ 
        type: String, 
        required: false 
    }],
    silueta_solution: [{ 
        type: String, 
        required: false 
    }],
    silueta_game_medium: [{ 
        type: String, 
        required: false 
    }],
    silueta_solution_medium: [{ 
        type: String, 
        required: false 
    }],
    silueta_game_hard: [{ 
        type: String, 
        required: false 
    }],
    silueta_solution_hard: [{ 
        type: String, 
        required: false 
    }]
});

module.exports = Game = mongoose.model('Game', GameSchema);
