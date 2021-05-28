import React from "react";
import { Artist, SpotifyURI, Track } from "spotify-api.js";
import styled from "styled-components";
import { usePlaylistSelector } from "../../../hooks/elementSelector";
import usePlaylistImageSelector from "../../../hooks/playlistImageSelector";
import { getLoadingError, useError } from "../../../hooks/spotifyError";
import useSpotifyPlaylists from "../../../hooks/spotifyPlaylists";
import { createPlaylist, loadAllTracks, addToPlaylist } from "../../../utils/spotify";
import FluxifyLoading from "../fluxifyLoading";
import FluxifyOp, { FluxifyOpProps, renderOp, useErrorAggregator } from "./fluxifyOp";

const opName = `AutoArtistPlaylists`;
const opDesc = `Automatically generate artist playlists`;
export const autoArtistPlaylistsOp = new FluxifyOp(opName, opDesc, FluxifyAutoArtistPlaylists);
export default function FluxifyAutoArtistPlaylists({
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
    const [imageComponent, imageColour] = usePlaylistImageSelector('image');
    const [localError, throwError] = useError();
    const hasError = useErrorAggregator(throwGlobalError, [localError, playlistError])

    const run = async () => {
        const rawTracks = await loadAllTracks(client, selected, throwError);
        if (!rawTracks) return false;
        const tracks : Set<{ uri : SpotifyURI, artists : Array<Artist> }> = new Set(
            rawTracks.map(t => t.track)
                     .filter(t => t instanceof Track)
                     .map(t => { return {
                        uri: t.uri,
                        artists: (t as Track).artists,
                     }})
        );
        let directory : { [key : string] : { artist : Artist, tracks : Array<SpotifyURI> } } = {}
        for (const t of tracks) {
            for (const a of t.artists) {
                if (a.id in directory) {
                    directory[a.id].tracks.push(t.uri);
                } else {
                    directory[a.id] = {
                        artist: a,
                        tracks: [t.uri],
                    };
                }
            }
        }
        for (const a_id in directory) {
            if (directory[a_id].tracks.length > 9) {
                const a_name = directory[a_id].artist.name;
                const newPlaylist = await createPlaylist(client, throwError, `Auto-${a_name}`,
                    `collates songs by ${a_name}.`,
                    imageColour
                );
                if (!newPlaylist) return false;
                const result = await addToPlaylist(newPlaylist, directory[a_id].tracks, throwError);
                if (!result) return false;
            }
        }
        return true;
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
                    This operation will get all the artists featuring in the selected playlists and
                    for each one that appears frequently, it will produce a playlist for that
                    artist.
                ` }
            </TextContainer>,
            selectorComponent,
            imageComponent,
        ]
        return renderOp(components, selected.length > 0, run, disable, finish);
    } else {
        return <FluxifyLoading />;
    }
}

const TextContainer = styled.p``;
