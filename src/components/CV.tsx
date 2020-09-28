import React from "react";

export default function CV() {
    const renderTitle = (title : string) => {
        return <h1 className="text-center">{ title }</h1>;
    }

    const renderCVRecord = (
        title : string,
        time_loc : string,
        desc : string,
        elem? : JSX.Element
    ) => {
        return ( 
            <>
            <h3>&#8226; <span className="rainbow-text">
                { title }
            </span></h3>
                <h4 className="ml-3">{ time_loc }</h4>
                <p className="mx-4">{ desc }{ elem }</p>
            </>
        );
    }

    return (
        <>
            <p>
                My CV is available <a href="https://github.com/Fluxanoia/Curriculum-Vitae/raw/master/Curriculum%20Vitae/CV.pdf">
                here</a>. However, due to the nature of it, I can't fit all my education and
                experience on it - so I have added it all below for those interested.
            </p>
            <p>
                References are available upon request.
            </p>
            
            <div className="divider" />
            { renderTitle("Experience") }
            
            { renderCVRecord(
                `General Officer of the Computer Science Society`,
                `University of Bristol, Jun 2020 to May 2021`,
                `I work to support the society wherever I may be needed, 
                as well as organising internal talks.`
            ) }

            { renderCVRecord(
                `Software Developer Intern`,
                `Ghyston, Aug 2020`,
                `Over the internship, I learnt more about Git and web technologies like
                Typescript, React, SQL and C# backend development in the context of
                team development.`
            ) }

            { renderCVRecord(
                `Teaching Assistant`,
                `University of Bristol, Jan 2020 to Jun 2020`,
                `I worked as teaching assistant on a Java programming
                unit for Masters conversion students.`
            ) }

            { renderCVRecord(
                `President of the Maths and Computer Science Society`,
                `University of Bristol, Nov 2019 to Jun 2020`,
                `I founded and became the president of the Maths and
                Computer Science society, running many internal talks for
                all interested.`
            ) }

            { renderCVRecord(
                `Open Day Steward`,
                `University of Bristol, Jun 2019 to Sep 2019`,
                `I worked three separate days across June and September 
                helping the University run the open days.`
            ) }

            { renderCVRecord(
                `Student Ambassador`,
                `King's College London Maths School, Jul 2019`,
                `I worked as a student ambassador during the KCLMS Physics+ 
                summer school, giving students heading into Year 12 an insight
                into A Level physics.`
            ) }

            { renderCVRecord(
                `Volunteer Student Ambassador`,
                `King's College London Maths School, Jul 2018`,
                `I worked as a volunteer student ambassador during the KCLMS 
                summer school where we helped soon-to-be Year 11's develop their
                problem solving and mathematical skills.`
            ) }
            
            <div className="divider" />
            { renderTitle("Education") }

            { renderCVRecord(
                `University of Bristol`,
                `Maths and Computer Science BSc, Sep 2018 to Jun 2021`,
                `My average score for each year is below,
                followed by the weighting of that year in parentheses:`,
                <ul className="mb-0">
                    <li>First Year - 83.25% (0%)</li>
                    <li>Second Year - 84.25% (25%)</li>
                </ul>
            ) }

            { renderCVRecord(
                `King's College London Maths School (KCLMS)`,
                `Sep 2016 to June 2018`,
                `I left KCLMS with the following qualifications:`,
                <ul className="mb-0">
                    <li>A* in MEI Maths (A2)</li>
                    <li>A* in MEI Further Maths (A2)</li>
                    <li>A in MEI OCR B Physics (A2)</li>
                    <li>A in AQA Computer Science (AS)</li>
                </ul>
            ) }
        </>
    );
}