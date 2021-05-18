import React from "react";
import styled from "styled-components";
import { Image } from "spotify-api.js";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { containerBorderColour, containerColour } from "../../utils/colours";

type SpotifyImageProps = {
    images : Array<Image>,

    id? : string,
    className? : string,
}
export default function SpotifyImage({ id, images, className } : SpotifyImageProps) {
    return (
        images.length === 0 ? (
            <PseudoImage id={ id } className={ className }>
                <PseudoImageIcon color={ containerColour } />
            </PseudoImage>
        ) : (
            <TrueImage id={ id } className={ className } alt={ `` } src={ images[0].url }/>
        )
    );
}

const PseudoImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${containerBorderColour};
`;
const PseudoImageIcon = styled(BsMusicNoteBeamed)`
    width: 40%
    height: auto;
`;
const TrueImage = styled.img``;