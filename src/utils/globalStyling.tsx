import { createGlobalStyle } from "styled-components";
import { containerColour, containerStyling, defaultBgColour, textColour } from "./colours";
import { ifLarge, spacing2 } from "./dimensions";
import { normalise } from "./normalise";

export const titleFont = `Fredoka One`;
export const mainFont = `Poppins`;
export const titleFontSettings = `
    font-family: ${titleFont};
`;
export const mainFontSettings = `
    font-family: ${mainFont}, sans-serif;
    font-weight: 700;
    line-height: 1.5;
`;

export const buttonHoverStyling = `
    color: ${containerColour};
    background-color: ${textColour};
`;
export const buttonStyling = `
    ${containerStyling}
    ${mainFontSettings}

    display: block;
    width: 100%;
    color: ${textColour};
    background-color: ${containerColour};
    text-align: center;
    cursor: pointer;

    &:hover {
        ${buttonHoverStyling}
    }
`;

export const bgTransitionTime = `1s`;

export const GlobalStyling = createGlobalStyle<{ bgColour? : string }>`
    ${normalise}

    html {
        ${mainFontSettings}
        color: ${textColour};

        font-size: 18px;
        ${ifLarge} {
            font-size: 20px;
        }
    }
    body {
        background-color: ${props => props.bgColour ?? defaultBgColour};
        transition: background-color ${bgTransitionTime};
    }

    button {
        ${buttonStyling}
    }

    h1, h2, h3, h4, h5, h6, p {
        margin-top: 0;
        margin-bottom: ${spacing2};
    }
    h1 {
        font-size: 40px;
    }
    h2 {
        font-size: 32px;
    }
    h3 {
        font-size: 24px;
    }
    h4 {
        font-size: 16px;
        font-weight: 400;
    }

    a {
        color: inherit;
        text-decoration: underline;
    }
`;
