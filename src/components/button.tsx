import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { buttonHoverStyling } from "../utils/globalStyling";

type ButtonProps = {
    href : string;
    forceHover? : boolean;
    onClick? : () => void;
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
            <Link style={ linkStyling } to={ props.href } onClick={ props.onClick }>
                { button }
            </Link>
        );
    } else {
        return (
            <a
                style={ linkStyling }
                target="_blank"
                rel="noopener noreferrer"
                href={ props.href }
                onClick={ props.onClick }
            >
                { button }
            </a>
        );
    }
}

const linkStyling = {
    textDecoration: 'none',
    cursor: 'auto',
};

const ButtonContainer = styled.button<{ forceHover : boolean }>`
    ${props => props.forceHover ? buttonHoverStyling : ``}
`;
