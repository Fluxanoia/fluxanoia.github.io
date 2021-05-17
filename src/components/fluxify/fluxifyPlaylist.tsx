import React from "react";
import { Playlist } from "spotify-api.js";
import styled from "styled-components";
import { ifSmall, spacing1, spacing2 } from "../../utils/dimensions";
import { getSpotifyImage } from "./fluxifyImages";

const sizing = `
    width: 150px;
    height: 150px;
    ${ifSmall} {
        width: 100px;
        height: 100px;
    }
`;

const imageId = "image";
const infoId = "info";

export default function FluxifyPlaylist(playlist : Playlist) {
    return (
        <PlaylistContainer key={ playlist.id }>
            <ImageContainer id={ imageId }>
                { getSpotifyImage(playlist.images, { sizingCss: sizing }) }
            </ImageContainer>
            <PlaylistInfo id={ infoId }>
                <TextContainer>
                    { playlist.name }
                </TextContainer>
            </PlaylistInfo>
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
const PlaylistInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;    

    ${sizing}

    opacity: 0;
    transition: opacity 0.25s;

    position: absolute;
    overflow: hidden;
`;
const TextContainer = styled.div`
    text-align: center;
`;