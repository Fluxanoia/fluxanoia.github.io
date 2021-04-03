import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Page from "../pages/pages"
import { textColour } from "../utils/colours";
import { ifLarge, mainContainerWidth } from "../utils/dimensions";
import { titleFontSettings } from "../utils/globalStyling";

type TitleProps = { page? : Page };
export default function Title({ page } : TitleProps) {
    let titleText = "Fluxanoia";
    if (typeof page !== 'undefined' && !page.isOnNavbar() && !page.isNotFound()) {
        titleText = page.getName();
    }
    return (
        <TextContainer to="/">
            { titleText }
        </TextContainer>
    );
}
        
const getTitleShadow = () => {
    const colour = '#000';
    let shadows : string[] = [];

    const prefixes = ['', '-'];
    ['1px'].forEach((size : string) => {
        prefixes.forEach((a : string) => {
            prefixes.forEach((b : string) => {
                shadows.push(a + size + ' ' + b + size);
            });
            shadows.push(a + size + ' 0');
            shadows.push('0 ' + a + size);
        });
    })

    const size = '3px';
    shadows.push('0 ' + size);
    shadows.push(size + ' 0');
    shadows.push(size + ' ' + size);

    return shadows.map(s => s + ' 0 ' + colour).join();
}

const TextContainer = styled(Link)`
    display: block;

    text-shadow: ${getTitleShadow()};

    ${titleFontSettings}
    font-size: 80px;
    text-align: center;
    word-wrap: break-word;
    text-decoration: none !important;

    max-width: ${mainContainerWidth};
    margin-left: auto;
    margin-right: auto;

    color: ${textColour} !important;

    ${ifLarge} {
        font-size: 100px;
    }
`;
