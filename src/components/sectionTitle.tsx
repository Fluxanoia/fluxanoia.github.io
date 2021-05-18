import React from "react";
import styled from "styled-components";
import { spacing2, spacing3 } from "../utils/dimensions";
import Divider from "./divider";

type SectionTitleProps = {
    accent? : boolean,
    className? : string,
    children? : React.ReactNode,
}
export default function SectionTitle({ accent, className, children } : SectionTitleProps) {
    return (
        <SectionTitleContainer className={ className }>
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
