import { useCallback, useEffect, useState } from "react";
import { Playlist } from "spotify-api.js";
import FluxifyPlaylist from "../components/fluxify/fluxifyPlaylist";
import { PlaylistData } from "./spotifyPlaylists";

export default function useFluxifyPlaylists(
    playlists : Array<Playlist> | null,
    playlistData : PlaylistData | null,
) : [Array<JSX.Element>, Array<Playlist>, () => void, () => void] {
    const [components, setComponents] = useState<Array<JSX.Element>>([]);
    const [selected, setSelected] = useState<Array<string>>([]);

    const isSelected = useCallback((checkId : string) => {
        return selected.some((id : string) => checkId === id);
    }, [selected]);
    const updateSelected = useCallback((newId : string, isSelected : boolean) => {
        if (isSelected) {
            setSelected(selected.concat([newId]));
        } else {
            setSelected(selected.filter((id : string) => id !== newId));
        }
    }, [selected, setSelected]);

    useEffect(() => {
        setComponents((playlists ?? [])
            .map((p : Playlist) => FluxifyPlaylist(p, isSelected(p.id), updateSelected)));
    }, [playlists, setComponents, selected, isSelected, updateSelected])
    
    const selectedPlaylists = (playlists ?? []).filter((p : Playlist) => isSelected(p.id));
    const selectAll = useCallback(() => {
        setSelected((playlists ?? []).map(p => p.id));
    }, [playlists, setSelected]);
    const selectNone = useCallback(() => {
        setSelected([]);
    }, [setSelected]);
    return [components, selectedPlaylists, selectAll, selectNone];
}