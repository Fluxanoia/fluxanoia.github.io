import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import InlineImage from "../components/inlineImage";
import SectionTitle from "../components/sectionTitle";
import { spacing2 } from "../utils/dimensions";
import { Side } from "../utils/types";
import { fluxifyLink } from "./fluxify";
import Page from "./pages";

const helixUrl = `https://github.com/Fluxanoia/Helix`;

const cardmasterWidget = `
    <iframe frameborder="0" src="https://itch.io/embed/718461?dark=true" width="552" height="167">
        <a href="https://fluxanoia.itch.io/cardmaster">
            Cardmaster by Fluxanoia
        </a>
    </iframe>
`;

const legacyCardmasterUrl = `http://www.mediafire.com/file/6m0h776pnl9hr32/Cardmaster_pre0.0.5.zip/file`;
const legacyPulseUrl = `https://www.mediafire.com/file/x2m7ffz9zgq4h9o/Pulse.zip/file`;
const legacyKotsUrl = `http://www.mediafire.com/file/q8ofirq3y8xlxoo/King_of_the_Skies_Package.zip/file`;

export const projectsPage : Page = new Page(Projects, {
    accentColour: "#77e4ff",
    name: "Projects",
    onNavbar: true,
});
export default function Projects() {
    const oldProjectLink = (name : string, url : string) => {
        return (
            <>
                &#8226; &nbsp;
                <a href={ url }>
                    { name }
                </a>
                <br />
            </>
        );
    }

    return (
        <>
            { renderProject(
                `Fluxify`, 
                <>
                    {
                        `This is a Spotify app created to allow for some more niche playlist
                        operations, like getting the songs you've liked that don't exist on
                        any of your playlists, or merging multiple playlists easily. It's hosted `
                    }
                    <Link to={ fluxifyLink }>{ `here` }</Link>
                    {
                        `.`
                    } 
                </>
            ) }
            { renderProject(
                `Chessr`, 
                <>
                    <InlineImage src={ `res/chessr.png` } side={ Side.RIGHT } />
                    {
                        `This is a chess game written in Python with PyGame, it's in
                        its early stages at the moment, but I plan for it to have a
                        whole host of features!
                        It can be found on my `
                    }
                    <a href={ helixUrl }>GitHub</a>
                    {
                        `.`
                    } 
                </>
            ) }
            { renderProject(
                `Helix`, 
                <>
                    {
                        `This is a graphing tool built for education as part of my final-year
                        project. It is written in Python using matplotlib and sympy
                        for plotting and mathematical processing. It can be found on my `
                    }
                    <a href={ helixUrl }>GitHub</a>
                    {
                        `.`
                    } 
                </>
            ) }

            { renderProject(
                `Cardmaster`, 
                `This is a game I'm working on when I can,
                it started out in Java, migrated to C++ with SDL and is now on the
                Godot Engine. The widget below will take you to where it's hosted.`,
                <WidgetContainer dangerouslySetInnerHTML={{ __html: cardmasterWidget }} />
            ) }
            
            { renderProject(
                `www.fluxanoia.co.uk`, 
                `This website is built on React with Typescript and hosted on GitHub Pages.`
            ) }

            { renderProject(
                `Legacy Downloads`, 
                `For nostalgia's sake, here are some links to projects that are no longer being
                worked on:`,
                <TextContainer>
                    { oldProjectLink(`Cardmaster (C++)`, legacyCardmasterUrl) }
                    { oldProjectLink(`Pulse`, legacyPulseUrl) }
                    { oldProjectLink(`King of the Skies`, legacyKotsUrl) }
                </TextContainer>
            ) }
        </>
    );
}

const renderProject = (
    title : string,
    text : string | JSX.Element,
    children? : React.ReactNode
) => (
    <ProjectContainer>
        <SectionTitle accent>
            { title }
        </SectionTitle>
        <TextContainer>
            { text }
        </TextContainer>
        { children ? <Spacer /> : ``}
        <ChildrenContainer>
            { children }
        </ChildrenContainer>
    </ProjectContainer>
);

const WidgetContainer = styled.div`
    display: flex;
    justify-content: center;
    overflow: hidden;
    margin-bottom: ${spacing2};
`;

const ProjectContainer = styled.div`
    margin-bottom: ${spacing2};
`;

const Spacer = styled.div`
    height: ${spacing2};
`;

const ChildrenContainer = styled.div`
    margin: 0 ${spacing2};
`;

const TextContainer = styled.p`
    margin: 0 ${spacing2};
`;
