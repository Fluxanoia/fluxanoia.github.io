import React from "react";
import styled from "styled-components";
import { spacing0 } from "../utils/dimensions";

export default function Divider() {
    return (<Container />);
}

const Container = styled.div`
    display: block;
    content: none;
    height: ${spacing0};
    background-color: #FFFFFF;
`;
