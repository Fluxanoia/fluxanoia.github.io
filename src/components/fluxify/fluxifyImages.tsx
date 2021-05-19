import React from "react";
import styled from "styled-components";
import { Image } from "spotify-api.js";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { containerBorderColour, containerColour } from "../../utils/colours";
import { DivProps } from "../../utils/types";

type SpotifyImageProps = {
    images : Array<Image>,
} & DivProps;
export default function SpotifyImage(props : SpotifyImageProps) {
    const { images, ...otherProps } = props;
    return (
        images.length === 0 ? (
            <PseudoImage {...otherProps}>
                <PseudoImageIcon color={ containerColour } />
            </PseudoImage>
        ) : (
            <TrueImage src={ images[0].url } alt={ `` } {...otherProps}/>
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