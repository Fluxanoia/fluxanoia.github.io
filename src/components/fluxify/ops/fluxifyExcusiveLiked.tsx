import React from "react";
import styled from "styled-components";
import useFluxifyPlaylists from "../../../hooks/fluxifyPlaylists";
import useSpotifyPlaylists from "../../../hooks/spotifyPlaylists";
import { spacing2, ifSuperSmall, spacing1 } from "../../../utils/dimensions";
import Button from "../../button";
import Collapse from "../../collapse";
import FluxifyLoading from "../fluxifyLoading";
import FluxifyOp, { FluxifyOpProps } from "./fluxifyOp";

export const exclusiveLikedOp = new FluxifyOp(
    `exclusiveLiked`,
    `Find exclusive liked songs`,
    FluxifyExclusiveLiked,
);

export default function FluxifyExclusiveLiked({
    token,
    client,
    throwError,
} : FluxifyOpProps) {
    const [
        playlists,
        metadata,
        loaded,
        error,
    ] = useSpotifyPlaylists(token, client);
    const [
        components,
        selected,
        selectAll,
        selectNone,
    ] = useFluxifyPlaylists(playlists, metadata);

    if (error) {
        throwError(error);
        return <FluxifyLoading />;
    } else if (loaded) {
        return (
            <CollapseContainer title="Select Playlists">
                <SelectInfoContainer>
                    <SelectTextContainer>
                        { `${selected.length} playlists selected` }
                    </SelectTextContainer>
                    <SelectButton key="selectAll" onClick={ selectAll }>{ `All` }</SelectButton>
                    <SelectButton key="selectNone" onClick={ selectNone }>{ `None` }</SelectButton>
                </SelectInfoContainer>
                <PlaylistsContainer>
                    { components }
                </PlaylistsContainer>
            </CollapseContainer>
        );
    } else {
        return <FluxifyLoading />;
    }
}

const CollapseContainer = styled(Collapse)`
    margin-bottom: ${spacing2};
`;

const PlaylistsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;
const SelectInfoContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: ${spacing2} 0;
    padding: 0 ${spacing2};

    ${ifSuperSmall} {
        flex-direction: column;
    }
`;
const SelectTextContainer = styled.div`
    margin-left: ${spacing2};
    margin-right: auto;
    ${ifSuperSmall} {
        margin: ${spacing1} ${spacing2};
    }
`;
const SelectButton = styled(Button)`
    width: 100px;
    margin-right: ${spacing2};
    ${ifSuperSmall} {
        width: 100%;
        margin: ${spacing1} ${spacing2};
    }
`;
