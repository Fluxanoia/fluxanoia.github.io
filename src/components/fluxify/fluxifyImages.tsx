import React from "react";
import styled from "styled-components";
import { Image } from "spotify-api.js";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { containerColour, textColour } from "../../utils/colours";

type ImageOptions = {
    sizingCss? : string,
    rounded? : boolean,
}
export const getSpotifyImage = (images : Array<Image>, options? : ImageOptions) => {
    options = options ?? {};
    return (
        images.length === 0 ? (
            <PseudoImageContainer {...options}>
                <BsMusicNoteBeamed color={ containerColour } />
            </PseudoImageContainer>
        ) : (
            <ImageContainer src={ images[0].url } {...options}/>
        )
    );
}
const getImageStyling = (options : ImageOptions) => {
    return (`
        ${ options.sizingCss ?? `
            width: 64px;
            height: 64px;
        ` }
        
        ${ options.rounded ? `border-radius: 16px;` : `` }
    `);
}
const PseudoImageContainer = styled.div<ImageOptions>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${textColour};
    ${ props => getImageStyling(props) }
`;
const ImageContainer = styled.img<ImageOptions>`${ props => getImageStyling(props) }`;