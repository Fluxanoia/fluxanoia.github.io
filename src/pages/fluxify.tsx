import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { spacing1, spacing2, spacing3 } from "../utils/dimensions";
import Page from "./pages";
import useSpotifyAuth from "../hooks/spotifyAuthenticator";
import useSpotifyClient from "../hooks/spotifyClient";
import Collapse from "../components/collapse";
import Button from "../components/button";
import FluxifyLoading from "../components/fluxify/fluxifyLoading";
import FluxifyLoginPage from "../components/fluxify/fluxifyLogin";
import FluxifyHeader from "../components/fluxify/fluxifyHeader";
import FluxifyLogoutPage, { FluxifyLogout } from "../components/fluxify/fluxifyLogout";
import FluxifyOp from "../components/fluxify/ops/fluxifyOp";
import { doesRequireLogin } from "../hooks/spotifyErrorHandler";
import { exclusiveLikedOp } from "../components/fluxify/ops/fluxifyExcusiveLiked";
import { mergeOp } from "../components/fluxify/ops/fluxifyMergePlaylists";

const ops : Array<FluxifyOp> = [
    mergeOp,
    exclusiveLikedOp,
]

export const fluxifyPage : Page = new Page(Fluxify, {
    accentColour: "#FF74D9",
    name: "Fluxify",
});
export default function Fluxify() {
    const [opError, setOpError] = useState<string | null>(null);
    const [token, _logout] = useSpotifyAuth();
    const [client, loaded, error, reset] = useSpotifyClient(token);
    const [currentOp, setCurrentOp] = useState<string | null>(null);

    const logout = useCallback(() => {
        _logout();
        reset();
    }, [_logout, reset]);

    if (error || opError) {
        const message = doesRequireLogin(error ?? "") || doesRequireLogin(opError ?? "") ? (
            `Your session has expired, please log-in again.`
        ) : ((error ?? opError) ?? "FatalError: Unknown error.");
        return <FluxifyLogoutPage logout={ logout } message={ message } />;
    } else if (!token) {
        return <FluxifyLoginPage window={ window } />;
    } else if (loaded) {
        if (!client) {
            return (
                <FluxifyLogoutPage
                    logout={ logout }
                    message={ `FatalError: Loading inconsistencies.` }
                />
            );
        }
        const currentOpData = currentOp ? ops.find(op => op.getKey() === currentOp) : undefined;
        const CurrentOpComponent = currentOpData ? currentOpData.getComponent() : undefined;
        return (
            <>
                <FluxifyHeader client={ client } />
                <SelectCollapse title="Select Function">
                    <SelectWrapper>
                        { ops.map(op => (
                            <SelectButton
                                key={ op.getKey() }
                                onClick={ () => setCurrentOp(op.getKey()) }
                            >
                                { op.getName() }
                            </SelectButton>
                        )) }
                    </SelectWrapper>
                </SelectCollapse>
                { CurrentOpComponent ? (
                    <CurrentOpComponent
                        token={ token }
                        client={ client }
                        throwError={ e => setOpError(e) }
                    />
                ) : `` }
                <FluxifyLogout logout={ logout }/>
            </>
            
        );
    } else {
        return <FluxifyLoading />;
    }
}

const SelectCollapse = styled(Collapse)`
    margin-bottom: ${spacing2};
`;

const SelectWrapper = styled.div`
    padding: ${spacing3};
    padding-bottom: ${spacing1};
`;

const SelectButton = styled(Button)`
    margin-bottom: ${spacing2};
`;
