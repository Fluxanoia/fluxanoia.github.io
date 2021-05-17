import React from "react";
import { TailSpin } from "react-loading-icons";
import styled from "styled-components";
import { textColour } from "../../utils/colours";
import { spacing2 } from "../../utils/dimensions";

export const renderFluxifyLoading = () => {
    return (
        <LoadingContainer>
            <LoadingIcon stroke={ textColour }></LoadingIcon>
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
