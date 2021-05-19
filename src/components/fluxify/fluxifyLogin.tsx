import React from "react";
import styled from "styled-components";
import { getAuthUrl } from "../../hooks/spotifyAuthenticator";
import { spacing2 } from "../../utils/dimensions";
import Button from "../button";

type FluxifyLoginProps = {
    window : Window,
    className? : string,
}
export const FluxifyLogin = ({ window, className } : FluxifyLoginProps) => {
    return (
        <Button className={ className } href={ getAuthUrl(window) }>
            Log-in with Spotify
        </Button>
    );       
}

type FluxifyLoginPageProps = {
    window : Window,
    error? : string,
}
export default function FluxifyLoginPage({ window } : FluxifyLoginPageProps) {
    return (
        <>
            <TextContainer>
                {
                    `This is a Spotify app created to allow for some more niche playlist
                    operations, like getting the songs you've liked that don't exist on
                    any of your playlists, or merging multiple playlists easily.`
                }
            </TextContainer>
            <FluxifyLogin window={ window }/>
        </>
    ); 
}

const TextContainer = styled.p`
    margin-bottom: ${spacing2};
`;
