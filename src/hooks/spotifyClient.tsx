import { useCallback, useEffect, useState } from "react";
import Client from "spotify-api.js";
import { LoadingState, isLoaded } from "../utils/types";
import { useError } from "./spotifyError";

export default function useSpotifyClient(token : string | null)
    : [Client | null, boolean, Error | null, () => void] {
    const [loadState, setLoadState] = useState(LoadingState.NONE);
    const [error, throwError, resetError] = useError();

    const [client, setClient] = useState<Client | null>(null);

    const reset = useCallback(() => {
        resetError();
        setClient(null);
        setLoadState(LoadingState.NONE);
    }, [resetError, setClient]);

    useEffect(() => {
        if (token && loadState === LoadingState.NONE) {
            (async () => {
                setLoadState(LoadingState.LOADING);
                const client = new Client(token, {
                    cacheTracks: true,
                    cacheArtists: true,
                    cacheAlbums: true,
                });
                await client.user.info().catch(throwError);
                setClient(client);
                setLoadState(LoadingState.LOADED)
            })();
        }
    }, [token, loadState, setLoadState, throwError, setClient]);

    return [client, isLoaded(loadState), error, reset]
}
