import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { containerColour, containerStyling, textColour } from "../utils/colours";

type ButtonProps = {
    href : string;
    forceHover? : boolean;
    children? : React.ReactNode;
}
export default function Button(props : ButtonProps) {
    const button = (
        <ButtonContainer forceHover={ props.forceHover ?? false }>
            { props.children }
        </ButtonContainer>
    );
    if (props.href.startsWith(`/`)) {
        return (
            <Link style={ linkStyling } to={ props.href }>
                { button }
            </Link>
        );
    } else {
        return (
            <a style={ linkStyling } target="_blank" rel="noopener noreferrer" href={ props.href }>
                { button }
            </a>
        );
    }
}

const linkStyling = {
    textDecoration: 'none',
    cursor: 'auto',
};

const hoverStyling = `
    color: ${containerColour};
    background-color: ${textColour};
    cursor: pointer;
`;
const ButtonContainer = styled.div<{ forceHover : boolean }>`
    ${containerStyling}

    color: ${textColour};
    background-color: ${containerColour};
    text-align: center;
    
    &:hover {
        ${hoverStyling}
    }
    ${props => props.forceHover ? hoverStyling : ``}
`;
