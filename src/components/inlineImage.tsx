import React from "react";
import styled from "styled-components"
import { ifLarge, spacing1, spacing3 } from "../utils/dimensions";
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

const ImageContainer = styled.div<{ side : Side }>`
    float: ${props => props.side};

    width: ${smallWidth};
    ${ifLarge} {
        width: ${largeWidth};
    }

    margin-bottom: ${spacing1};
    margin-${props => flip(props.side)}: ${spacing3};

    img {
        border-radius: 16px;
        width: ${smallWidth};
        ${ifLarge} {
            width: ${largeWidth};
        }
    }
`;
