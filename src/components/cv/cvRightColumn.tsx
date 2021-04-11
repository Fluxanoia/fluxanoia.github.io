import React from "react";
import styled from "styled-components";
import { cvColour1, cvColour2 } from "../../utils/colours";
import { cvSpacing0, cvSpacing1, cvSpacing3 } from "../../utils/dimensions";
import CvTitle from "./cvTitle";

const languages = [
    `C`,
    `C++`,
    `C#`,
    `CSS`,
    `Haskell`,
    `HTML`,
    `Java`,
    `LaTeX`,
    `R`,
    `React`,
    `Ruby`,
    `Python`,
    `Scratch`,
    `Typescript`,
].sort();

const skills = [
    `Graphic Design`,
    `Computer Building`,
    `Flat-pack Furniture`,
    `Leadership`,
    `Video Games`,
    `Teaching and Outreach`,
    `Organisation`,
    `Longboarding`,
].sort();

const createSection = (title : string, content : string | JSX.Element) => {
    return (
        <>
            <SectionContainer>
                <CvTitle>{ title }</CvTitle>
                { content }
            </SectionContainer>
            <Spacer />
        </>
    );
};

const createIcons = (icons : Array<String>) => {
    return (
        <IconContainer>
            { icons.map((i) => <Icon>{ i }</Icon>) }
        </IconContainer>
    );
};

const createProject = (title : string, content : string) => {
    return (
        <ProjectContainer>
            <ProjectTitle>{ title }</ProjectTitle>
            <ProjectContent>{ content }</ProjectContent>
        </ProjectContainer>
    );
}

export default function CvRightColumn() {
    return (
        <Container>
            { createSection(`About`,
                <p>
                    { 
                        `I started to program back in Year 9, where I taught myself Java. I
                        developed a 2D fighting game over the course of Years 10 and 11, leading
                        me to be the first at my school to ever take a computer science GCSE.
                        I continued creating throughout college and university with a Tetris clone,
                        a raytraced renderer written in C++, a game demo called Cardmaster, and a
                        graphing software called Helix (available on my GitHub).` 
                    }
                    <br /><br />
                    {
                        `I also have a deep interest in teaching, taking part in multiple teaching
                        assistant and tutor roles at my sixth form college and university.`
                    }
                </p>
            )}
            { createSection(`Languages`, createIcons(languages)) }
            { createSection(`Skills and Interests`, createIcons(skills)) }
            { createSection(`Projects`,
                <ProjectsContainer>
                    { createProject(`Helix`, 
                        `This is a graphing tool built for education as part of my final-year
                        project. It is written in Python using matplotlib and sympy
                        for plotting and mathematical processing.`) }
                    { createProject(`fluxanoia.co.uk`, 
                        `This is my personal website, built on React with Typescript and
                        hosted on GitHub pages.`) }
                </ProjectsContainer>
            )}
        </Container>
    );
}

const Container = styled.div`
    height: 100%;
`;
const Spacer = styled.div`
    height: ${cvSpacing3};
`;

const SectionContainer = styled.div`
    margin-bottom: ${cvSpacing1};
`;

const IconContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
const Icon = styled.div`
    margin: 1px;
    padding: 1px ${cvSpacing1};
    border-style: solid;
    border-color: ${cvColour1};
    border-width: ${cvSpacing0};
    border-radius: 8px;
`;

const ProjectsContainer = styled.div``;
const ProjectContainer = styled.div``;
const ProjectTitle = styled.h3`
    color: ${cvColour2};
    margin-bottom: ${cvSpacing1};
`;
const ProjectContent = styled.p`
    margin-left: ${cvSpacing3};
`;
