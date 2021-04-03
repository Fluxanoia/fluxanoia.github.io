import React from "react";
import styled from "styled-components";
import SectionTitle from "../components/sectionTitle";
import { spacing2 } from "../utils/dimensions";
import Page from "./pages";

export const specsPage : Page = new Page(Specs, {
    accentColour: "#ffbe89",
    name: "Specs",
});
export default function Specs() {
    return (
        <>
            <SectionTitle accent>Computer Specs</SectionTitle>
            
            <TableContainer>
                { renderRow("Motherboard", "Asus ROG STRIX B350-F") }
                { renderRow("CPU", "AMD Ryzen 7 1700") }
                { renderRow("GPU", "MSI GTX 1070 ARMOR") }
                { renderRow("RAM", "Ballistix Elite 16GB") }
                { renderRow("PSU", "EVGA SuperNOVA 550 G2") }
                { renderRow("Case", "Corsair Carbide Series 330R") }
                { renderRow("CPU Cooler", "ARCTIC Alpine 64 Pro") }
            </TableContainer>

            <SectionTitle accent>Peripherals</SectionTitle>

            <TableContainer>
                { renderRow("Mouse", "Logitech MX Master") }
                { renderRow("Mouse (Gaming)", "Steelseries Rival 110") }
                { renderRow("Keyboard", "Logitech G815 (Tactile)") }
                { renderRow("Keyboard (Other)", "Ducky One") }
                { renderRow("Headphones", "AKG K240 MkII") }
                { renderRow("Microphone", "Audio Technica AT2020") }
            </TableContainer>
        </>
    );
}

const renderRow = (part : string, name : string) => {
    return (
        <RowContainer>
            <LeftTextContainer>{ part }</LeftTextContainer>
            <RightTextContainer>{ name }</RightTextContainer>
        </RowContainer>
    );
}

const TableContainer = styled.div`
    margin-bottom: ${spacing2};
`;

const RowContainer = styled.div`
    display: flex;
`;

const LeftTextContainer = styled.div`
    align-text: left;
    flex: 0 0 25%;
`;

const RightTextContainer = styled.div`
    align-text: right;
    flex: 1 0 0;
    margin-left: 20px;
`;
