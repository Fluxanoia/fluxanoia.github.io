import React, { useEffect } from "react";
import styled from "styled-components";
import { ifSmall, spacing1, spacing2 } from "../utils/dimensions";
import Page from "./pages";
import { Playlist } from "spotify-api.js";
import { textColour } from "../utils/colours";
import useSpotifyAuth from "../hooks/spotifyAuthenticator";
import useSpotifyPlaylists from "../hooks/spotifyPlaylists";
import useSpotifyClient from "../hooks/spotifyClient";
import { renderFluxifyLogin, renderFluxifyLogout } from "../components/fluxify/fluxifyButtons";
import { renderFluxifyLoading } from "../components/fluxify/fluxifyLoading";
import { getSpotifyImage } from "../components/fluxify/fluxifyImages";

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
    ] = useSpotifyPlaylists(
        token, logout, client
    );

    useEffect(() => {
        setLogoutCallbacks([resetClient, resetPlaylists])
    }, [setLogoutCallbacks, resetClient, resetPlaylists]);

    const renderApp = () => {
        if (!client || !playlists) {
            return renderFluxifyLoading();
        }

        const renderPlaylist = (playlist : Playlist) => {
            return (
                <PlaylistContainer key={ playlist.id }>
                    { getSpotifyImage(playlist.images) }
                    <PlaylistInfo>
                        { playlist.name }
                    </PlaylistInfo>
                </PlaylistContainer>
            );
        }
        return (
            <>
                <HeaderContainer>
                    <UserImageContainer>
                        { getSpotifyImage(client.user.images, { rounded : true }) }
                    </UserImageContainer>
                    <TitleContainer>
                        { `${client.user.name}` }
                    </TitleContainer>
                </HeaderContainer>
                <PlaylistsContainer>
                    { playlists.map(renderPlaylist) }
                </PlaylistsContainer>
                <ButtonContainer>
                    { renderFluxifyLogout(logout) }
                </ButtonContainer>
            </>
            
        );
    }
    const renderLogin = () => {
        return (
            <>
                <TextContainer>
                    This app requires you to log into Spotify:
                </TextContainer>
                <ButtonContainer>
                    { renderFluxifyLogin(window) }
                </ButtonContainer>
            </>
        ); 
    }
    const renderError = () => {
        return (
            <>
                <ErrorContainer>
                    { `${error ?? "Unhandled exception."}.` }
                </ErrorContainer>
                <ButtonContainer>
                    { renderFluxifyLogout(logout) }
                </ButtonContainer>
            </>
        );
    }

    const loaded = [loadedClient, loadedPlaylists].every(x => x);
    const error = getFirstTruthy(errorClient, errorPlaylists);
    if (!token) {
        return renderLogin();
    } else if (loaded) {
        return renderApp();
    } else if (error) {
        return renderError();
    } else {
        return renderFluxifyLoading();
    }
}

const HeaderContainer = styled.div`
    display: flex;
    margin-bottom: ${spacing2};
`;

const UserImageContainer = styled.div`
    margin-right: ${spacing2};
    ${ifSmall} {
        display: none;
    }
`;

const TitleContainer = styled.h1`
    margin: 0px;
`;

const PlaylistsContainer = styled.div`
    margin-bottom: ${spacing2};
`;

const PlaylistContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${spacing1};
    padding: ${spacing1};

    border: 5px solid ${textColour};
`;

const PlaylistInfo = styled.div`
    margin-left: ${spacing2};
    flex-grow: 1;
`;

const ButtonContainer = styled.div`
`;

const TextContainer = styled.p`
    text-align: center;
    margin-bottom: ${spacing2};
`;

const ErrorContainer = styled.div`
    align-text: center;
`;

