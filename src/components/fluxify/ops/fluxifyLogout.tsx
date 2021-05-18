import React from "react";
import styled from "styled-components";
import { spacing2 } from "../../../utils/dimensions";
import Button from "../../button";

type FluxifyLogoutProps = {
    logout : () => void,
    className? : string,
}
export const FluxifyLogout = ({ logout, className } : FluxifyLogoutProps) => {
    return (
        <Button className={ className } onClick={ logout }>
            { `Log-out` }
        </Button>
    );       
}

type FluxifyLogoutPageProps = {
    logout : () => void,
    message? : string,
}
export default function FluxifyLogoutPage({ logout, message } : FluxifyLogoutPageProps) {
    return (
        <>
            <TextContainer>
                { message }
            </TextContainer>
            <FluxifyLogout logout={ logout }/>
        </>
    ); 
}

const TextContainer = styled.p`
    margin-bottom: ${spacing2};
`;

