import React from "react";
import styled from "styled-components";
import { spacing2 } from "../utils/dimensions";
import Page from "./pages";

export const discordPage : Page = new Page(Discord, {
    accentColour: "#949fff",
    name: "Discord",
});
export default function Discord() {
    return (
        <TextContainer>
            The Teelai Association Discord server can be accessed via the 
            link <a href="https://discord.gg/ZfQn768">here</a>.
        </TextContainer>
    );
}

const TextContainer = styled.p`
    text-align: center;
    margin-top: ${spacing2};
    margin-bottom: ${spacing2};
`;