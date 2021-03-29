import React from "react";
import { getLocalPageInfo, PageInfo } from "../utils/pageInfo";

const cvUrl : string = "https://github.com/Fluxanoia/Curriculum-Vitae/raw/master/Curriculum%20Vitae/main.pdf";

export const cvPageInfo : PageInfo = getLocalPageInfo(Cv, "CV", true);
export default function Cv() {
    return (
        <>
            <p>
                My CV is available <a href={ cvUrl }>here</a>. However, I can't fit all my
                education and experience on it - so I have added it all below for those interested.
            </p>
            <p>
                References are available upon request.
            </p>
            
            <div className="divider" />
            { renderTitle("Experience") }
            
            { renderCvRecord(
                `Academic Tutor`,
                `University of Bristol, Oct 2020 to Jun 2021`,
                `I support two groups of first year computer scientists as a tutor, going through
                weekly problem sheets and taking questions about the course and its content.
                This opportunity has developed my independence, leadership, and my 
                ability to convey ideas to other people in an easily digestable way.`
            ) }

            { renderCvRecord(
                `Academic Talks Officer for the Computer Science Society`,
                `University of Bristol, Jun 2020 to Jun 2021`,
                `I organise internal talks for the society, as well as supporting the 
                society wherever I may be needed.`
            ) }

            { renderCvRecord(
                `Software Developer Intern`,
                `Ghyston, Aug 2020`,
                `Over the course of the internship, we built a fantasy NBA league 
                single-page app in pairs using React with Typescript, SQL, and C#.
                Users could input bets with virtual currency
                and view their current/projected scores on the global leaderboards
                or create their own subsets of player groups called leagues.`
            ) }

            { renderCvRecord(
                `Teaching Assistant`,
                `University of Bristol, Jan 2020 to Jun 2021`,
                `I work as teaching assistant on a Java programming
                unit for Masters conversion students, as well as
                a first-year algorithms unit.`
            ) }

            { renderCvRecord(
                `President of the Maths and Computer Science Society`,
                `University of Bristol, Nov 2019 to Jun 2020`,
                `I founded and was the president of the Maths and
                Computer Science society, running many internal talks for
                all interested.`
            ) }

            { renderCvRecord(
                `Open Day Steward`,
                `University of Bristol, Jun 2019 to Sep 2019`,
                `I worked three separate days across June and September 
                helping the University run the open days.`
            ) }

            { renderCvRecord(
                `Student Ambassador`,
                `King's College London Maths School, Jul 2019`,
                `I worked as a student ambassador during the KCLMS Physics+ 
                summer school, giving students heading into Year 12 an insight
                into A Level physics.`
            ) }

            { renderCvRecord(
                `Volunteer Student Ambassador`,
                `King's College London Maths School, Jul 2018`,
                `I worked as a volunteer student ambassador during the KCLMS 
                summer school where we helped soon-to-be Year 11's develop their
                problem solving and mathematical skills.`
            ) }
            
            <div className="divider" />
            { renderTitle("Education") }

            { renderCvRecord(
                `University of Bristol`,
                `Maths and Computer Science BSc, Sep 2018 to Jun 2021`,
                `My average score for each year is below,
                followed by the weighting of that year in parentheses:`,
                <ul className="mb-0">
                    <li>First Year - 83% (0%)</li>
                    <li>Second Year - 81% (25%)</li>
                    <li>Third Year (January Examinations) - 79% (75%)</li>
                </ul>
            ) }

            { renderCvRecord(
                `King's College London Maths School (KCLMS)`,
                `Sep 2016 to June 2018`,
                `I left KCLMS with the following qualifications:`,
                <ul className="mb-0">
                    <li>A* in MEI Maths (A2)</li>
                    <li>A* in MEI Further Maths (A2)</li>
                    <li>A in OCR B Physics (A2)</li>
                    <li>A in AQA Computer Science (AS)</li>
                </ul>
            ) }
        </>
    );
}

const renderTitle = (title : string) => <h1 className="text-center">{ title }</h1>;
const renderCvRecord = (
    title : string,
    timeAndLocation : string,
    description : string,
    children? : React.ReactNode,
) => {
    return ( 
        <div className="mb-4">
            <h3>&#8226; <span className="accent-text">{ title }</span></h3>
            <h4 className="ml-3">{ timeAndLocation }</h4>
            <div className="mx-4">
                <p className="mb-0">{ description }</p>
                { children }
            </div>
        </div>
    );
}
