const Lobby = require("./Lobby.js");
const Player = require("./Player.js");

class LobbyManager{

  constructor(io){
      let interval;

      let lobbies = {}
      
      io.on("connection", (socket) => {
        console.log("New client connected");
        // console.log(socket);
        if (interval) {
          clearInterval(interval);
        }
        socket.on("disconnect", () => {
          console.log("Client disconnected");
          clearInterval(interval);
        });
      
        socket.on("LobbyRequest", (data) => {
          let lobbyKey   = data["lobbyKey"]
          let playerName = data["playerName"]
          if(lobbies.hasOwnProperty(lobbyKey)){
            if(lobbies[lobbyKey].getIsFull()){
              console.log('Lobby is full', lobbyKey)
              socket.emit('ToastMessage',{
                'message': 'Lobby is full',
                'intent': 'warning'
              })
            } else if (lobbies[lobbyKey].players.hasOwnProperty(playerName)) {
              console.log('Duplicate name in lobby', lobbyKey)
              socket.emit('ToastMessage',{
                'message': 'Name already used in the lobby',
                'intent': 'warning'
              })
            } else {
              console.log('Adding player to lobby', lobbyKey)
              lobbies[lobbyKey].addPlayer(new Player(playerName,socket.id,lobbyKey))
              socket.emit('ToastMessage',{
                'message': 'Joined '+lobbyKey+' as '+playerName,
                'intent': 'success'
              })
            }
          } else {
            console.log('Creating new lobby', lobbyKey)
            lobbies[lobbyKey] = new Lobby(io, lobbyKey, playerName, socket.id)
            lobbies[lobbyKey].addPlayer(new Player(playerName,socket.id,lobbyKey))
            socket.emit('ToastMessage',{
              'message': 'Created '+lobbyKey+' as '+playerName,
              'intent': 'success'
            })
          }
        })
      });

  }
}

module.exports = LobbyManager;



























