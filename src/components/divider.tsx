import React from "react";
import styled from "styled-components";
import { spacing0 } from "../utils/dimensions";

type DividerProps = {
    colour? : string,
    className? : string,
}
export default function Divider({ colour, className } : DividerProps) {
    return (<Container className={ className } colour={ colour ?? '#FFFFFF' }/>);
}

const Container = styled.div<{ colour : string }>`
    display: block;
    content: none;
    height: ${spacing0};
    background-color: ${props => props.colour};
`;
