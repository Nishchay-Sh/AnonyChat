// src/utils/socket.js
module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        // Example of handling a message event
        socket.on('chat message', (msg) => {
            console.log('Message received:', msg);
            io.emit('chat message', msg); // Broadcast message to all clients
        });
    });
};
