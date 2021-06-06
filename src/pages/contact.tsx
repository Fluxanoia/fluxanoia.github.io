import React from "react";
import styled from "styled-components";
import { FiAtSign } from "react-icons/fi";
import { spacing2 } from "../utils/dimensions";
import Page from "./pages";

export const contactMePage : Page = new Page(ContactMe, {
    accentColour: "#47d87c",
    name: "Contact",
    onNavbar: true,
});
export default function ContactMe() {
    return (
        <TextContainer>
            You can write to me via <span className={ `accent` }>
                contact
            </span> <AtSignWrapper>
                <AtSign />
            </AtSignWrapper> <span className={ `accent` }>
                fluxanoia.co.uk
            </span>.
        </TextContainer>
    );
}

const TextContainer = styled.p`
    text-align: center;
    margin-top: ${spacing2};
    margin-bottom: ${spacing2};
`;

const AtSignWrapper = styled.span`
    display: inline-block;
`;
const AtSign = styled(FiAtSign)`
    margin-bottom: -4px;
`;
