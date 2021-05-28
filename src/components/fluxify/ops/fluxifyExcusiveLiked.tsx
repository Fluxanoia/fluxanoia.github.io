import { shuffle } from "lodash";
import React from "react";
import styled from "styled-components";
import useOptionSelector, { Option, BooleanOptionComponent, BooleanOptionNextValue } from "../../../hooks/optionsSelector";
import usePlaylistImageSelector from "../../../hooks/playlistImageSelector";
import usePlaylistSelector from "../../../hooks/playlistSelector";
import { getLoadingError, useError } from "../../../hooks/spotifyError";
import useSpotifyPlaylists from "../../../hooks/spotifyPlaylists";
import { createPlaylist, loadAllTracks, loadLiked, addToPlaylist } from "../../../utils/spotify";
import FluxifyLoading from "../fluxifyLoading";
import FluxifyOp, { FluxifyOpProps, renderOp, useErrorAggregator } from "./fluxifyOp";

const shuffleOption : Option<boolean> = {
    key: `shuffle`,
    name: `Shuffle`,
    def: false,
    getNextValue: BooleanOptionNextValue,
    component: BooleanOptionComponent,
};
const optionInfo : Array<Option<any>> = [shuffleOption];

const opName = `ExclusivelyLiked`;
const opDesc = `Find exclusively liked songs`;
export const exclusiveLikedOp = new FluxifyOp(opName, opDesc, FluxifyExclusiveLiked);
export default function FluxifyExclusiveLiked({
    token,
    client,
    throwGlobalError,
    disable,
    finish,
} : FluxifyOpProps) {
    const [playlists, metadata, loaded, playlistError] = useSpotifyPlaylists(token, client);
    const [selectorComponent, selected] = usePlaylistSelector('playlists', playlists, metadata);
    const [optionsComponent, options] = useOptionSelector('options', optionInfo);
    const [imageComponent, imageColour] = usePlaylistImageSelector('image');
    const [localError, throwError] = useError();
    const hasError = useErrorAggregator(throwGlobalError, [localError, playlistError])

    const run = async () => {
        const newPlaylist = await createPlaylist(client, throwError, opName,
            `gets the exclusive liked songs w.r.t.: ${selected.map(p => p.name).join(`, `)}`,
            imageColour
        );
        if (!newPlaylist) return false;
        const likedTracks = await loadLiked(client, throwError);
        if (!likedTracks) return false;
        const playlistTracks = await loadAllTracks(client, selected, throwError);
        if (!playlistTracks) return false;
        let exclusives = [];
        const trackUris = new Set(playlistTracks.map(t => t.track.uri));
        const likedUris = new Set(likedTracks.items.map(t => t.track.uri));
        for (const liked of likedUris) {
            if (!trackUris.has(liked)) exclusives.push(liked);
        }
        if (options[shuffleOption.key]) exclusives = shuffle(exclusives);
        return await addToPlaylist(newPlaylist, exclusives, throwError);
    };

    if (hasError) {
        return <FluxifyLoading />;
    } else if (loaded) {
        if (!playlists) {
            throwError(getLoadingError(opName));
            return <FluxifyLoading />;
        }
        const components = [
            <TextContainer key={ `description `}>
                { `
                    This operation will create a new playlist consisting of the songs in
                    your Liked that aren't in any of the selected playlists.
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
