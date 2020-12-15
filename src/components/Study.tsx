import React from "react";

export default function Home() {
    const createPdfLink = (file : string, text : string) => {
        return <a className="rainbow-text" target="_blank" rel="noopener noreferrer" href={ file }>
            { text }
        </a>
    }
    const emailLink = () => {
        return <a className="rainbow-text" href="mailto:kc18859@bristol.ac.uk">
            kc18859@bristol.ac.uk
        </a>
    }

    return (
        <div>
            <p>Thank you for taking interest in my study!</p>
            <p>
                Information about the study is available in the participant information sheet { 
                    createPdfLink("res/ParticipationInformation.pdf", " here") 
                }, but a brief description follows (this does not act as a replacement for
                reading the information sheet).
            </p>
            <p>
                The study consists of two stages, of which you can participate in both, one of,
                or neither of them. The first is a short survey about your experience with
                graphing software. The second is a short task involving using some graphing
                software to be released at a later date.
            </p>
            <p>
                The consent forms for the study are below, make sure you choose the correct
                form based on your age. Note that if you are under 18 years old, you
                NEED your school's approval. Please send the signed consent form to {
                    emailLink()
                } with the subject 'URGENT: Graphing Study'.
            </p>
            <p className="text-center">
                { createPdfLink("res/ConsentFormAdults.pdf", 
                    "Consent Form for those 18 years old or older") }
            </p>
            <p className="text-center">
                { createPdfLink("res/ConsentFormYoungPeople.pdf", 
                    "Consent Form for those under 18 years old") }
            </p>
            <p className="mb-0">
                We invite any questions, you are welcome to send them to {
                    emailLink()
                } with the subject 'URGENT: Graphing Study'.
            </p>
        </div>
    );
}