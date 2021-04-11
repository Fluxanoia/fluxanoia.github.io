import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Pdf from "react-to-pdf";
import { cvColour1, cvTextColour } from "../../utils/colours";
import { mainFontSettings } from "../../utils/globalStyling";
import { normalise } from "../../utils/normalise";
import Page from "../pages";
import CvHeader from "../../components/cv/cvHeader";
import CvLeftColumn from "../../components/cv/cvLeftColumn";
import CvRightColumn from "../../components/cv/cvRightColumn";
import { cvSpacing2, cvSpacing3, spacing1, spacing2 } from "../../utils/dimensions";
import CvTitle from "../../components/cv/cvTitle";
import { Link } from "react-router-dom";

export const cvFilePath = "/cv/pdf";
export const cvPdfPage : Page = new Page(CvPdf, {
    name: "CV",
    link: cvFilePath,
    independent: true,
});
export default function CvPdf() {
    const [showButtons, setShowButtons] = useState(true);

    const toggleButtons = () => setShowButtons(b => !b);

    return (
        <Pdf filename="CV - Tyler Wright" x={-2} y={-2}>
            {({toPdf, targetRef} : PdfParams) =>  (
                <>
                    <ButtonContainer show={showButtons}>
                        <Link to={ "/cv" }>
                            <Button show={showButtons}>
                                Back to fluxanoia.co.uk
                            </Button>
                        </Link>
                        <Button onClick={toPdf} show={showButtons}>
                            Download as PDF
                        </Button>
                        <Button onClick={toggleButtons}>
                            { showButtons ? `Hide Buttons` : `Show Buttons` }
                        </Button>
                    </ButtonContainer>
                    <MainContainer ref={targetRef}>
                        <GlobalStyling />
                        <CvHeader />
                        <ColumnContainer>
                            <LeftContainer>
                                <CvLeftColumn />
                            </LeftContainer>
                            <RightContainer>
                                <CvRightColumn />
                            </RightContainer>
                        </ColumnContainer>
                        <CvTitle>...and more</CvTitle>
                        <AndMoreContainer>
                            A web version of this CV and much more information about my projects
                            and experience is available
                            at <Link to={ "/cv" }>fluxanoia.co.uk/cv</Link>. <br />
                            References are available upon request.
                        </AndMoreContainer>
                    </MainContainer>
                </>
            )}
        </Pdf>
    );
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 210mm;
    height: 297mm;

    box-sizing: border-box;
    margin: auto;
    padding: ${cvSpacing3};

    color: ${cvTextColour};
`;
const ColumnContainer = styled.div`
    display: flex;
    height: 100%;
    padding: ${cvSpacing3} 0;
`;
const LeftContainer = styled.div`
    margin-right: ${cvSpacing3};

    flex: 10 0 0;
    height: 100%;
`;
const RightContainer = styled.div`
    flex: 6 0 0;
    height: 100%;
`;
const AndMoreContainer = styled.p``;

const ButtonContainer = styled.div<{ show : boolean }>`
    position: fixed;
    top: ${spacing2};
    right: ${spacing2};
    font-size: 18px;

    transform: translateY(${props => props.show ? `0%`: `-120px`});
    transition: transform 1s;
`;
const Button = styled.div<{ show? : boolean }>`
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 48px;
    padding: 0 ${spacing1};
    margin-bottom: ${spacing1};
    box-sizing: border-box;
    
    text-align: center;

    border-width: 4px;
    border-style: solid;
    border-radius: 16px;
    box-shadow: 0px 0px 20px 6px rgba(40, 40, 40, ${props => (props.show ?? true) ? `0.4` : `0`}); 

    transition: box-shadow 1s;

    color: #FFFFFF;
    background-color: ${cvTextColour};
    border-color: #FFFFFF;
    &:hover {
        color: ${cvTextColour};
        background-color: #FFFFFF;
        border-color: ${cvTextColour};
    }
    
`;

export const GlobalStyling = createGlobalStyle`
    ${normalise}

    html {
        ${mainFontSettings}
        font-size: 12px;
    }

    h1, h2, h3, h4, h5, h6, p {
        margin-top: 0;
        margin-bottom: ${cvSpacing2};
    }
    h1 {
        font-size: 24px;
    }
    h2 {
        font-size: 20px;
    }
    h3 {
        font-size: 16px;
    }
    h4 {
        font-size: 12px;
        font-weight: 400;
    }

    a, .a {
        color: ${cvColour1};
        text-decoration: none;
    }
`;