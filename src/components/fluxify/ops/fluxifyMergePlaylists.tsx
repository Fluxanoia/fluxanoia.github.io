import React from "react";
import styled from "styled-components";
import { spacing2 } from "../../../utils/dimensions";
import Collapse from "../../collapse";
import FluxifyOp, { FluxifyOpProps } from "./fluxifyOp";

export const mergeOp = new FluxifyOp(
    `merge`,
    `Merge playlists`,
    FluxifyMerge,
);

export default function FluxifyMerge({
    token,
    client,
    throwError,
} : FluxifyOpProps) {
    return (
        <CollapseContainer title="Open me!">
            <TextContainer>
                This is neat!
            </TextContainer>
        </CollapseContainer>
    );
}

const CollapseContainer = styled(Collapse)`
    margin-bottom: ${spacing2};
`;

const TextContainer = styled.div`
    text-align: center;
    margin: ${spacing2};
`;
