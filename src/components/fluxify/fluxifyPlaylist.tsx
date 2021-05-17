import React, { useCallback, useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Playlist } from "spotify-api.js";
import styled from "styled-components";
import { PlaylistData } from "../../hooks/spotifyPlaylists";
import { ifSmall, spacing1, spacing2 } from "../../utils/dimensions";
import { getSpotifyImage } from "./fluxifyImages";

export default function useFluxifyPlaylists(
    playlists : Array<Playlist> | null,
    playlistData : PlaylistData | null,
) : [Array<JSX.Element>, Array<Playlist>] {
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
    return [components, selectedPlaylists];
}

const imageId = "image";
const infoId = "info";
const sizing = `
    width: 150px;
    height: 150px;
    ${ifSmall} {
        width: 100px;
        height: 100px;
    }
`;

const FluxifyPlaylist = (
    playlist : Playlist,
    selected : boolean,
    onClick : (id : string, selected : boolean) => void
) => {
    return (
        <PlaylistContainer 
            key={ playlist.id }
            onClick={ () => onClick(playlist.id, !selected) }
        >
            <ImageContainer id={ imageId }>
                { getSpotifyImage(playlist.images, { sizingCss: sizing }) }
            </ImageContainer>
            <PlaylistTitleContainer id={ infoId }>
                <PlaylistTitle>
                    { playlist.name }
                </PlaylistTitle>
            </PlaylistTitleContainer>
            <SelectCheckContainer selected={ selected }>
                <SelectCheck />
            </SelectCheckContainer>
        </PlaylistContainer>
    );
}

const PlaylistContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    ${sizing}
    margin-left: ${spacing1};
    margin-right: ${spacing1};
    margin-bottom: ${spacing2};
    padding: ${spacing1};

    cursor: pointer;
    overflow: hidden;

    &:hover {
        #${imageId} {
            filter: brightness(30%) drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.4));
        }
        
        #${infoId} {
            opacity: 1;
        }
    }
`;
const ImageContainer = styled.div`
    ${sizing}

    filter: none;
    transition: filter 0.25s;
`;

const SelectCheckContainer = styled.div<{ selected : boolean }>`
    display: ${props => props.selected ? `flex` : `none` };
    justify-content: flex-end;

    ${sizing}

    position: absolute;
`;
const SelectCheck = styled(AiFillCheckCircle)`
    margin-top: ${spacing1};
    margin-right: ${spacing1};
    
    filter: drop-shadow(0px 0px 6px #000000);
`;

const PlaylistTitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    

    ${sizing}

    opacity: 0;
    transition: opacity 0.25s;

    position: absolute;
    overflow: hidden;
`;
const PlaylistTitle = styled.div`
    text-align: center;
`;