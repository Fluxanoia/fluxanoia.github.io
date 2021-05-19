import React from "react";
import styled from "styled-components";
import { getAuthUrl } from "../../hooks/spotifyAuthenticator";
import { spacing2 } from "../../utils/dimensions";
import { AnchorProps } from "../../utils/types";
import Button from "../button";

type FluxifyLoginProps = {
    window : Window,
} & AnchorProps;
export const FluxifyLogin = (props : FluxifyLoginProps) => {
    const { window, ...otherProps } = props;
    return (
        <Button href={ getAuthUrl(window) } {...otherProps}>
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
