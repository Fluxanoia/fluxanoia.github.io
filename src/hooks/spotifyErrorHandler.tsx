import { useCallback, useState } from "react";
import { UnexpectedError } from "spotify-api.js";

export default function useSpotifyErrorHandler(logout : () => void) 
    : [string | null, (e : Error) => void, () => void] {
    const [error, setError] = useState<string | null>(null);
    
    const handleError = useCallback((e : Error) => {
        if (e instanceof UnexpectedError && e.response) {
            if (e.response.status === 404) return;
            if (e.response.status === 401) {
                logout();
                return;
            }
        }
        setError(`${e.name}: ${e.message}`);
    }, [setError, logout]);
    
    const clearError = useCallback(() => {
        setError(null)
    }, [setError]);

    return [error, handleError, clearError]
}
