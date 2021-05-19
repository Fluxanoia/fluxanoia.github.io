import React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Playlist } from "spotify-api.js";
import styled from "styled-components";
import Button from "../components/button";
import Collapse from "../components/collapse";
import FluxifyPlaylist from "../components/fluxify/fluxifyPlaylist";
import { spacing2, ifSuperSmall, spacing1 } from "../utils/dimensions";
import { quantityText } from "../utils/misc";
import { PlaylistData } from "./spotifyPlaylists";

type PlaylistSelectorOptions = {
    title? : string,
}
export default function usePlaylistSelector(
    playlists : Array<Playlist> | null,
    playlistData : PlaylistData | null,
    options? : PlaylistSelectorOptions,
) : [JSX.Element, Array<Playlist>] {
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
    
    const selectAll = useCallback(() => {
        setSelected((playlists ?? []).map(p => p.id));
    }, [playlists, setSelected]);
    const selectNone = useCallback(() => {
        setSelected([]);
    }, [setSelected]);

    const component = useMemo(() => {
        if (!playlists || !playlistData) return <></>;
        return (
            <CollapseContainer 
                title={ (options ?? {}).title ?? `Select Playlists` }
                value={ `${quantityText(selected.length, playlists.length, `playlist`)} selected` }
            >
                <SelectInfoContainer>
                    <SelectTextContainer>
                        { `Listing ${
                            quantityText(playlistData.total, -1, `playlist`)
                        }` }
                    </SelectTextContainer>
                    <SelectButton key="selectAll" onClick={ selectAll }>{ `All` }</SelectButton>
                    <SelectButton key="selectNone" onClick={ selectNone }>{ `None` }</SelectButton>
                </SelectInfoContainer>
                <PlaylistsContainer>
                    { components }
                </PlaylistsContainer>
            </CollapseContainer>
        );
    }, [options, components, selected, playlists, playlistData, selectAll, selectNone])

    const selectedPlaylists = (playlists ?? []).filter((p : Playlist) => isSelected(p.id));
    return [component, selectedPlaylists];
}

const CollapseContainer = styled(Collapse)`
    margin-bottom: ${spacing2};
`;

const PlaylistsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
const SelectInfoContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: ${spacing2} 0;
    padding: 0 ${spacing2};

    ${ifSuperSmall} {
        flex-direction: column;
    }
`;
const SelectTextContainer = styled.div`
    margin-left: ${spacing2};
    margin-right: auto;
    ${ifSuperSmall} {
        margin: ${spacing1} ${spacing2};
    }
`;
const SelectButton = styled(Button)`
    width: 100px;
    margin-right: ${spacing2};
    ${ifSuperSmall} {
        width: 100%;
        margin: ${spacing1} ${spacing2};
    }
`;

