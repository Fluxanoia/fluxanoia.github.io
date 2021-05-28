import { shuffle, uniqBy } from "lodash";
import React from "react";
import styled from "styled-components";
import { usePlaylistSelector } from "../../../hooks/elementSelector";
import useOptionSelector, { BooleanOptionComponent, BooleanOptionNextValue, Option } from "../../../hooks/optionsSelector";
import usePlaylistImageSelector from "../../../hooks/playlistImageSelector";
import { getLoadingError, useError } from "../../../hooks/spotifyError";
import useSpotifyPlaylists from "../../../hooks/spotifyPlaylists";
import { addToPlaylist, createPlaylist, loadAllTracks } from "../../../utils/spotify";
import FluxifyLoading from "../fluxifyLoading";
import FluxifyOp, { FluxifyOpProps, renderOp, useErrorAggregator } from "./fluxifyOp";

const distinctOption : Option<boolean> = {
    key: `distinct`,
    name: `Remove duplicates`,
    def: true,
    getNextValue: BooleanOptionNextValue,
    component: BooleanOptionComponent,
};
const shuffleOption : Option<boolean> = {
    key: `shuffle`,
    name: `Shuffle`,
    def: false,
    getNextValue: BooleanOptionNextValue,
    component: BooleanOptionComponent,
};
const optionInfo : Array<Option<any>> = [distinctOption, shuffleOption];

const opName = `Merge`;
const opDesc = `Merge playlists`;
export const mergeOp = new FluxifyOp(opName, opDesc, FluxifyMerge);
export default function FluxifyMerge({
    token,
    client,
    throwGlobalError,
    disable,
    finish,
} : FluxifyOpProps) {
    const [playlists, loaded, playlistError] = useSpotifyPlaylists(token, client);
    const [selectorComponent, selected] = usePlaylistSelector('playlists', playlists, {
        includeLiked: true,
    });
    const [optionsComponent, options] = useOptionSelector('options', optionInfo);
    const [imageComponent, imageColour] = usePlaylistImageSelector('image');
    const [localError, throwError] = useError();
    const hasError = useErrorAggregator(throwGlobalError, [localError, playlistError])

    const run = async () => {
        const newPlaylist = await createPlaylist(client, throwError, opName,
            `merges: ${selected.map(p => p.name).join(`, `)}`,
            imageColour
        );
        if (!newPlaylist) return false;
        const tracks = await loadAllTracks(client, selected, throwError);
        if (!tracks) return false;
        let trackUris = tracks.map(t => t.track.uri);
        if (options[distinctOption.key]) trackUris = uniqBy(trackUris, t => t);
        if (options[shuffleOption.key]) trackUris = shuffle(trackUris);
        return await addToPlaylist(newPlaylist, trackUris, throwError);
    };

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
                    This operation will create a new playlist which contains all the
                    selected playlists.
                ` }
            </TextContainer>,
            selectorComponent,
            optionsComponent,
            imageComponent,
        ]
        return renderOp(components, selected.length > 0, run, disable, finish);
    } else {
        return <FluxifyLoading />;
    }
}

const TextContainer = styled.p``;
