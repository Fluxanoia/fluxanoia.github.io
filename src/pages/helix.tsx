import React from "react";
import Page from "./pages";

export const helixPage : Page = new Page(Helix, {
    accentColour: "#9bff97",
    name: "Helix",
    onNavbar: true,
});
export default function Helix() {
    return (
        <div>
            <p className="mb-0">
                Thank you for taking interest in the study!
                <br /><br />
                The task for the study is available {
                    createPdfLink("res/Task.pdf", "here") 
                }, once you are done please fill out the { surveyLink() }.
                <br /><br />
                You can download Helix for 64-bit Windows { windowsLink() }, for other operating
                systems, please see the instructions on the { otherOsLink() }.
                <br /><br />
                More detailed information about the study is available on 
                the { githubLink() } repository and on the participation sheet { 
                    createPdfLink("res/ParticipationInformation.pdf", " here") 
                }, and you are welcome to send any questions you have to { emailLink() }.
                <br /><br />
                If you wish to be contacted with a link to the paper once it is finished,
                contact me at { emailLink() } and I will add you to the mailing list. This
                abides by the data policies in the {
                    createPdfLink("res/ParticipationInformation.pdf",
                        "Participation Information sheet")
                }.
            </p>
        </div>
    );
}

const createPdfLink = (file : string, text : string) => {
    return <a target="_blank" rel="noopener noreferrer" href={ file }>
        { text }
    </a>
}
const surveyLink = () => {
    return <a href="https://forms.office.com/r/GcS7KSgnEx">
        survey
    </a>;
}
const windowsLink = () => {
    return <a href="https://github.com/Fluxanoia/Helix/raw/master/builds/Helix-Win64.zip">
        here
    </a>;
}
const otherOsLink = () => {
    return <a href="https://github.com/Fluxanoia/Helix#macos-and-linux">
        GitHub
    </a>;
}
const githubLink = () => {
    return <a href="https://github.com/Fluxanoia/Helix#helix-graphing-tool">
        GitHub
    </a>;
}
const emailLink = () => {
    return <a href="mailto:kc18859@bristol.ac.uk">
        kc18859@bristol.ac.uk
    </a>;
}
