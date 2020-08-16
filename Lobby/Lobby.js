class Lobby {

    constructor(io,lobbyKey,hostName,hostId){
        this.io = io
        this.lobbyKey = lobbyKey
        this.hostName = hostName
        this.hostId = hostId
        this.MAXIMUM_PLAYERS = 10
        this.MINIMUM_PLAYERS = 5
        this.players = {}
        this.isFull = false
        this.gameState = {}
        this.gameState['phase'] = 'Lobby'
        this.gameState['lobbyKey'] = lobbyKey
        this.gameState['hostName'] = hostName
    }

    addPlayer(player) {
        if (this.isFull) {
            return
        }
        this.players[player.playerName] = player
        this.isFull = Object.keys(this.players).length >= this.MAXIMUM_PLAYERS
        this.updateLobby()
    }

    removePlayer(playerName) {
        let player = this.players[playerName]
        io.to(`${player}`).emit('StateUpdate',{'phase': 'LobbySelection'})
        if (playerName == this.hostName) {
            this.selectNewHost()
        }
        delete this.players[playerName]
        this.isFull = Object.keys(this.players).length >= this.MAXIMUM_PLAYERS
        this.updateLobby()
    }

    updateLobby() {
        this.gameState['players'] = this.players

        console.log(this.players)
        for (const [playerName, player] of Object.entries(this.players)) {
            console.log('Sending to',playerName)
            console.log(this.gameState)
            this.io.to(`${player.socketId}`).emit('StateUpdate',this.gameState)
        }
    }

    selectNewHost() {
        for (const [playerName, player] of Object.entries(this.players)) {
            if (playerName != this.hostName) { 
                this.hostId = player.socketId
                this.hostName = playerName
            }
        }
    }

    getIsFull() {
        return this.isFull
    }

}

module.exports = Lobby;


