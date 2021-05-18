import React from "react";
import styled from "styled-components";
import { getAuthUrl } from "../../../hooks/spotifyAuthenticator";
import { spacing2 } from "../../../utils/dimensions";
import Button from "../../button";

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
                This app requires you to log into Spotify:
            </TextContainer>
            <FluxifyLogin window={ window }/>
        </>
    ); 
}

const TextContainer = styled.p`
    text-align: center;
    margin-bottom: ${spacing2};
`;
