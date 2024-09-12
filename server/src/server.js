// server.js
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const { join } = require('path');
const { config } = require('dotenv');
const socketIo = require('socket.io');
const cors = require('cors');

// Load environment variables
config();

// Import MongoDB configuration

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(cors());

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
})); // Security headers
app.use(morgan('combined')); // HTTP request logger

// Static files
app.use(express.static(join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'));
});

// Socket.io setup
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});

const io = socketIo(server);
require('./utils/socket')(io); // Import socket.io handlers

// Import routes
const routes = require('./routes/index');
app.use('/api/v1', routes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    ssl: true,
})
    .then(() => console.log('Connected to MongoDB !!!'))
    .catch(err => console.error('MongoDB connection error:', err));
