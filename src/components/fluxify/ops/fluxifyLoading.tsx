import React from "react";
import { TailSpin } from "react-loading-icons";
import styled from "styled-components";
import { containerBorderColour } from "../../../utils/colours";
import { spacing2 } from "../../../utils/dimensions";
import { StyledProps } from "../../../utils/types";

export default function FluxifyLoading({ className } : StyledProps) {
    return (
        <LoadingContainer className={ className }>
            <LoadingIcon stroke={ containerBorderColour }></LoadingIcon>
        </LoadingContainer>
    );
}

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const LoadingIcon = styled(TailSpin)`
    margin: ${spacing2} 0;
`;
