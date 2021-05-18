import React from "react";
import { Playlist } from "spotify-api.js";
import styled from "styled-components";
import { spacing2, ifSuperSmall, spacing1 } from "../../../utils/dimensions";
import Button from "../../button";
import Collapse from "../../collapse";

type FluxifyExclusiveLikedProps = {
    selectedPlaylists : Array<Playlist>,
    playlistComponents : Array<JSX.Element>,
    selectAll : () => void,
    selectNone : () => void,
}

export default function FluxifyExclusiveLiked({
    selectedPlaylists,
    playlistComponents,
    selectAll,
    selectNone,
} : FluxifyExclusiveLikedProps) {
    return (
        <CollapseContainer title="Select Playlists">
            <SelectInfoContainer>
                <SelectTextContainer>
                    { `${selectedPlaylists.length} playlists selected` }
                </SelectTextContainer>
                <SelectButton key="selectAll" onClick={ selectAll }>{ `All` }</SelectButton>
                <SelectButton key="selectNone" onClick={ selectNone }>{ `None` }</SelectButton>
            </SelectInfoContainer>
            <PlaylistsContainer>
                { playlistComponents }
            </PlaylistsContainer>
        </CollapseContainer>
    );
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
