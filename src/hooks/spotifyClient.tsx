import { useCallback, useEffect, useState } from "react";
import Client from "spotify-api.js";
import { LoadingState, isLoaded } from "../utils/types";
import useSpotifyErrorHandler from "./spotifyErrorHandler";

export default function useSpotifyClient(token : string | null, logout : () => void) 
    : [Client | null, boolean, string | null, () => void] {
    const [client, setClient] = useState<Client | null>(null);
    const [loadUserState, setUserLoadState] = useState(LoadingState.NONE);
    const [loadClientState, setClientLoadState] = useState(LoadingState.NONE);
    const [error, handleError, clearError] = useSpotifyErrorHandler(logout);

    const reset = useCallback(() => {
        clearError();
        setClient(null);
        setUserLoadState(LoadingState.NONE);
        setClientLoadState(LoadingState.NONE);
    }, [clearError, setClient]);

    useEffect(() => {
        if (token
            && loadUserState === LoadingState.NONE
            && loadClientState === LoadingState.NONE) {
            (async () => {
                setClientLoadState(LoadingState.LOADING);
                setUserLoadState(LoadingState.LOADING);
                const client = new Client(token, {
                    cacheCurrentUser: true,
                    ready: () => { setUserLoadState(LoadingState.LOADED) },
                });
                await client.login(token).catch(handleError);
                setClient(client);
            })();
            return () => setClientLoadState(LoadingState.LOADED);
        }
    }, [
        token,
        loadUserState,
        setUserLoadState,
        loadClientState,
        setClientLoadState,
        handleError,
        setClient,
    ]);

    return [client, isLoaded(loadUserState, loadClientState), error, reset]
}
