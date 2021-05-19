import React, { useEffect } from "react";
import styled from "styled-components";
import usePlaylistSelector from "../../../hooks/playlistSelector";
import { discernError, getLoadingError, useError } from "../../../hooks/spotifyError";
import useSpotifyPlaylists from "../../../hooks/spotifyPlaylists";
import { spacing2 } from "../../../utils/dimensions";
import { addToPlaylist, createPlaylist, loadAllTracks } from "../../../utils/spotify";
import Button from "../../button";
import FluxifyLoading from "../fluxifyLoading";
import FluxifyOp, { FluxifyOpProps } from "./fluxifyOp";

export const mergeOp = new FluxifyOp(
    `merge`,
    `Merge playlists`,
    FluxifyMerge,
);
export default function FluxifyMerge({
    token,
    client,
    throwError,
    disable,
    finish,
} : FluxifyOpProps) {
    const [playlists, metadata, loaded, playlistError] = useSpotifyPlaylists(token, client);
    const [selectorComponent, selected] = usePlaylistSelector(playlists, metadata);
    const [localError, throwLocalError] = useError();

    useEffect(() => {
        if (localError || playlistError) throwError(discernError(localError, playlistError));
    }, [throwError, localError, playlistError]);

    const run = () => {
        if (selected.length === 0) return;
        disable();
        (async () => {
            const newPlaylist = await createPlaylist(
                client,
                throwLocalError,
                `Fluxify-Merge`,
                `merges: ${selected.map(p => p.name).join(`, `)}`
            );
            if (newPlaylist) {
                const tracks = await loadAllTracks(selected, throwLocalError);
                await addToPlaylist(newPlaylist, tracks.map(t => t.track.uri), throwLocalError);
                finish();
            }
        })();
    };

    if (localError || playlistError) {
        return <FluxifyLoading />;
    } else if (loaded) {
        if (!playlists) {
            throwLocalError(getLoadingError(`FluxifyExclusiveLiked`));
            return <FluxifyLoading />;
        }
        return (
            <>
                <TextContainer>
                    { `
                        This operation will create a new playlist which contains all the
                        selected playlists.
                    ` }
                </TextContainer>
                <SelectorWrapper>
                    { selectorComponent }
                </SelectorWrapper>
                { selected.length > 0 ? <Button onClick={ run }>{ `Generate` }</Button> : `` }
            </>
        );
    } else {
        return <FluxifyLoading />;
    }
}

const TextContainer = styled.p``;
const SelectorWrapper = styled.div`
    margin-bottom: ${spacing2};
`;
