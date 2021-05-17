import React from "react";
import styled from "styled-components"
import { ifLarge, ifSuperSmall, spacing1, spacing3 } from "../utils/dimensions";
import { flip, Side } from "../utils/types";

type InlineImageProps = {
    path : string;
    alt? : string;
    side? : Side;
}
export default function InlineImage({ path, alt, side } : InlineImageProps) {
    return (
        <ImageContainer side={ side ?? Side.LEFT }>
            <img src={ path } alt={ alt ?? `` }/>
        </ImageContainer>
    );
}

const smallWidth = `200px`;
const largeWidth = `250px`;

const imageSizing = `
    width: ${smallWidth};
    ${ifSuperSmall} {
        width: 100%;
    }
    ${ifLarge} {
        width: ${largeWidth};
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
