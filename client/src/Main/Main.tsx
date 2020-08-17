import React from "react";
import { LobbySelection } from "./Lobby/LobbySelection"
import socketIOClient from "socket.io-client";
import Lobby from "./Lobby/Lobby";
import { AppToaster } from "./../Utilities/Toaster";
import { Intent } from "@blueprintjs/core";
// const ENDPOINT = "http://subterfuge-online.herokuapp.com:5000/";
const port = process.env.PORT || 5000;
const ENDPOINT = "localhost:"+port+"/";

interface IMainProps { // Args
}

interface IMainState {
    socket: any,
    gameState: any
}

export class Main extends React.PureComponent<IMainProps, IMainState>{

    constructor(props: any) {
        super(props);
        this.state = {
            socket: socketIOClient(ENDPOINT),
            gameState: {
                'phase': "LobbySelection"
            },
        };
        this.state.socket.on("ToastMessage", (data: any) => {
            console.log("ToastMessage")
            console.log(data)
            let msg = data["message"]
            let intent = data["intent"]
            AppToaster.show({
                message: msg,
                intent: intent
            })
        });
        this.state.socket.on("StateUpdate", (data: any) => {
            console.log("StateUpdate")
            console.log(data)
            this.setState({
                gameState: data
            })
        });
    }

    public render() {
        return (
          <div style={{}}>
            {this.state.gameState.phase === "LobbySelection" && <LobbySelection socket={this.state.socket}/>} 
            {this.state.gameState.phase === "Lobby" && <Lobby socket={this.state.socket} gameState={this.state.gameState}/>}
          </div>
        );
    }

}

export default Main;




