import React from "react";
import styled from "styled-components";
import { spacing2 } from "../../utils/dimensions";
import { AnchorProps } from "../../utils/types";
import Button from "../button";

type FluxifyLogoutProps = {
    logout : () => void,
} & AnchorProps;
export const FluxifyLogout = (props : FluxifyLogoutProps) => {
    const { logout, ...otherProps } = props;
    return (
        <Button onClick={ logout } {...otherProps}>
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

