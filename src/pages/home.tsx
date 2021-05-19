import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InlineImage from "../components/inlineImage";
import { fluxifyLink } from "./fluxify";
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
            {
                `I'm Tyler, a final-year Maths and Computer Scientist at the University of Bristol.
                This website is the home of my various programming projects.`
            } <br/><br/> {
                `I am currently finishing my degree and tinkering with various
                projects, like a `
            } <Link to={ fluxifyLink }>{ `Spotify app` }</Link> { 
                ` that has some more niche playlist functions, and a chess game written in Python
                (more details on the projects page).`
            }
        </TextContainer>
    );
};

const TextContainer = styled.p``;
