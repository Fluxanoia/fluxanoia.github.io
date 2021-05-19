import React from "react";
import Client from "spotify-api.js";

export type FluxifyOpProps = {
    token : string,
    client : Client,

    throwError : (error : Error) => void,
    
    disable : () => void,
    enable : () => void,
    finish : () => void,
}
export default class FluxifyOp {
    private key : string;
    private name : string;
    private component : React.FunctionComponent<FluxifyOpProps>;

    public constructor(
        key : string,
        name : string,
        component : React.FunctionComponent<FluxifyOpProps>
    ) {
        this.key = key;
        this.name = name;
        this.component = component;
    }

    public getKey() {
        return this.key;
    }
    public getName() {
        return this.name;
    }
    public getComponent() {
        return this.component;
    }

}
