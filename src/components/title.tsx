import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Page from "../pages/pages"
import { textColour } from "../utils/colours";
import { ifLarge, mainContainerWidth } from "../utils/dimensions";
import { titleFontSettings } from "../utils/globalStyling";
import { DivProps } from "../utils/types";

type TitleProps = {
    page? : Page,
} & DivProps;
export default function Title(props : TitleProps) {
    const { page, ...otherProps } = props;
    return (
        <TitleContainer {...otherProps}>
            <TextContainer to="/">
                { page && !page.isOnNavbar() && !page.isNotFound() ? page.getName() : "Fluxanoia" }
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
