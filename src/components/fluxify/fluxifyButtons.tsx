import React from "react";
import { getAuthUrl } from "../../hooks/spotifyAuthenticator";
import Button from "../button";

export const renderFluxifyLogin = (w : Window) => {
    return (
        <Button href={ getAuthUrl(w) }>
            Log-in with Spotify
        </Button>
    );       
}
export const renderFluxifyLogout = (logout : () => void) => {
    return (
        <Button href={ undefined } onClick={ logout }>
            { `Log-out` }
        </Button>
    );       
}