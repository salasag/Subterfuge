import React from "react";
import { Button, InputGroup } from "@blueprintjs/core"
interface ILobbySelectionProps { // Args
    socket: any
}

interface ILobbySelectionState {
    lobbyKey: string
    playerName: string
}

export class LobbySelection extends React.PureComponent<ILobbySelectionProps, ILobbySelectionState>{

    constructor(props: any) {
        super(props);
        this.state = {
            lobbyKey: "",
            playerName: "",
        };
        this.updateLobbyKey   = this.updateLobbyKey.bind(this);
        this.updatePlayerName = this.updatePlayerName.bind(this);
        this.sendLobbyRequest = this.sendLobbyRequest.bind(this);
    }

    private updateLobbyKey = (event: any) => {
        let val = event.target.value;
        this.setState({
            lobbyKey: val,
        })
    }

    private updatePlayerName = (event: any) => {
        let val = event.target.value;
        this.setState({
            playerName: val,
        })
    }

    private sendLobbyRequest = () => {
        // From Prop?
        console.log(this.state.lobbyKey)
        console.log(this.state.playerName)
        console.log(this.props.socket)
        this.props.socket.emit("LobbyRequest",{
            "lobbyKey":   this.state.lobbyKey,
            "playerName": this.state.playerName,
        })
    }

    public render() {
        return (
          <div style={{}}>
                <div>
                    {<InputGroup large={true} onChange={this.updateLobbyKey}/>}
                    {<InputGroup large={true} onChange={this.updatePlayerName}/>}
                </div>
            {<Button style={{float: "left"}} text="Request" onClick={this.sendLobbyRequest}/>} 
          </div>
        );
    }

}
export default LobbySelection;
