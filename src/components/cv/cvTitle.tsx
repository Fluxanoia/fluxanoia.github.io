
import React from "react";
import styled from "styled-components";
import { cvColour1 } from "../../utils/colours";
import { cvSpacing1 } from "../../utils/dimensions";
import Divider from "../divider";

export default function CvTitle({ children } : { children : React.ReactNode }) {
    return (
        <TitleContainer>
            <TextContainer>
                { children }
            </TextContainer>
            <Divider colour={cvColour1} />
        </TitleContainer>
    );
}

const TitleContainer = styled.div`
    margin-bottom: ${cvSpacing1};
`;
const TextContainer = styled.h1`
    color: ${cvColour1};
    margin-bottom: 0;
    text-transform: uppercase;
`;
