import React from "react";
import styled from "styled-components";
import { getLoadingError, useError } from "../../../hooks/spotifyError";
import useSpotifyPlaylists from "../../../hooks/spotifyPlaylists";
import FluxifyLoading from "../fluxifyLoading";
import FluxifyOp, { FluxifyOpProps, renderOp, useErrorAggregator } from "./fluxifyOp";

const opName = `UnfollowFluxify`;
const opDesc = `Unfollow Fluxify playlists`;
export const unfollowFluxifyOp = new FluxifyOp(opName, opDesc, FluxifyUnfollowFluxify);
export default function FluxifyUnfollowFluxify({
    token,
    client,
    throwGlobalError,
    disable,
    finish,
} : FluxifyOpProps) {
    const [playlists, loaded, playlistError] = useSpotifyPlaylists(token, client);
    const [localError, throwError] = useError();
    const hasError = useErrorAggregator(throwGlobalError, [localError, playlistError]);
    
    const run = async () => {
        if (!playlists) return false;
        for (const p of playlists.filter(p => p.name.startsWith(`Fluxify-`))) {
            if (!(await p.unfollow().catch(throwError))) return false;
        }
        return true;
    }

    if (hasError) {
        return <FluxifyLoading />;
    } else if (loaded) {
        if (!playlists) {
            throwError(getLoadingError(opName));
            return <FluxifyLoading />;
        }
        const components = [
            <TextContainer key={ `description` }>
                { `
                    This operation will unfollow any of your playlists that start with
                    'Fluxify-'.
                ` }
            </TextContainer>,
        ]
        return renderOp(components, true, run, disable, finish);
    } else {
        return <FluxifyLoading />;
    }
}

const TextContainer = styled.p``;
