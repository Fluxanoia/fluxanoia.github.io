import React, { useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import { SpotifyApiContext } from "react-spotify-api";
import { SpotifyAuth, Scopes } from "react-spotify-auth";
import { spacing2 } from "../utils/dimensions";
import Page from "./pages";
import Button from "../components/button";
import FluxifyApp from "../components/fluxify/fluxifyApp";

const spotifyCookieName = "spotifyAuthToken";
const scopes = [
    Scopes.playlistModifyPublic,
    Scopes.playlistReadPrivate,
    Scopes.playlistModifyPrivate,
    Scopes.userLibraryRead,
    Scopes.userLibraryModify,
];
const clientId = "bfdd54505b7643b1beb7549430b9108f";

export const fluxifyPage : Page = new Page(Fluxify, {
    accentColour: "#FF74D9",
    name: "Fluxify",
});
export default function Fluxify() {
    const [cookieToken, _setCookieToken] = useState(Cookies.get(spotifyCookieName));
    const [foundToken, setFoundToken] = useState<string | undefined>(undefined);
    
    const updateCookieToken = () => {
        _setCookieToken(Cookies.get(spotifyCookieName))
    }
    const onAccessToken = (found : string) => {
        setFoundToken(found);
    }
    const logOut = () => {
        Cookies.remove(spotifyCookieName);
        updateCookieToken();
        setFoundToken(undefined);
    }

    const token = cookieToken ?? foundToken;
    const hasWindow = typeof window !== "undefined";
    const redirectUri = hasWindow ? window.location.href : "https://fluxanoia.co.uk/fluxify";
    return (
        <>
        { token ? (
            <SpotifyApiContext.Provider value={ token }>
                {
                    <>
                        <FluxifyApp />
                        <ButtonContainer key={ "spotify-log-out" }>
                            <Button href={ `/fluxify` } onClick={ logOut }>
                                { "Log-out" }
                            </Button>
                        </ButtonContainer>
                    </>
                }
            </SpotifyApiContext.Provider>
        ) : (
            <>
                <TextContainer>
                    This app requires you to log into Spotify:
                </TextContainer>
                <SpotifyAuthContainer>
                    <SpotifyAuth
                        redirectUri={ redirectUri }
                        clientID={ clientId }
                        scopes={ scopes }
                        onAccessToken={ onAccessToken }
                        title={ "Log-in with Spotify" }
                        noLogo={ true }
                    />
                </SpotifyAuthContainer>
            </>
        ) }
        </>
    );
}

const TextContainer = styled.p`
    text-align: center;
    margin-bottom: ${spacing2};
`;

const ButtonContainer = styled.div`
`;

const SpotifyAuthContainer = styled.div`
`;
