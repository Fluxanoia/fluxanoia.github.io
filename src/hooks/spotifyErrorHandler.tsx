import { useCallback, useState } from "react";
import { UnexpectedError } from "spotify-api.js";

const requireLoginStatus = 401;
export const doesRequireLogin = (error : string) => {
    return error === String(requireLoginStatus);
}
export default function useSpotifyErrorHandler() 
    : [string | null, (e : Error) => void, () => void] {
    const [error, setError] = useState<string | null>(null);
    
    const handleError = useCallback((e : Error) => {
        if (e instanceof UnexpectedError && e.response) {
            if (e.response.status === requireLoginStatus) {
                setError(String(requireLoginStatus));
                return;
            }
        }
        setError(`${e.name}: ${e.message}`);
    }, [setError]);
    
    const reset = useCallback(() => {
        setError(null);
    }, [setError]);

    return [error, handleError, reset]
}
