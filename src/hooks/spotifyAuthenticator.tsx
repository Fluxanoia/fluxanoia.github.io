import Cookies from "js-cookie";
import { parse } from "query-string";
import { useState } from "react";

const scopes = [
    `playlist-read-private`,
    `playlist-modify-public`,
    `playlist-modify-private`,
    `user-library-read`,
    `user-library-modify`,
    `user-read-email`,
    `user-read-private`,
    `ugc-image-upload`,
];

export const getRedirect = (w : Window) => {
    return (typeof w !== "undefined") ? w.location.href : "https://fluxanoia.co.uk/fluxify";
}
export const getAuthUrl = (w : Window) => {
    return (
        `https://accounts.spotify.com/authorize?response_type=token` +
        `&client_id=${process.env.REACT_APP_SPOTIFY_PUBLIC}` +
        `&scope=${scopes.join('%20')}` +
        `&redirect_uri=${getRedirect(w)}` +
        '&show_dialog=false'
    )
}

export const removeHash = (w : Window) => {
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
    const cookie = process.env.REACT_APP_SPOTIFY_COOKIE;
    const accessTokenName = process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN_KEY;
    if (typeof w !== "undefined" && cookie && accessTokenName) {
        const hash = parse(w.location.hash);
        if (accessTokenName in hash) {
            const data = hash[accessTokenName];
            if (data && !(data instanceof Array)) {
                Cookies.remove(cookie);
                Cookies.set(cookie, data);
                return data;
            }
        }
    }
    return null;
};
export const getCookieToken = () => {
    const cookie = process.env.REACT_APP_SPOTIFY_COOKIE;
    return cookie ? Cookies.get(cookie) ?? null : null;
};

export default function useSpotifyAuth() : [string | null, () => void] {
    const [hashToken, setHashToken] = useState(getHashToken(window));
    const [cookieToken, setCookieToken] = useState(getCookieToken());

    removeHash(window);

    const logout = () => {
        const cookie = process.env.REACT_APP_SPOTIFY_COOKIE;
        if (cookie) Cookies.remove(cookie);
        setHashToken(getHashToken(window));
        setCookieToken(getCookieToken());
    }

    return [hashToken ?? cookieToken, logout];
}
