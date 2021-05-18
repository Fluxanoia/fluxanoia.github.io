import React, { useState } from "react"
import styled from "styled-components";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { spacing1, spacing2, spacing4 } from "../utils/dimensions";
import { containerBorderColour } from "../utils/colours";

type CollapseProps = {
    title : string,
    value? : string,

    className? : string,
    children? : React.ReactNode,
}
export default function Collapse({ title, value, className, children } : CollapseProps) {
    const [open, setOpen] = useState(false);
    return (
        <MainContainer key={ title } className={ className }>
            <TitleContainer onClick={ () => setOpen(o => !o) }>
                <Arrow open={ open } />
                { title }
                <ValueContainer>
                    { value }
                </ValueContainer>
            </TitleContainer>
            <ChildContainer open={ open }>
                { children }
            </ChildContainer>
        </MainContainer>
    );
}


const radius = spacing4;

const MainContainer = styled.div`
    border: 2px solid ${containerBorderColour};
    border-radius: ${radius};
`;
const TitleContainer = styled.h3`
    display: flex;
    align-items: center;
    margin: 0px;
    padding-top: ${spacing1};
    padding-bottom: ${spacing1};
    padding-left: ${spacing2};

    cursor: pointer;

    white-space: nowrap;
    overflow: hidden;

    border-radius: ${radius};

    background: rgba(255, 255, 255, 0);
    &:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    transition: background-color 0.25s;
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
    ${props => props.open ? `` : `height: 0px;`}
    overflow: hidden;
    border-radius: ${radius};
`;
