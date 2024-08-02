const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173", 
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: true
    }
  });

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:5173',
}));

// Endpoint untuk membuat room
app.post('/create-room', async (req, res) => {
    const { email } = req.body;
    try {
        const kodeRoom = uuidv4();
        const [result] = await db.query('INSERT INTO room (kode_room) VALUES (?)', [kodeRoom]);
        await db.query('INSERT INTO users (email, room_id) VALUES (?, ?)', [email, result.insertId]);
        res.json({ id: result.insertId, kodeRoom });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// app.post('/login', checkEmailMiddleware, (req, res) => {
//     const user = req.user;

//     const token = jwt.sign(
//         { email: user.email },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//     );

//     res.json({ token });
// });

// Endpoint untuk join room dengan kode dan email
app.post('/join-room', async (req, res) => {
    const { kodeRoom, email } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM room WHERE kode_room = ?', [kodeRoom]);
        if (rows.length > 0) {
            const roomId = rows[0].id_room;
            await db.query('INSERT INTO users (email, room_id) VALUES (?, ?)', [email, roomId]);
            res.json({ id: roomId });
        } else {
            res.status(404).send('Room not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Endpoint untuk mendapatkan pengguna dalam room
app.get('/room/:roomId/users', async (req, res) => {
    const { roomId } = req.params;
    try {
        const [rows] = await db.query('SELECT email FROM users WHERE room_id = ?', [roomId]);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', userId);
    });

    socket.on('toggle-camera', (roomId, userId, cameraStatus) => {
        console.log('toggle-camera event received:', roomId, userId, cameraStatus);
        socket.to(roomId).emit('camera-toggled', userId, cameraStatus);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
