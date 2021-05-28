import { useCallback, useEffect, useState } from "react";
import Client, { Playlist } from "spotify-api.js";
import { loadPlaylists } from "../utils/spotify";
import { isLoaded, LoadingState } from "../utils/types";
import { useError } from "./spotifyError";

export default function useSpotifyPlaylists(
    token : string | null,
    client : Client | null,
) : [Array<Playlist> | null, boolean, Error | null, () => void] {
    const [loadState, setLoadState] = useState(LoadingState.NONE);
    const [error, throwError, resetError] = useError();
    
    const [playlists, setPlaylists] = useState<Array<Playlist> | null>(null);

    const reset = useCallback(() => {
        resetError();
        setPlaylists(null);
        setLoadState(LoadingState.NONE);
    }, [resetError, setPlaylists, setLoadState]);

    useEffect(() => {
        if (token && client && loadState === LoadingState.NONE) {
            setLoadState(LoadingState.LOADING);
            (async () => {
                const data = await loadPlaylists(client, throwError);
                if (data) {
                    setPlaylists(data.items);
                    setLoadState(LoadingState.LOADED);
                }
            })();
        }
    }, [
        token,
        client,
        loadState,
        setLoadState,
        throwError,
        setPlaylists,
    ]);

    return [playlists, isLoaded(loadState), error, reset];
}
