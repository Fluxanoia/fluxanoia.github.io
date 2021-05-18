import React from "react";
import styled from "styled-components"
import { ifLarge, ifSuperSmall, spacing1, spacing3 } from "../utils/dimensions";
import { flip, Side } from "../utils/types";

type InlineImageProps = {
    path : string,
    alt? : string,
    side? : Side,

    className? : string,
}
export default function InlineImage({ path, alt, side, className } : InlineImageProps) {
    return (
        <ImageContainer className={ className } side={ side ?? Side.LEFT }>
            <img src={ path } alt={ alt ?? `` }/>
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

    img {
        border-radius: 16px;
        ${imageSizing}
    }
`;
