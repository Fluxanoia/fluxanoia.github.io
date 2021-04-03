import React from "react";
import styled from "styled-components";
import { containerStyling } from "../utils/colours";
import { mainContainerSizeSettings, spacing1, spacing2 } from "../utils/dimensions";

export default function Footer() {
    return (
        <Container>
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
