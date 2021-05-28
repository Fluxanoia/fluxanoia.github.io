import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Image, Playlist } from "spotify-api.js";
import styled from "styled-components";
import { ifSmall, spacing1, spacing2 } from "../../utils/dimensions";
import { clearButtonStyling } from "../../utils/globalStyling";
import SpotifyImage from "./fluxifyImages";

const imageId = "image";
const titleId = "title";
const checkId = "check";

export type LikedSongs = {
    collaborative : boolean,
    description : string, 
    id : string,
    images : Array<Image>,
    name : string,
    public : boolean,
} 
export const LikedSongsPlaylist : LikedSongs = {
    collaborative: false,
    description: ``, 
    id: `likedSongs`,
    images: [],
    name: `Liked Songs`,
    public: false,
};

export default function FluxifyPlaylist(
    playlist : Playlist | LikedSongs,
    selected : boolean,
    onClick : (id : string, selected : boolean) => void,
) {
    return (
        <PlaylistContainer 
            key={ playlist.id }
            onClick={ () => onClick(playlist.id, !selected) }
        >
            <LayerContainer>
                <ImageLayer>
                    <ImageElement
                        id={ imageId }
                        liked={ !(playlist instanceof Playlist) }
                        images={ playlist.images }
                    />
                </ImageLayer>
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

const largeSize = `150px`;
const smallSize = `100px`;
const sizing = `
    width: ${largeSize};
    height: ${largeSize};
    ${ifSmall} {
        width: ${smallSize};
        height: ${smallSize};
    }
`;
const layering = `position: absolute;`;

const Sized = styled.div`${sizing}`;
const LayerContainer = styled(Sized)`
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
`;
const Layer = styled(Sized)`
    ${layering}
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
`;

const PlaylistContainer = styled.button`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    ${clearButtonStyling}

    ${sizing}
    margin-left: ${spacing1};
    margin-right: ${spacing1};
    margin-bottom: ${spacing2};

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

const ImageLayer = styled(Layer)`
    display: flex;
    justify-content: center;
    align-items: center;   
`;
const ImageElement = styled(SpotifyImage)`
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
    max-height: ${largeSize};
    ${ifSmall} {
        max-height: ${smallSize};
    }
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