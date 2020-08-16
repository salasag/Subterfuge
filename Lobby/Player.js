class Player {

    constructor(playerName, socketId, lobbyKey){
        this.playerName = playerName
        this.socketId = socketId
        this.lobbyKey = lobbyKey
        this.role = ""
        this.team = ""
    }

}

module.exports = Player;