const express = require("express");
const http = require("http");
const path = require('path');
const socketIo = require("socket.io");

const port = process.env.PORT || 5000;
// const index = require("./routes/index");
const LobbyManager = require("./Lobby/LobbyManager.js");

const app = express();
// app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

MisterMosby = new LobbyManager(io)


if (process.env.NODE_ENV === 'production') {
// Serve any static files
app.use(express.static(path.join(__dirname, 'client/public')));
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});
}

server.listen(port, () => console.log(`Listening on port ${port}`));