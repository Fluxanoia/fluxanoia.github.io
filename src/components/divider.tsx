import React from "react";
import styled from "styled-components";
import { spacing0 } from "../utils/dimensions";

export default function Divider({ colour } : { colour? : string }) {
    return (<Container colour={ colour ?? '#FFFFFF' }/>);
}

const Container = styled.div<{ colour : string }>`
    display: block;
    content: none;
    height: ${spacing0};
    background-color: ${props => props.colour};
`;
