import React, { useEffect } from "react";
import styled from "styled-components";
import usePlaylistSelector from "../../../hooks/playlistSelector";
import { discernError, getLoadingError, useError } from "../../../hooks/spotifyError";
import useSpotifyPlaylists from "../../../hooks/spotifyPlaylists";
import { spacing2 } from "../../../utils/dimensions";
import { createPlaylist, loadAllTracks, loadLiked, addToPlaylist } from "../../../utils/spotify";
import Button from "../../button";
import FluxifyLoading from "../fluxifyLoading";
import FluxifyOp, { FluxifyOpProps } from "./fluxifyOp";

export const exclusiveLikedOp = new FluxifyOp(
    `exclusiveLiked`,
    `Find exclusive liked songs`,
    FluxifyExclusiveLiked,
);
export default function FluxifyExclusiveLiked({
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
                `Fluxify-ExclusiveLiked`,
                `gets the exclusive liked songs w.r.t.: ${selected.map(p => p.name).join(`, `)}`
            );
            if (newPlaylist) {
                const likedTracks = await loadLiked(client, throwLocalError);
                if (likedTracks) {
                    const likedUris = new Set(likedTracks.items.map(t => t.track.uri));
                    const trackUris = new Set(
                        (await loadAllTracks(selected, throwLocalError)).map(t => t.track.uri));
                    let exclusives = [];
                    for (const liked of likedUris) {
                        if (!trackUris.has(liked)) exclusives.push(liked);
                    }
                await addToPlaylist(newPlaylist, exclusives, throwLocalError);
                // await newPlaylist.uploadImage(`${window.location.origin}/res/fluxify.jpg`)
                //     .catch(throwLocalError)
                finish();
                }
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
                        This operation will create a new playlist consisting of the songs in
                        your Liked that aren't in any of the selected playlists.
                    ` }
                </TextContainer>
                <SelectorWrapper removeMargin>
                    { selectorComponent }
                </SelectorWrapper>
                { 
                    selected.length > 0 ? (
                        <GenerateButton onClick={ run }>
                            { `Generate` }
                        </GenerateButton>
                    ) : `` 
                }
            </>
        );
    } else {
        return <FluxifyLoading />;
    }
}

const TextContainer = styled.p``;
const SelectorWrapper = styled.div<{ removeMargin? : boolean }>`
    ${props => props.removeMargin ? `` : `margin-bottom: ${spacing2};`}
`;
const GenerateButton = styled(Button)`
    margin-top: ${spacing2};
`;