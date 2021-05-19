import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { buttonHoverStyling } from "../utils/globalStyling";
import { AnchorProps } from "../utils/types";

type ButtonProps = {
    to? : string,
    newTab? : boolean;
    forceHover? : boolean;
} & AnchorProps;

export default function Button(props : ButtonProps) {
    const { children, to, href, ...otherProps } = props;
    const button = (
        <ButtonContainer forceHover={ props.forceHover ?? false }>
            { children }
        </ButtonContainer>
    );
    if (to) {
        return <Link style={ linkStyling } to={ to } {...otherProps}>{ button }</Link>;
    } else {
        return (
            <a
                style={ linkStyling }
                target={ props.newTab ? "_blank" : "_self" }
                rel="noopener noreferrer"
                href={ href }
                {...otherProps}
            >
                { button }
            </a>
        );
    }
}

const linkStyling = {
    display: `block`,
    textDecoration: `none`,
    cursor: `auto`,
};

const ButtonContainer = styled.button<{ forceHover : boolean }>`
    ${props => props.forceHover ? buttonHoverStyling : ``}
`;
