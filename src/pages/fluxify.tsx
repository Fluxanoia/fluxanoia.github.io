import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ifSmall, spacing1, spacing2, spacing5 } from "../utils/dimensions";
import Page from "./pages";
import Client, { Playlist, UnexpectedError } from "spotify-api.js";
import { textColour } from "../utils/colours";
import { TailSpin } from "react-loading-icons";
import useSpotifyAuth from "../components/fluxify/spotifyAuthenticator";

enum LoadingState {
    NONE,
    LOADING,
    LOADED,
}
type PlaylistData = { 
    limit : number,
    offset : number,
}

export const fluxifyPage : Page = new Page(Fluxify, {
    accentColour: "#FF74D9",
    name: "Fluxify",
});
export default function Fluxify() {
    const [dataLoadState, setDataLoadState] = useState(LoadingState.NONE);
    const [userLoadState, setUserLoadState] = useState(LoadingState.NONE);
    const [clientLoadState, setClientLoadState] = useState(LoadingState.NONE);
    const hasLoaded = dataLoadState === LoadingState.LOADED 
        && clientLoadState === LoadingState.LOADED
        && userLoadState === LoadingState.LOADED;

    const [error, setError] = useState<string | null>(null);
    const [client, setClient] = useState<Client | null>(null);
    
    const [playlists, setPlaylists] = useState<Array<Playlist> | null>(null);
    const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);

    const resetData = useCallback(() => {
        const setters = [setError, setClient, setPlaylists, setPlaylistData];
        for (const setter of setters) setter(null);
        const loaders = [setDataLoadState, setUserLoadState, setClientLoadState];
        for (const loader of loaders) loader(LoadingState.NONE);
    }, [
        setDataLoadState,
        setUserLoadState,
        setClientLoadState,
        setError,
        setClient,
        setPlaylists,
        setPlaylistData,
    ]);

    const [token, logout, loginButton, logoutButton] = useSpotifyAuth(resetData);

    const handleError = useCallback((e : Error) => {
        if (e instanceof UnexpectedError && e.response) {
            if (e.response.status === 404) return;
            if (e.response.status === 401) {
                logout();
                return;
            }
        }
        setError(`${e.name}: ${e.message}`);
    }, [setError, logout]);

    const loadPlaylists = useCallback(async (client : Client) => {
        const data = await client.user.getPlaylists().catch(handleError);
        if (data) {
            setPlaylists(data.items);
            setPlaylistData({
                limit: data.limit,
                offset: data.offset,
            });
        }
    }, [handleError, setPlaylists, setPlaylistData])

    useEffect(() => {
        if (token && client && dataLoadState === LoadingState.NONE) {
            (async () => {
                setDataLoadState(LoadingState.LOADING);
                const loaders = [loadPlaylists];
                for (const loader of loaders) {
                    await loader(client);
                }
            })();
            return () => setDataLoadState(LoadingState.LOADED);
        }
    }, [token, client, dataLoadState, setDataLoadState, loadPlaylists]);
    
    useEffect(() => {
        if (token && clientLoadState === LoadingState.NONE) {
            (async () => {
                setClientLoadState(LoadingState.LOADING);
                setUserLoadState(LoadingState.LOADING);
                const client = new Client(token, {
                    cacheCurrentUser: true,
                    ready: () => { setUserLoadState(LoadingState.LOADED) },
                });
                await client.login(token).catch(handleError);
                setClient(client);
            })();
            return () => setClientLoadState(LoadingState.LOADED);
        }
    }, [
        token,
        userLoadState,
        setUserLoadState,
        clientLoadState,
        setClientLoadState,
        handleError,
        setClient,
    ]);

    if (!token) {
        return (
            <>
                <TextContainer>
                    This app requires you to log into Spotify:
                </TextContainer>
                <ButtonContainer>
                    { loginButton }
                </ButtonContainer>
            </>
        );
    } else if (hasLoaded && client && playlists) {
        const getImage = (imaged : any, rounded? : boolean) => {
            return (
                imaged.images.length === 0 ? <></> :
                <ImageContainer src={ imaged.images[0].url } rounded={ rounded }/>
            );
        }
        const renderPlaylist = (playlist : Playlist) => {
            return (
                <PlaylistContainer key={ playlist.id }>
                    { getImage(playlist) }
                    <PlaylistInfo>
                        { playlist.name }
                    </PlaylistInfo>
                </PlaylistContainer>
            );
        }
        return (
            <>
                <HeaderContainer>
                    { getImage(client.user, true) }
                    <TitleContainer>
                        { `${client.user.name}` }
                    </TitleContainer>
                </HeaderContainer>
                <PlaylistsContainer>
                    { playlists.map(renderPlaylist) }
                </PlaylistsContainer>
                <ButtonContainer>
                    { logoutButton }
                </ButtonContainer>
            </>
            
        );
    } else if (error) {
        const response = error ?? "Unhandled exception.";
        return (
            <>
                <ErrorContainer>
                    { `${response}.` }
                </ErrorContainer>
                <ButtonContainer>
                    { logoutButton }
                </ButtonContainer>
            </>
        );
    } else {
        return (
            <LoadingContainer>
                <LoadingIcon stroke={ textColour }></LoadingIcon>
            </LoadingContainer>
        );
    }
}

const HeaderContainer = styled.div`
    display: flex;
    margin-bottom: ${spacing2};
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

    border: 5px solid ${textColour};
`;
const PlaylistInfo = styled.div`
    flex-grow: 1;
`;

const ImageContainer = styled.img<{ rounded? : boolean, }>`
    width: ${spacing5};
    height: ${spacing5};
    margin-right: ${spacing2};
    ${ props => props.rounded ? `border-radius: 16px;` : `` }

    ${ifSmall} {
        display: none;
    }
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
const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const LoadingIcon = styled(TailSpin)`
    margin: ${spacing2} 0;
`;
