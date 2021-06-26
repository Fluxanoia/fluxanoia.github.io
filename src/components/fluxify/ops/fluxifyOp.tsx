import React, { useEffect, useState } from "react";
import Client, { Playlist } from "spotify-api.js";
import styled from "styled-components";
import { spacing2 } from "../../../utils/dimensions";
import Button from "../../button";

export type FluxifyOpData = {
    token : string,
    client : Client,
    playlists : Array<Playlist>,
}
export type FluxifyOpProps = {
    data : FluxifyOpData,

    throwGlobalError : (error : Error) => void,
    
    disable : () => void,
    enable : () => void,
    finish : () => void,
};
export default class FluxifyOp {
    private name : string;
    private desc : string;
    private component : React.FunctionComponent<FluxifyOpProps>;

    public constructor(
        name : string,
        desc : string,
        component : React.FunctionComponent<FluxifyOpProps>
    ) {
        this.name = name;
        this.desc = desc;
        this.component = component;
    }

    public getName() {
        return this.name;
    }
    public getDescription() {
        return this.desc;
    }
    public getComponent() {
        return this.component;
    }
};

export const useErrorAggregator = (
    throwError : (e : Error) => void,
    errors : Array<Error | null>
) => {
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        for (const e of errors) {
            if (e) {
                setHasError(true);
                throwError(e);
                return;
            }
        }
        setHasError(false);
    }, [throwError, errors, setHasError]);
    return hasError;
};

const wrapRun = (
    disable : () => void,
    finish : () => void,
    run : () => Promise<boolean>,
) => {
    return () => {
        disable();
        run().then(b => {
            if (b) finish();
        });
    }
};
export const renderOp = (
    components : Array<JSX.Element>,
    displayRun : boolean,
    run : () => Promise<boolean>,
    disable : () => void,
    finish : () => void,
) => {
    const lastIndex = components.length - 1;
    return (
        <>
            {
                components.map((v, i) => (
                    <OpWrapper key={ v.key } removeMargin={ i === lastIndex }>
                        { v }
                    </OpWrapper>
                ))
            }
            { 
                displayRun ? (
                    <RunButton onClick={ wrapRun(disable, finish, run) }>
                        { `Run` }
                    </RunButton>
                ) : ``
            }
        </>
    );
};
const OpWrapper = styled.div<{ removeMargin? : boolean }>`
    ${props => props.removeMargin ? `` : `margin-bottom: ${spacing2};`}
`;
const RunButton = styled(Button)`
    margin-top: ${spacing2};
`;
