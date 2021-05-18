import React from "react";
import styled from "styled-components";
import { containerStyling } from "../utils/colours";
import { mainContainerSizeSettings, spacing1, spacing2 } from "../utils/dimensions";
import { StyledProps } from "../utils/types";

export default function Footer({ className } : StyledProps) {
    return (
        <Container className={ className }>
            <TextContainer>
                Copyright © 2021 Fluxanoia
            </TextContainer>
        </Container>
    );
}

const Container = styled.div`
    ${containerStyling}
    ${mainContainerSizeSettings}
    text-align: center;
    margin-bottom: ${spacing2};
`;

const TextContainer = styled.p`
    margin: ${spacing1} 0;
`;
