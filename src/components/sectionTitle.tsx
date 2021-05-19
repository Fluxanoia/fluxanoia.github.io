import React from "react";
import styled from "styled-components";
import { spacing2, spacing3 } from "../utils/dimensions";
import { DivProps } from "../utils/types";
import Divider from "./divider";

type SectionTitleProps = {
    accent? : boolean,
} & DivProps;
export default function SectionTitle(props : SectionTitleProps) {
    const { accent, children, ...otherProps } = props;
    return (
        <SectionTitleContainer {...otherProps}>
            <TitleContainer className={ (accent ?? false) ? `accent` : `` }>
                { children }
            </TitleContainer>
            <DividerContainer>
                <Divider />
            </DividerContainer>
        </SectionTitleContainer>
    );
}

const SectionTitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: ${spacing3};
`;

const TitleContainer = styled.h2`
    margin-right: ${spacing2};
    margin-bottom: 0;
`;

const DividerContainer = styled.div`
    flex-grow: 1;
`;
