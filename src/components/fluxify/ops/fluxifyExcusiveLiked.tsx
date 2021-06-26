import React from "react";
import styled from "styled-components";
import { usePlaylistSelector } from "../../../hooks/elementSelector";
import usePlaylistImageSelector from "../../../hooks/playlistImageSelector";
import usePlaylistOrderSelector from "../../../hooks/playlistOrderSelector";
import { useError } from "../../../hooks/spotifyError";
import { createPlaylist, loadAllTracks, loadLiked, addToPlaylist, reorderTracks } from "../../../utils/spotify";
import FluxifyLoading from "../fluxifyLoading";
import FluxifyOp, { FluxifyOpProps, renderOp, useErrorAggregator } from "./fluxifyOp";

const opName = `ExclusivelyLiked`;
const opDesc = `Find exclusively liked songs`;
export const exclusiveLikedOp = new FluxifyOp(opName, opDesc, FluxifyExclusiveLiked);
export default function FluxifyExclusiveLiked({
    data,
    throwGlobalError,
    disable,
    finish,
} : FluxifyOpProps) {
    const { client, playlists } = data;
    const [selectorComponent, selected] = usePlaylistSelector('playlists', playlists);
    const [orderComponent, orderMetric, distinct] = usePlaylistOrderSelector('order', { 
        showDistinct: true,
    });
    const [imageComponent, imageColour] = usePlaylistImageSelector('image');
    const [localError, throwError] = useError();
    const hasError = useErrorAggregator(throwGlobalError, [localError])

    const run = async () => {
        const newPlaylist = await createPlaylist(client, throwError, opName,
            `gets the exclusive liked songs w.r.t.: ${selected.map(p => p.name).join(`, `)}`,
            imageColour
        );
        if (!newPlaylist) return false;
        const rawLikedTracks = await loadLiked(client, throwError);
        if (!rawLikedTracks) return false;
        const likedTracks = reorderTracks(
            rawLikedTracks.items.map(t => t.track), orderMetric, distinct);
        const playlistTracks = await loadAllTracks(client, selected, throwError);
        if (!playlistTracks) return false;
        let exclusives = [];
        const trackUris = new Set(playlistTracks.map(t => t.uri));
        const likedUris = new Set(likedTracks.map(t => t.uri));
        for (const liked of likedUris) {
            if (!trackUris.has(liked)) exclusives.push(liked);
        }
        return await addToPlaylist(newPlaylist, exclusives, throwError);
    };

    if (hasError) {
        return <FluxifyLoading />;
    } else {
        const components = [
            <TextContainer key={ `description `}>
                { `
                    This operation will create a new playlist consisting of the songs in
                    your Liked that aren't in any of the selected playlists.
                ` }
            </TextContainer>,
            selectorComponent,
            orderComponent,
            imageComponent,
        ]
        return renderOp(components, selected.length > 0, run, disable, finish);
    }
}

const TextContainer = styled.p``;
