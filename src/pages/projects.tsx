import React from "react";
import styled from "styled-components";
import SectionTitle from "../components/sectionTitle";
import { spacing2 } from "../utils/dimensions";
import Page from "./pages";

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
                `Helix`, 
                `This is a graphing software, built for education as
                part of my final-year project. It is being written in Python.`
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

const renderProject = (title : string, text : string, children? : React.ReactNode) => (
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
