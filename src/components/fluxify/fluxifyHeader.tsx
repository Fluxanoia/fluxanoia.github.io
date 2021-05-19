import React from "react";
import Client from "spotify-api.js";
import styled from "styled-components";
import { spacing2, ifSuperSmall } from "../../utils/dimensions";
import { DivProps } from "../../utils/types";
import SpotifyImage from "./fluxifyImages";
import { FluxifyLogout } from "./fluxifyLogout";

type FluxifyHeaderProps = {
    client : Client,
    logout : () => void,
} & DivProps;
export default function FluxifyHeader(props : FluxifyHeaderProps) {
    const { client, logout, ...otherProps } = props;
    return (
        <HeaderContainer {...otherProps}>
            <UserImage images={ client.user.images }/>
            <TitleContainer>
                { `${client.user.name}` }
            </TitleContainer>
            <Logout logout={ logout }/>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${spacing2};
`;
const UserImage = styled(SpotifyImage)`
    width: 64px;
    height: 64px;
    margin-right: ${spacing2};
    ${ifSuperSmall} {
        display: none;
    }
`;
const TitleContainer = styled.h1`
    margin: 0px;
`;
const Logout = styled(FluxifyLogout)`
    width: 140px;
    margin-left: auto;
`;
