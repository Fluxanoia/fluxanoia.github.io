import React from "react";
import styled from "styled-components";
import { Image } from "spotify-api.js";
import { FaHeart } from "react-icons/fa";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { containerBorderColour, containerColour } from "../../utils/colours";
import { DivProps } from "../../utils/types";
import { spacing4 } from "../../utils/dimensions";

type SpotifyImageProps = {
    images : Array<Image>,
    liked? : boolean,
} & DivProps;
export default function SpotifyImage(props : SpotifyImageProps) {
    const { images, liked, ...otherProps } = props;
    const PseudoComponent = liked ? LikedImageIcon : PseudoImageIcon;
    return (
        images.length === 0 ? (
            <PseudoImage {...otherProps}>
                <PseudoComponent color={ containerColour } />
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
const LikedImageIcon = styled(FaHeart)`
    width: ${spacing4};
    height: ${spacing4};
`;
const PseudoImageIcon = styled(BsMusicNoteBeamed)`
    width: ${spacing4};
    height: ${spacing4};
`;
const TrueImage = styled.img``;