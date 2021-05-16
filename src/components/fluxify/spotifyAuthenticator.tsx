import Cookies from "js-cookie";
import { parse } from "query-string";
import React, { useState } from "react";
import Button from "../button";

const spotifyCookieId = "spotifyAuthToken";
const accessTokenId = "access_token";
const scopes = [
    `playlist-modify-public`,
    `playlist-read-private`,
    `playlist-modify-private`,
    `user-library-read`,
    `user-library-modify`,
    `user-read-email`,
    `user-read-private`,
];

export const getRedirect = (w : Window) => {
    return (typeof w !== "undefined") ? w.location.href : "https://fluxanoia.co.uk/fluxify";
}
const getAuthUrl = (w : Window) => {
    return (
        `https://accounts.spotify.com/authorize?response_type=token` +
        `&client_id=${process.env.REACT_APP_SPOTIFY_PUBLIC}` +
        `&scope=${scopes.join('%20')}` +
        `&redirect_uri=${getRedirect(w)}` +
        '&show_dialog=false'
    )
}

const removeHash = (w : Window) => {
    if (typeof w !== "undefined") {
        var scroll_v, scroll_h, loc = w.location;
        if ("pushState" in w.history)
            w.history.pushState("", document.title, loc.pathname + loc.search);
        else {
            scroll_v = document.body.scrollTop;
            scroll_h = document.body.scrollLeft;
            loc.hash = "";
            document.body.scrollTop = scroll_v;
            document.body.scrollLeft = scroll_h;
        }
    }
}

const getHashToken = (w : Window) => {
    if (typeof w !== "undefined") {
        const hash = parse(w.location.hash);
        if (accessTokenId in hash) {
            const data = hash[accessTokenId];
            if (data && !(data instanceof Array)) {
                Cookies.remove(spotifyCookieId);
                Cookies.set(spotifyCookieId, data);
                return data;
            }
        }
    }
    return null;
};
const getCookieToken = () => {
    return Cookies.get(spotifyCookieId) ?? null;
};

export default function useSpotifyAuth(logoutCallback : () => void) 
    : [string | null, () => void, JSX.Element, JSX.Element] {
    const [hashToken, setHashToken] = useState(getHashToken(window));
    const [cookieToken, setCookieToken] = useState(getCookieToken());

    const logout = () => {
        Cookies.remove(spotifyCookieId);
        removeHash(window);
        setHashToken(getHashToken(window));
        setCookieToken(getCookieToken());
        logoutCallback();
    }

    const loginButton = (
        <Button href={ getAuthUrl(window) }>
            Log-in with Spotify
        </Button>        
    );
    const logoutButton = (
        <Button href={ undefined } onClick={ logout }>
            { "Log-out" }
        </Button>
    );

    return [hashToken ?? cookieToken, logout, loginButton, logoutButton];
}
