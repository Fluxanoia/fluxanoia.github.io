import { useCallback, useState } from "react";
import { UnexpectedError } from "spotify-api.js";

export const getLoadingError = (componentName : string) => {
    return new UnexpectedError(`Loading inconsistencies (in ${componentName})`);
} 

const requireLoginStatus = 401;
export const getErrorMessage = (e : Error) => {
    if (e instanceof UnexpectedError && e.response) {
        if (e.response.status === requireLoginStatus) {
            return `Your session has expired, please log-in again.`;
        }
    }
    return `${e.name}: ${e.message}.`;
}
export const discernError = (...errors : Array<Error | null>) : Error => {
    return errors.find(e => e) ?? new UnexpectedError(`Expected an error`);
}
export const discernErrorMessage = (...errors : Array<Error | null>) : string => {
    return getErrorMessage(discernError(...errors));
}

export function useError() 
    : [Error | null, (e : Error) => void, () => void] {
    const [error, setError] = useState<Error | null>(null);
    
    const throwError = useCallback((e : Error) => {
        setError(e);
    }, [setError]);
    const reset = useCallback(() => {
        setError(null);
    }, [setError]);
    
    return [error, throwError, reset]
}
