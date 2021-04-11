import React from "react";
import { AiFillCalendar } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import styled from "styled-components";
import { cvColour2 } from "../../utils/colours";
import { cvSpacing1, cvSpacing2, cvSpacing3 } from "../../utils/dimensions";
import CvLightDivider from "./cvLightDivider";
import CvTitle from "./cvTitle";

const createEntry = (
    title : string,
    time : string,
    location : string,
    content : string | JSX.Element,
) => {
    return (
        <EntryContainer>
            <EntryTitle>{ title }</EntryTitle>
            <EntryIconContainer>
                <EntryIcon>
                    <AiFillCalendar /> &nbsp; <span className="a">{ time }</span>
                </EntryIcon>
                <EntryIcon>
                    <FiMapPin /> &nbsp; <span className="a">{ location }</span>
                </EntryIcon>
            </EntryIconContainer>
            <EntryTextContainer>
                { content }
            </EntryTextContainer>
        </EntryContainer>
    );
}


export default function CvLeftColumn() {
    return (
        <Container>
            <CvTitle>Education</CvTitle>
            { createEntry(
                `Maths and Computer Science (BSc)`,
                `2018 to 2021`,
                `University of Bristol`,
                `I am currently in my third and final year with a 79% grade average in my January 
                examinations, and a 81% grade average over second year.
                I have specialised in pure maths and practical computer science
                with units like Linear Algebra 2 (97%), Group Theory (78%), Imperative and Object 
                Oriented Programming (81%), and Computer Graphics (84%). 
                However, I have also taken some theoretical computer science units, like 
                Language Engineering (unassessed) and Types and Lambda
                Calculus (75%).`
            )}
            <CvLightDivider />
            { createEntry(
                `A Levels`,
                `2016 to 2018`,
                `King's College London Maths School`,
                `I left with the grades A*A*A in Maths, Further Maths, and Physics, as well
                as an A in AS Computer Science.`
            )}
            <Spacer />
            <CvTitle>Experience</CvTitle>
            { createEntry(
                `Software Developer Intern at Ghyston`,
                `August 2020 and March 2021`,
                `University of Bristol`,
                `Over the course of the internship, we built a fantasy NBA league single-page
                app in pairs using React with Typescript, SQL, and C#. Users could input bets with
                virtual currency and view their current/projected scores on the global leaderboards
                or create their own subsets of player groups called leagues. In March of 2021,
                I returned for a week, working on issues with their website. I fixed bugs with
                Internet Explorer 11 and prototyped a smart header to assist navigation on
                longer pages.`
            )}
            <CvLightDivider />
            { createEntry(
                `Academic Tutor`,
                `October 2020 to June 2021`,
                `University of Bristol`,
                `I support two groups of first year computer scientists as a tutor, going through
                weekly problem sheets and taking questions about the course and its content.
                This opportunity has developed my independence, leadership, and my 
                ability to convey ideas to other people in an easily digestable way.`
            )}
            <CvLightDivider />
            { createEntry(
                `Open Day Steward`,
                `June 2019 to September 2021`,
                `University of Bristol`,
                `I worked three separate days across June and September helping the University
                run open days, directing people to where they wanted to be and offering advice
                on my experiences. This was a great help in developing my people skills.`
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

const EntryContainer = styled.div`
    margin-bottom: ${cvSpacing1};
`;
const EntryTitle = styled.h3`
    color: ${cvColour2};
    margin-bottom: ${cvSpacing1};
`;
const EntryIconContainer = styled.div`
    display: flex;
    margin-bottom: ${cvSpacing2};
`;
const EntryIcon = styled.div`
    display: flex;
    flex: 1 1 0;
    svg {
        align-self: center;
    }
`;
const EntryTextContainer = styled.div`
    margin-left: ${cvSpacing3};
`;
