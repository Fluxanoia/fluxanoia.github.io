import React from "react";
import styled from "styled-components";
import { spacing2, spacing4 } from "../utils/dimensions";
import Page from "./pages";

const playlistWidget = `
    <iframe src="https://open.spotify.com/embed/playlist/3MER32HK7y9bTcUFbTHZ13"
        width="100%"
        height="400"
        frameborder="0"
        allowtransparency="true"
        allow="encrypted-media">
    </iframe>
`;

export const discordPage : Page = new Page(Discord, {
    accentColour: "#949fff",
    name: "Discord",
});
export default function Discord() {
    return (
        <>
            <TextContainer>
                The Teelai Association Discord server can be accessed via the 
                link <a href="https://discord.gg/ZfQn768">here</a>.
            </TextContainer>
            <WidgetContainer dangerouslySetInnerHTML={{ __html: playlistWidget }} />
        </>
    );
}

const TextContainer = styled.p`
    text-align: center;
    margin-top: ${spacing2};
    margin-bottom: ${spacing2};
`;

const WidgetContainer = styled.div`
    margin-top: ${spacing4};
    margin-left: ${spacing2};
    margin-right: ${spacing2};
`;