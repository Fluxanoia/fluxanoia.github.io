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
import FluxifyLogoutPage from "../components/fluxify/fluxifyLogout";
import FluxifyOp from "../components/fluxify/ops/fluxifyOp";
import { discernErrorMessage, getLoadingError, useError } from "../hooks/spotifyError";
import { exclusiveLikedOp } from "../components/fluxify/ops/fluxifyExcusiveLiked";
import { mergeOp } from "../components/fluxify/ops/fluxifyMergePlaylists";
import { unfollowFluxifyOp } from "../components/fluxify/ops/fluxifyUnfollowFluxify";
import { autoArtistPlaylistsOp } from "../components/fluxify/ops/fluxifyAutoArtistPlaylists";

const ops : Array<FluxifyOp> = [
    mergeOp,
    exclusiveLikedOp,
    autoArtistPlaylistsOp,
    unfollowFluxifyOp,
]

export const fluxifyLink = `/fluxify`;
export const fluxifyPage : Page = new Page(Fluxify, {
    accentColour: "#1DB954",
    name: "Fluxify",
    link: fluxifyLink,
});
export default function Fluxify() {
    const [error, throwError, resetError] = useError();
    const [token, _logout] = useSpotifyAuth();
    const [client, loaded, clientError, resetClient] = useSpotifyClient(token);
   
    const [currentOp, setCurrentOp] = useState<string | null>(null);
    const [disabled, setDisabled] = useState(false);

    const logout = useCallback(() => {
        _logout();
        resetError();
        resetClient();
    }, [_logout, resetError, resetClient]);

    if (error || clientError) {
        return (
            <FluxifyLogoutPage
                logout={ logout }
                message={ discernErrorMessage(error, clientError) }
            />
        );
    } else if (!token) {
        return <FluxifyLoginPage window={ window } />;
    } else if (loaded) {
        if (!client) {
            throwError(getLoadingError(`Fluxify`));
            return <FluxifyLoading />;
        }
        const currentOpData = currentOp ? ops.find(op => op.getName() === currentOp) : undefined;
        const CurrentOpComponent = currentOpData ? currentOpData.getComponent() : undefined;
        return (
            <>
                <FluxifyHeader client={ client } logout={ logout }/>
                <InterfaceWrapper disabled={ disabled }>
                    <SelectCollapse 
                        title={ `Select an Operation` }
                        value={ currentOpData ? currentOpData.getDescription() : `` }
                    >
                        <SelectWrapper>
                            { ops.map(op => (
                                <SelectButton
                                    key={ op.getName() }
                                    onClick={ () => setCurrentOp(op.getName()) }
                                >
                                    { op.getDescription() }
                                </SelectButton>
                            )) }
                        </SelectWrapper>
                    </SelectCollapse>
                    { CurrentOpComponent ? (
                        <CurrentOpWrapper>
                            <CurrentOpComponent
                                token={ token }
                                client={ client }
                                throwGlobalError={ e => throwError(e) }
                                disable={ () => setDisabled(true) }
                                enable={ () => setDisabled(false) }
                                finish={ () => {
                                    setDisabled(false);
                                    setCurrentOp(null);
                                }}
                            />
                        </CurrentOpWrapper>
                    ) : `` }
                </InterfaceWrapper>
            </>
            
        );
    } else {
        return <FluxifyLoading />;
    }
}

const InterfaceWrapper = styled.div<{ disabled: boolean }>`
    ${props => props.disabled ? `
        opacity: 0.6;
        pointer-events: none;
        user-select: none;
    ` : `
        opacity: 1;
    `};
    transition: opacity 0.25s;
`;

const SelectCollapse = styled(Collapse)`
`;

const SelectWrapper = styled.div`
    padding: ${spacing3};
    padding-bottom: ${spacing1};
`;

const CurrentOpWrapper = styled.div`
    margin-top: ${spacing2};
`;

const SelectButton = styled(Button)`
    margin-bottom: ${spacing2};
`;
