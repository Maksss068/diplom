require('dotenv').config();
const express = require('express');
const http = require('http'); 
const cors = require('cors');
const socketIo = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app); 
const io = socketIo(server, {
  cors: { 
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Маршрути
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

// WebSockets
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('offer', (data) => {
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    socket.broadcast.emit('answer', data);
  });

  socket.on('candidate', (data) => {
    socket.broadcast.emit('candidate', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });

  socket.on('error', (err) => {
    console.error(`WebSocket error: ${err.message}`);
  });
});

// Обробка помилок маршрутів
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error' });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

