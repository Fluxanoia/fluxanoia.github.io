import React from "react";
import styled from "styled-components";
import { spacing2 } from "../utils/dimensions";
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

export const teelaiPage : Page = new Page(Teelai, {
    accentColour: "#E05263",
    name: "Teelai",
});
export default function Teelai() {
    return (
        <WidgetContainer dangerouslySetInnerHTML={{ __html: playlistWidget }} />
    );
}

const WidgetContainer = styled.div`
    margin: ${spacing2};
`;