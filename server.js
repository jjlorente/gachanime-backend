const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

const Users = require('./api/users');
app.use('/api/users', Users);

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




io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // Aquí puedes manejar otros eventos de socket.io
});
