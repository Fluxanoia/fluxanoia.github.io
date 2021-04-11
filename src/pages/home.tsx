import React from "react";
import styled from "styled-components";
import InlineImage from "../components/inlineImage";
import Page from "./pages";

export const homePage : Page = new Page(Home, {
    accentColour: "#ff9dd9",

    name: "Home",
    link: "/",

    onNavbar: true,
    home: true,
});
export default function Home() {
    return (
        <TextContainer>
            <InlineImage path={ `res/me.png` } />
            I'm Tyler, a final-year Maths and Computer Scientist at the University of Bristol.
            This website is the home of my various programming projects. <br/><br/>
            I am currently working on my third-year project with
            Cardmaster on the backburner (more details on the projects page).
        </TextContainer>
    );
};

const TextContainer = styled.p``;
