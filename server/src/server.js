// server.js
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const { join } = require('path');
const { config } = require('dotenv');
const socketIo = require('socket.io');
const cors = require('cors');

config();


const app = express();

app.use(express.json()); 
app.use(cors());

app.use(express.urlencoded({ extended: true })); 
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
}));

app.use(morgan('combined')); 
app.use(express.static(join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'));
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});

const io = socketIo(server);
require('./utils/socket')(io); 

const routes = require('./routes/index');
app.use('/api/v1', routes);

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    ssl: true,
})
    .then(() => console.log('Connected to MongoDB !!!'))
    .catch(err => console.error('MongoDB connection error:', err));

