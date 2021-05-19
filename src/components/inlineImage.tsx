import React from "react";
import styled from "styled-components"
import { ifLarge, ifSuperSmall, spacing1, spacing3 } from "../utils/dimensions";
import { flip, ImgProps, Side } from "../utils/types";

type InlineImageProps = {
    side? : Side,
} & ImgProps;
export default function InlineImage(props : InlineImageProps) {
    const { className, ...otherProps } = props;
    return (
        <ImageContainer className={ className } side={ props.side ?? Side.LEFT }>
            <Image {...otherProps}/>
        </ImageContainer>
    );
}

const imageSizing = `
    ${ifSuperSmall} {
        width: 100%;
    }
    width: 200px;
    ${ifLarge} {
        width: 250px;
    }
`;
const ImageContainer = styled.span<{ side : Side }>`
    float: ${props => props.side};

    ${imageSizing}

    margin-bottom: ${spacing1};
    margin-${props => flip(props.side)}: ${spacing3};
`;
const Image = styled.img`
    width: 100%;
    border-radius: 16px;
`;
