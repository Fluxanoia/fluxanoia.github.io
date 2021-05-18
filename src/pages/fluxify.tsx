import React, { useEffect } from "react";
import styled from "styled-components";
import { spacing2, spacing3 } from "../utils/dimensions";
import Page from "./pages";
import useSpotifyAuth from "../hooks/spotifyAuthenticator";
import useSpotifyPlaylists from "../hooks/spotifyPlaylists";
import useSpotifyClient from "../hooks/spotifyClient";
import Collapse from "../components/collapse";
import useFluxifyPlaylists from "../hooks/fluxifyPlaylists";
import Button from "../components/button";
import FluxifyLoading from "../components/fluxify/ops/fluxifyLoading";
import FluxifyLoginPage from "../components/fluxify/ops/fluxifyLogin";
import FluxifyHeader from "../components/fluxify/fluxifyHeader";
import FluxifyExclusiveLiked from "../components/fluxify/ops/fluxifyExcusiveLiked";
import FluxifyLogoutPage, { FluxifyLogout } from "../components/fluxify/ops/fluxifyLogout";

export const getFirstTruthy = <T,>(...list : Array<T | null>) => {
    for (const item of list) if (item) return item;
    return null;
}

export const fluxifyPage : Page = new Page(Fluxify, {
    accentColour: "#FF74D9",
    name: "Fluxify",
});
export default function Fluxify() {
    const [token, logout, setLogoutCallbacks] = useSpotifyAuth();
    const [client, loadedClient, errorClient, resetClient] = useSpotifyClient(token, logout);
    const [
        playlists,
        playlistData,
        loadedPlaylists,
        errorPlaylists,
        resetPlaylists
    ] = useSpotifyPlaylists(token, logout, client);
    const [
        playlistComponents,
        selectedPlaylists,
        selectAll,
        selectNone,
    ] = useFluxifyPlaylists(playlists, playlistData);

    useEffect(() => {
        setLogoutCallbacks([resetClient, resetPlaylists])
    }, [setLogoutCallbacks, resetClient, resetPlaylists]);

    const renderApp = () => {
        if (!client || !playlists) return <FluxifyLoading />;
        return (
            <>
                <FluxifyHeader client={ client } />
                <OpSelectCollapse title="Select Function">
                    <OpSelectWrapper>
                        <Button key="likedExclusive" onClick={ () => {} }>
                            { `Find exclusive liked songs` }
                        </Button>
                    </OpSelectWrapper>
                </OpSelectCollapse>
                <FluxifyExclusiveLiked
                    selectedPlaylists={ selectedPlaylists }
                    playlistComponents={ playlistComponents }
                    selectAll={ selectAll }
                    selectNone={ selectNone }
                />
                <FluxifyLogout logout={ logout }/>
            </>
            
        );
    }

    const loaded = [loadedClient, loadedPlaylists].every(x => x);
    const error = getFirstTruthy(errorClient, errorPlaylists);
    if (!token) {
        return <FluxifyLoginPage window={ window } />;
    } else if (loaded) {
        return renderApp();
    } else if (error) {
        return <FluxifyLogoutPage logout={ logout } message={ error } />;
    } else {
        return <FluxifyLoading />;
    }
}

const OpSelectCollapse = styled(Collapse)`
    margin-bottom: ${spacing2};
`;

const OpSelectWrapper = styled.div`
    padding: ${spacing3};
`;
