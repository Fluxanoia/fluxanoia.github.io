import React from "react";
import styled from "styled-components";
import { spacing0 } from "../utils/dimensions";
import { DivProps } from "../utils/types";

type DividerProps = {
    colour? : string,
} & DivProps;
export default function Divider(props : DividerProps) {
    return <Container colour={ props.colour ?? '#FFFFFF' } {...props}/>;
}

const Container = styled.div<{ colour : string }>`
    display: block;
    content: none;
    height: ${spacing0};
    background-color: ${props => props.colour};
`;
