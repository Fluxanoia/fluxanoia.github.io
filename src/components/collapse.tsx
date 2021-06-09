import React, { useState } from "react"
import styled from "styled-components";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { spacing1, spacing2, spacing4 } from "../utils/dimensions";
import { containerBorderColour } from "../utils/colours";
import Pill from "./pill";
import { DivProps } from "../utils/types";

const radius = spacing4;

export type CollapseProps = {
    title : string,
    value? : string,
} & DivProps;
export default function Collapse(props : CollapseProps) {
    const [open, setOpen] = useState(false);
    const { title, value, children, ...otherProps } = props;
    return (
        <MainContainer key={ props.title } {...otherProps}>
            <PillContainer>
                <Pill radius={ radius } onClick={ () => setOpen(o => !o) }>
                    <Arrow open={ open } />
                    { title }
                    <ValueContainer>
                        { value }
                    </ValueContainer>
                </Pill>
            </PillContainer>
            <ChildContainer open={ open }>
                { children }
            </ChildContainer>
        </MainContainer>
    );
}

const MainContainer = styled.div`
    border: 2px solid ${containerBorderColour};
    border-radius: ${radius};
`;
const PillContainer = styled.div`
    padding: ${spacing1};
`;
const Arrow = styled(HiOutlineArrowCircleRight)<{ open : boolean }>`
    flex-shrink: 0;
    margin-right: ${spacing2};
    
    ${props => props.open ? `transform: rotate(90deg);` : ``}
    transition: transform 0.25s;
`;
const ValueContainer = styled.div`
    flex-grow: 1;
    margin-left: ${spacing4};
    margin-right: ${spacing2};

    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

type ChildContainerProps = {
    open : boolean,
    height? : string,
}
const ChildContainer = styled.div<ChildContainerProps>`
    ${props => props.open ? `` : `display: none;`}
    overflow: hidden;
    border-radius: ${radius};
`;
