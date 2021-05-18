import React, { useEffect } from "react";
import styled from "styled-components";
import { ifSuperSmall, spacing1, spacing2 } from "../utils/dimensions";
import Page from "./pages";
import useSpotifyAuth from "../hooks/spotifyAuthenticator";
import useSpotifyPlaylists from "../hooks/spotifyPlaylists";
import useSpotifyClient from "../hooks/spotifyClient";
import { renderFluxifyLogin, renderFluxifyLogout } from "../components/fluxify/fluxifyButtons";
import { renderFluxifyLoading } from "../components/fluxify/fluxifyLoading";
import { getSpotifyImage } from "../components/fluxify/fluxifyImages";
import Collapse from "../components/collapse";
import useFluxifyPlaylists from "../hooks/fluxifyPlaylists";
import Button from "../components/button";

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
        if (!client || !playlists) {
            return renderFluxifyLoading();
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
                <MainContainer>
                    <Collapse title="Select Function">
                        <Button key="likedExclusive" onClick={ () => {} }>
                            { `Find exclusive liked songs` }
                        </Button>
                    </Collapse>
                    <Collapse title="Select Playlists">
                        <SelectInfoContainer>
                            <SelectTextContainer>
                                { `${selectedPlaylists.length} playlists selected` }
                            </SelectTextContainer>
                            <SelectButtonContainer>
                                <Button key="selectAll" onClick={ selectAll }>{ `All` }</Button>
                            </SelectButtonContainer>
                            <SelectButtonContainer>
                                <Button key="selectNone" onClick={ selectNone }>{ `None` }</Button>
                            </SelectButtonContainer>
                        </SelectInfoContainer>
                        <PlaylistsContainer>
                            { playlistComponents }
                        </PlaylistsContainer>
                    </Collapse>
                </MainContainer>
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
    ${ifSuperSmall} {
        display: none;
    }
`;
const TitleContainer = styled.h1`
    margin: 0px;
`;

const MainContainer = styled.div`
    margin-bottom: ${spacing2};
`;

const PlaylistsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
const SelectInfoContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: ${spacing2} 0;
    padding: 0 ${spacing2};

    ${ifSuperSmall} {
        flex-direction: column;
    }
`;
const SelectTextContainer = styled.div`
    margin-left: ${spacing2};
    margin-right: auto;
    ${ifSuperSmall} {
        margin: ${spacing1} ${spacing2};
    }
`;
const SelectButtonContainer = styled.div`
    width: 100px;
    margin-right: ${spacing2};
    ${ifSuperSmall} {
        width: 100%;
        margin: ${spacing1} ${spacing2};
    }
`;

const ButtonContainer = styled.div``;
const TextContainer = styled.p`
    text-align: center;
    margin-bottom: ${spacing2};
`;

const ErrorContainer = styled.div`
    align-text: center;
`;
