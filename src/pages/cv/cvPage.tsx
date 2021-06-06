import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Collapse, { CollapseProps } from "../../components/collapse";
import { spacing1, spacing2, spacing3, spacing4 } from "../../utils/dimensions";
import Page from "../pages";
import { cvFilePath } from "./cvTyler";

export const cvPage : Page = new Page(Cv, {
    accentColour: "#ca89ff",
    name: "CV",
    onNavbar: true,
});
export default function Cv() {
    const bulleted = (text : string) => (<>&#8226; &nbsp; { text } <br /></>);

    const renderRecord = (
        title : string,
        timeAndLocation : string,
        description : string,
        children? : React.ReactNode,
    ) => {
        return ( 
            <RecordContainer>
                <RecordTitleContainer>
                    &#8226; &nbsp;
                    <RecordTitleTextContainer className="accent">
                        { title }
                    </RecordTitleTextContainer>
                </RecordTitleContainer>
                <TimeAndLocationContainer>
                    { timeAndLocation }
                </TimeAndLocationContainer>
                <RecordContentContainer>
                    <RecordTextContainer>
                        { description }
                    </RecordTextContainer>
                    { children }
                </RecordContentContainer>
            </RecordContainer>
        );
    }

    return (
        <>
            <TextContainer>
                {
                    `My CV is available to view and download `
                }<Link to={ cvFilePath }>{ `here` }</Link>{ 
                    `. However, since I can't fit all my education and experience on it,
                    it's available below for those interested. References are available upon
                    request.`
                }
            </TextContainer>
            <Section title={ `Experience` }>
                { renderRecord(
                    `Software Developer Intern`,
                    `Ghyston, Mar 2021`,
                    `I worked on issues with Ghyston's website, fixing bugs with
                    Internet Explorer 11 and prototyping a smart header to assist navigation on
                    longer pages.`
                ) }
                { renderRecord(
                    `Academic Tutor`,
                    `University of Bristol, Oct 2020 to Jun 2021`,
                    `I support two groups of first year computer scientists as a tutor, going
                    through weekly problem sheets and taking questions about the course and its
                    content. This opportunity has developed my independence, leadership, and my 
                    ability to convey ideas to other people in an easily digestible way.`
                ) }
                { renderRecord(
                    `Academic Talks Officer for the Computer Science Society`,
                    `University of Bristol, Jun 2020 to Jun 2021`,
                    `I organise internal talks for the society, as well as supporting the 
                    society wherever I may be needed.`
                ) }
                { renderRecord(
                    `Software Developer Intern`,
                    `Ghyston, Aug 2020`,
                    `Over the course of the internship, we built a fantasy NBA league 
                    single-page app in pairs using React with Typescript, SQL, and C#.
                    Users could input bets with virtual currency
                    and view their current/projected scores on the global leaderboards
                    or create their own subsets of player groups called leagues.`
                ) }
                { renderRecord(
                    `Teaching Assistant`,
                    `University of Bristol, Jan 2020 to Jun 2021`,
                    `I work as teaching assistant on a Java programming
                    unit for Masters conversion students, as well as
                    a first-year algorithms unit.`
                ) }
                { renderRecord(
                    `President of the Maths and Computer Science Society`,
                    `University of Bristol, Nov 2019 to Jun 2020`,
                    `I founded and was the president of the Maths and
                    Computer Science society, running many internal talks for
                    all interested.`
                ) }
                { renderRecord(
                    `Open Day Steward`,
                    `University of Bristol, Jun 2019 to Sep 2019`,
                    `I worked three separate days across June and September 
                    helping the University run the open days.`
                ) }
                { renderRecord(
                    `Student Ambassador`,
                    `King's College London Maths School, Jul 2019`,
                    `I worked as a student ambassador during the KCLMS Physics+ 
                    summer school, giving students heading into Year 12 an insight
                    into A Level physics.`
                ) }
                { renderRecord(
                    `Volunteer Student Ambassador`,
                    `King's College London Maths School, Jul 2018`,
                    `I worked as a volunteer student ambassador during the KCLMS 
                    summer school where we helped soon-to-be Year 11's develop their
                    problem solving and mathematical skills.`
                ) }
            </Section>
            <Section title={ `Education` }>
                { renderRecord(
                    `University of Bristol`,
                    `Maths and Computer Science BSc, Sep 2018 to Jun 2021`,
                    `My average score for each year is below,
                    followed by the weighting of that year in parentheses:`,
                    <BulletedContainer>
                        { bulleted(`First Year - 83% (0%)`) }
                        { bulleted(`Second Year - 81% (25%)`) }
                        { bulleted(`Third Year (January Examinations) - 79% (75%)`) }
                    </BulletedContainer>
                ) }
                { renderRecord(
                    `King's College London Maths School (KCLMS)`,
                    `Sep 2016 to Jun 2018`,
                    `I left KCLMS with the following qualifications:`,
                    <BulletedContainer>
                        { bulleted(`A* in MEI Maths (A2)`) }
                        { bulleted(`A* in MEI Further Maths (A2)`) }
                        { bulleted(`A in OCR B Physics (A2)`) }
                        { bulleted(`A in AQA Computer Science (AS)`) }
                    </BulletedContainer>
                ) }
            </Section>
        </>
    );
}

const Section = (props : CollapseProps) => {
    const { children, ...otherProps } = props;
    return (
        <SectionOuterContainer {...otherProps}>
            <SectionInnerContainer>
                { children }
            </SectionInnerContainer>
        </SectionOuterContainer>
    );
};
const SectionOuterContainer = styled(Collapse)`
    margin-top: ${spacing2};
`;
const SectionInnerContainer = styled.div`
    padding: ${spacing3};
    padding-bottom: ${spacing1};
`;

const TextContainer = styled.p``;

const BulletedContainer = styled.p`
    margin: 0 ${spacing2};
`;

const RecordContainer = styled.div`
    margin-bottom: ${spacing2};
`;

const RecordTitleContainer = styled.h3`
    margin-bottom: ${spacing1};
`;
const RecordTitleTextContainer = styled.span``;

const TimeAndLocationContainer = styled.h4`
    margin-left: ${spacing4};
`;

const RecordContentContainer = styled.div`
    margin: 0 ${spacing4};
`;

const RecordTextContainer = styled.p``;
