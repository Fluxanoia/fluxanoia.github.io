import React from "react";
import Client from "spotify-api.js";
import styled from "styled-components";
import { spacing2, ifSuperSmall } from "../../utils/dimensions";
import SpotifyImage from "./fluxifyImages";

type FluxifyHeaderProps = {
    client : Client,
}
export default function FluxifyHeader({ client } : FluxifyHeaderProps) {
    return (
        <HeaderContainer>
            <UserImage images={ client.user.images }/>
            <TitleContainer>
                { `${client.user.name}` }
            </TitleContainer>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    display: flex;
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
