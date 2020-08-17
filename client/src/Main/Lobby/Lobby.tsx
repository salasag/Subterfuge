import React from "react";
import { Button, Card } from "@blueprintjs/core"
interface ILobbyProps { // Args
    socket: any
    gameState: any
}

interface ILobbyState {
}

export class Lobby extends React.PureComponent<ILobbyProps, ILobbyState>{

    constructor(props: any) {
        super(props);
        this.state = {};
    }


    private sendStartGameRequest = () => {
        this.props.socket.emit("StartGame",{})
    }

    private RenderPlayers = () => {
        let players: any = []
        if (this.props.gameState === {}) {
            return <div></div>
        }
        if (!this.props.gameState.hasOwnProperty("players")) {
            return <div></div>
        }
        for (const [playerName, player] of Object.entries(this.props.gameState.players)) {
            console.log(player)
            players.push(
                <Card> 
                    {playerName}
                </Card>
            )
        }

        return (
            <div>
                {players}
            </div>
        )
    }

    public render() {
        return (
          <div style={{}}>
                <Card>
                    <b>
                        {this.props.gameState.lobbyKey}
                    </b>
                </Card>
                <div>
                    {this.RenderPlayers()}
                </div>
            {<Button style={{}} text="Start Game" onClick={this.sendStartGameRequest}/>} 
          </div>
        );
    }

}
export default Lobby;
