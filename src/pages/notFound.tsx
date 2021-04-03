import React from "react";
import styled from "styled-components";
import { spacing2 } from "../utils/dimensions";
import Page from "./pages";

export const notFoundPage : Page = new Page(NotFound, {
    accentColour: "#9c9c9c",

    name: "NotFound",
    link: "",

    notFound: true,
});
export default function NotFound() {
    return ( 
        <TextContainer>
            Oops, did you take a wrong turn? <br />
            We couldn't find anything at this URL.
        </TextContainer>
    );
}

const TextContainer = styled.p`
    text-align: center;
    margin-top: ${spacing2};
    margin-bottom: ${spacing2};
`;
