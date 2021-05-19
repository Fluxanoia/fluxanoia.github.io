import { useCallback, useEffect, useState } from "react";
import Client, { Playlist } from "spotify-api.js";
import { loadPlaylists } from "../utils/spotify";
import { isLoaded, LoadingState } from "../utils/types";
import { useError } from "./spotifyError";

export type PlaylistData = { 
    total : number,
}

export default function useSpotifyPlaylists(
    token : string | null,
    client : Client | null,
) : [Array<Playlist> | null, PlaylistData | null, boolean, Error | null, () => void] {
    const [loadState, setLoadState] = useState(LoadingState.NONE);
    const [error, throwError, resetError] = useError();
    
    const [playlists, setPlaylists] = useState<Array<Playlist> | null>(null);
    const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);

    const reset = useCallback(() => {
        resetError();
        setPlaylists(null);
        setPlaylistData(null);
        setLoadState(LoadingState.NONE);
    }, [resetError, setPlaylists, setPlaylistData, setLoadState]);

    useEffect(() => {
        if (token && client && loadState === LoadingState.NONE) {
            setLoadState(LoadingState.LOADING);
            (async () => {
                const data = await loadPlaylists(client, throwError);
                if (data) {
                    setPlaylists(data.items);
                    setPlaylistData({
                        total: data.total,
                    });
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
        setPlaylistData,
    ]);

    return [playlists, playlistData, isLoaded(loadState), error, reset];
}
