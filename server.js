const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const cron = require('node-cron');
require('dotenv').config();

const UserGamesCollection = require('./models/UserGames'); 
const Day = require('./models/Day'); 

const app = express();
app.use(helmet({
    contentSecurityPolicy: false,
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin'
    }
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

const Users = require('./api/users');
const Gachas = require('./api/gachas');
const Cards = require('./api/cards');
const UserCards = require('./api/userCards');
const UserGames = require('./api/userGames');
const UserQuests = require('./api/userQuests');
const Days = require('./api/days');
const Surveys = require('./api/surveys');
const Markets = require('./api/markets');

app.use('/api/gachas', Gachas);
app.use('/api/cards', Cards);
app.use('/api/users', Users);
app.use('/api/day', Days);
app.use('/api/userCards', UserCards);
app.use('/api/userGames', UserGames);
app.use('/api/userQuests', UserQuests);
app.use('/api/surveys', Surveys);
app.use('/api/markets', Markets);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' }).end();
});

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión a MongoDB establecida con éxito');
        server.listen(PORT, () => {
            console.log(`Servidor en ejecución en http://localhost:${PORT}`);
        });
        createOrUpdateDay();
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error.message);
    });

    const createOrUpdateDay = async () => {
        try {
            let dayDoc = await Day.findOne({});
    
            if (!dayDoc) {
                dayDoc = new Day();
                await dayDoc.save();
                console.log('Documento Day creado:', dayDoc);
            } else {
                console.log('Documento Day ya existe:', dayDoc);
            }
    
            return dayDoc;
        } catch (err) {
            console.error('Error al crear o actualizar el documento Day:', err);
        }
    };
 
    const resetDaily = async () => {
        try {
            const now = new Date();
            now = `${now.getFullYear()},${now.getMonth() + 1},${now.getDate()}`;
            await Day.updateMany({}, { $set: { lastReset: now } });
        } catch (err) {
            console.error('Error actualizando el campo lastReset:', err);
        }
    };

// io.on('connection', (socket) => {
//     console.log('Nuevo cliente conectado');

//     socket.on('disconnect', () => {
//         console.log('Cliente desconectado');
//     });

//     // Aquí puedes manejar otros eventos de socket.io
// });
