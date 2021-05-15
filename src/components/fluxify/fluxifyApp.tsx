import React from "react";
import { useUser, UserPlaylists, UserPlaylistsWrappedResponse } from "react-spotify-api";
import { TailSpin } from 'react-loading-icons';
import { textColour } from "../../utils/colours";
import styled from "styled-components";
import { ifSmall, spacing2, spacing5 } from "../../utils/dimensions";

export default function FluxifyApp() {
    const { data, loading, error } = useUser();
    
    const validateResult = validate(data, loading, error);
    if (validateResult) return validateResult;

    const processPlaylists = (
        playlists : UserPlaylistsWrappedResponse,
        loading : boolean,
        error : string | null
    ) => {
        if (playlists) {
            const validateResult = validate(playlists, loading, error);
            if (validateResult) return validateResult;
            console.log(playlists);
            if (playlists.data) {
                return (
                    <>
                        {
                            playlists.data.items.map(playlist => (
                                <p key={playlist.id}>{playlist.name}</p>
                            ))
                        }
                        <button onClick={ playlists.loadMoreData }>
                            Load more
                        </button>
                    </>
                );
            }
        }
        return <></>;
    }

    return (
        <MainContainer>
            <HeaderContainer>
                <TitleContainer>
                    { `Hello ${data.display_name}!` }
                </TitleContainer>
                {
                    !data.images || data.images.length === 0 ? <></> :
                    <ProfileImageContainer src={ data.images[0].url } />
                }
            </HeaderContainer>
            <UserPlaylists options={{ limit: 2, offset: 1 }}>
                { processPlaylists }
            </UserPlaylists>
        </MainContainer>
    );
};

const MainContainer = styled.div`
`;
const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const TitleContainer = styled.h1`
    margin: 0px;
`;
const ProfileImageContainer = styled.img`
    width: ${spacing5};
    height: ${spacing5};
    border-radius: 16px;

    ${ifSmall} {
        display: none;
    }
`;

const validate = (
    data : any,
    loading : boolean,
    error : string | null
) => {
    if (data) {
        return undefined;
    } else if (loading) {
        return (
            <LoadingContainer>
                <LoadingIcon stroke={ textColour }></LoadingIcon>
            </LoadingContainer>
        );
    } else {
        const response = error ?? "Unhandled exception.";
        return (
            <ErrorContainer>
                { `An error occurred whilst loading your data: ${response}.` }
            </ErrorContainer>
        );
    }
}

const ErrorContainer = styled.div`
    align-text: center;
`;
const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const LoadingIcon = styled(TailSpin)`
    margin: ${spacing2} 0;
`;
