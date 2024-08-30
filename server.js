const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const cron = require('node-cron');

const UserGamesCollection = require('./models/UserGames'); 

const app = express();
app.use(helmet({
    contentSecurityPolicy: false,
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin'
    }
}));

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

app.use('/api/gachas', Gachas);
app.use('/api/cards', Cards);
app.use('/api/users', Users);
app.use('/api/userCards', UserCards);
app.use('/api/userGames', UserGames);
app.use('/api/userQuests', UserQuests);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' }).end();
});

mongoose.connect('mongodb://127.0.0.1:27017/gachanime', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión a MongoDB establecida con éxito');
        server.listen(PORT, () => {
            console.log(`Servidor en ejecución en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error.message);
    });

cron.schedule('00 00 * * *', async () => {
    try {
        await UserGamesCollection.deleteMany({});
        console.log('All documents deleted from UserGames collection');
    } catch (err) {
        console.error('Error deleting documents:', err);
    }
    });


// io.on('connection', (socket) => {
//     console.log('Nuevo cliente conectado');

//     socket.on('disconnect', () => {
//         console.log('Cliente desconectado');
//     });

//     // Aquí puedes manejar otros eventos de socket.io
// });
