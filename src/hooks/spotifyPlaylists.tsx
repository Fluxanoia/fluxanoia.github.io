import { useCallback, useEffect, useState } from "react";
import Client, { Playlist, UnexpectedError } from "spotify-api.js";
import { isLoaded, LoadingState } from "../utils/types";
import useSpotifyErrorHandler from "./spotifyErrorHandler";

export type PlaylistData = { 
    limit : number,
    offset : number,
    total : number,
}

export default function useSpotifyPlaylists(
    token : string | null,
    logout : () => void,
    client : Client | null,
) : [Array<Playlist> | null, PlaylistData | null, boolean, string | null, () => void] {
    const [loadState, setLoadState] = useState(LoadingState.NONE);
    const [playlists, setPlaylists] = useState<Array<Playlist> | null>(null);
    const [playlistData, setPlaylistData] = useState<PlaylistData | null>(null);
    const [error, handleError, clearError] = useSpotifyErrorHandler(logout);

    const reset = useCallback(() => {
        clearError();
        setPlaylists(null);
        setPlaylistData(null);
        setLoadState(LoadingState.NONE);
    }, [clearError, setPlaylists, setPlaylistData, setLoadState]);

    const loadPlaylists = useCallback(async (client : Client) => {
        const data = await client.user.getPlaylists().catch(handleError);
        if (data) {
            setPlaylists(data.items);
            setPlaylistData({
                limit: data.limit,
                offset: data.offset,
                total: data.total,
            });
        } else {
            handleError(new UnexpectedError("Failed to load data."));
        }
    }, [handleError, setPlaylists, setPlaylistData])

    useEffect(() => {
        if (token && client && loadState === LoadingState.NONE) {
            (async () => {
                setLoadState(LoadingState.LOADING);
                const loaders = [loadPlaylists];
                for (const loader of loaders) await loader(client);
            })();
            return () => setLoadState(LoadingState.LOADED);
        }
    }, [token, client, loadState, setLoadState, loadPlaylists]);

    return [playlists, playlistData, isLoaded(loadState), error, reset];
}
