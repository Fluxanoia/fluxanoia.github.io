import React from "react";
import styled from "styled-components";
import { spacing1, spacing2, spacing4 } from "../utils/dimensions";
import { H3Props } from "../utils/types";

type PillProps = {
    radius? : string,
} & H3Props;
export default function Pill(props : PillProps) {
    return <PillContainer {...props} />
}

const PillContainer = styled.h3<PillProps>`
    display: flex;
    align-items: center;
    margin: 0px;
    padding-top: ${spacing1};
    padding-bottom: ${spacing1};
    padding-left: ${spacing2};

    cursor: pointer;

    white-space: nowrap;
    overflow: hidden;

    border-radius: ${props => props.radius ?? spacing4};

    background: rgba(255, 255, 255, 0);
    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    transition: background-color 0.25s;
`;
