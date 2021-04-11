import React from "react";
import styled from "styled-components";
import { cvSpacing1 } from "../../utils/dimensions";

export default function CvLightDivider() {
    return (<LightDivider />);
}

const LightDivider = styled.div`
    height: 0px;
    margin-top: ${cvSpacing1};
    margin-bottom: ${cvSpacing1};

    border-top-color: #EEEEEE;
    border-top-style: dashed;
    border-top-width: 2px;
`;
