import React from "react";
import { getLocalPageInfo, PageInfo } from "../utils/pageInfo";

export const studyPageInfo : PageInfo = getLocalPageInfo(Study, "Study", true);
export default function Study() {
    return (
        <div>
            <p>Thank you for taking interest in my study!</p>
            <p>
                Information about the study is available in the participant information sheet { 
                    createPdfLink("res/ParticipationInformation.pdf", " here") 
                }, in summary, it will be a short (20-30 minute) task involving using some graphing
                software.
            </p>
            <p>
                Please send the signed consent form to { emailLink() } with the subject
                'URGENT: Graphing Study'. Here are the consent forms for those { 
                    createPdfLink("res/ConsentFormAdults.pdf", "18 years old or older") 
                } and those { 
                    createPdfLink("res/ConsentFormYoungPeople.pdf", "under 18 years old")
                }.
            </p>
            <p className="mb-0">
                You are welcome to send any questions you have to { emailLink() }.
            </p>
        </div>
    );
}

const createPdfLink = (file : string, text : string) => {
    return <a target="_blank" rel="noopener noreferrer" href={ file }>
        { text }
    </a>
}
const emailLink = () => {
    return <a href="mailto:kc18859@bristol.ac.uk">
        kc18859@bristol.ac.uk
    </a>
}
