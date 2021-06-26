import React from "react";
import styled from "styled-components";
import { usePlaylistSelector } from "../../../hooks/elementSelector";
import usePlaylistImageSelector from "../../../hooks/playlistImageSelector";
import usePlaylistOrderSelector from "../../../hooks/playlistOrderSelector";
import { useError } from "../../../hooks/spotifyError";
import { addToPlaylist, createPlaylist, loadAllTracks, reorderTracks } from "../../../utils/spotify";
import FluxifyLoading from "../fluxifyLoading";
import FluxifyOp, { FluxifyOpProps, renderOp, useErrorAggregator } from "./fluxifyOp";

const opName = `Merge`;
const opDesc = `Merge playlists`;
export const mergeOp = new FluxifyOp(opName, opDesc, FluxifyMerge);
export default function FluxifyMerge({
    data,
    throwGlobalError,
    disable,
    finish,
} : FluxifyOpProps) {
    const { client, playlists } = data;
    const [selectorComponent, selected] = usePlaylistSelector('playlists', playlists, {
        includeLiked: true,
    });
    const [orderComponent, orderMetric, distinct] = usePlaylistOrderSelector('order', { 
        showDistinct: true,
    });
    const [imageComponent, imageColour] = usePlaylistImageSelector('image');
    const [localError, throwError] = useError();
    const hasError = useErrorAggregator(throwGlobalError, [localError])

    const run = async () => {
        const newPlaylist = await createPlaylist(client, throwError, opName,
            `merges: ${selected.map(p => p.name).join(`, `)}`,
            imageColour
        );
        if (!newPlaylist) return false;
        const tracks = await loadAllTracks(client, selected, throwError);
        if (!tracks) return false;
        const orderedTracks = reorderTracks(tracks, orderMetric, distinct);
        return await addToPlaylist(newPlaylist, orderedTracks.map(t => t.uri), throwError);
    };

    if (hasError) {
        return <FluxifyLoading />;
    } else {
        const components = [
            <TextContainer key={ `description` }>
                { `
                    This operation will create a new playlist which contains all the
                    selected playlists.
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
