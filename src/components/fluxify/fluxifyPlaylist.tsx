import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Playlist } from "spotify-api.js";
import styled from "styled-components";
import { ifSmall, spacing1, spacing2 } from "../../utils/dimensions";
import SpotifyImage from "./fluxifyImages";

const imageId = "image";
const titleId = "title";
const checkId = "check";

export default function FluxifyPlaylist(
    playlist : Playlist,
    selected : boolean,
    onClick : (id : string, selected : boolean) => void
) {
    return (
        <PlaylistContainer 
            key={ playlist.id }
            onClick={ () => onClick(playlist.id, !selected) }
        >
            <LayerContainer>
                <Image id={ imageId } images={ playlist.images }/>
                <TitleLayer id={ titleId }>
                    <Title>
                        { playlist.name }
                    </Title>
                </TitleLayer>
                <CheckLayer id={ checkId }>
                    <Check selected={ selected }/>
                </CheckLayer>
            </LayerContainer>
        </PlaylistContainer>
    );
}

const sizing = `
    width: 150px;
    height: 150px;
    ${ifSmall} {
        width: 100px;
        height: 100px;
    }
`;
const layering = `position: absolute;`;

const Sized = styled.div`${sizing}`;
const LayerContainer = styled(Sized)`position: relative;`;
const Layer = styled(Sized)`${layering}`;

const PlaylistContainer = styled(Sized)`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-left: ${spacing1};
    margin-right: ${spacing1};
    margin-bottom: ${spacing2};
    padding: ${spacing1};

    cursor: pointer;

    #${imageId} {
        filter: none;
        transition: filter 0.25s;
    }
    &:hover #${imageId} {
        filter: brightness(30%) drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.4));
    }
    #${titleId} {
        opacity: 0;
        transition: opacity 0.25s;
    }
    &:hover #${titleId} {
        opacity: 1;
    }
`;

const Image = styled(SpotifyImage)`
    ${sizing}
    ${layering}
`;

const TitleLayer = styled(Layer)`
    display: flex;
    justify-content: center;
    align-items: center;    
    overflow: hidden;
`;
const Title = styled.div`
    text-align: center;
`;

const CheckLayer = styled(Layer)`
    display: flex;
    justify-content: flex-end;
`;
const Check = styled(AiFillCheckCircle)<{ selected : boolean }>`
    margin-top: ${spacing1};
    margin-right: ${spacing1};

    ${props => props.selected ? `
        opacity: 1;
        transform: scale(1);
    ` : `
        opacity: 0;
        transform: scale(1.5) rotate(180deg);
    `}
    transition: opacity 0.1s, transform 0.25s;
    
    filter: drop-shadow(0px 0px 6px #000000);
`;