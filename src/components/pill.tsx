import React from "react";
import styled from "styled-components";
import { spacing1, spacing2, spacing4 } from "../utils/dimensions";
import { clearButtonStyling } from "../utils/globalStyling";
import { ButtonProps } from "../utils/types";

type PillProps = {
    radius? : string,
} & ButtonProps;
export default function Pill(props : PillProps) {
    return <PillContainer {...props} />
}

const PillContainer = styled.button<PillProps>`
    display: flex;
    align-items: center;

    ${clearButtonStyling}
    width: 100%;
    padding-top: ${spacing1};
    padding-bottom: ${spacing1};
    padding-left: ${spacing2};

    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;

    border-radius: ${props => props.radius ?? spacing4};

    background: rgba(255, 255, 255, 0);
    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    transition: background-color 0.25s;
`;
