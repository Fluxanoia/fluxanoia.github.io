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
        <TitleContainer>
            <TextContainer to="/">
                { titleText }
            </TextContainer>
        </TitleContainer>
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

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    overflow: hidden;
    width: 100%;
`;
const TextContainer = styled(Link)`
    max-width: ${mainContainerWidth};

    text-shadow: ${getTitleShadow()};

    ${titleFontSettings}
    text-decoration: none !important;
    color: ${textColour} !important;

    font-size: 80px;
    ${ifLarge} {
        font-size: 100px;
    }
`;
