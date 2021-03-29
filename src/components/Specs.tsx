import React from "react";
import { getLocalPageInfo, PageInfo } from "../utils/pageInfo";

export const specsPageInfo : PageInfo = getLocalPageInfo(Specs, "Specs", false);
export default function Specs() {
    return (
        <>
            <h2 className="accent-text">Computer Specs</h2>
            {
                renderTable(<>
                    { renderRow("Motherboard", "Asus ROG STRIX B350-F") }
                    { renderRow("CPU", "AMD Ryzen 7 1700") }
                    { renderRow("GPU", "MSI GTX 1070 ARMOR") }
                    { renderRow("RAM", "Ballistix Elite 16GB") }
                    { renderRow("PSU", "EVGA SuperNOVA 550 G2") }
                    { renderRow("Case", "Corsair Carbide Series 330R") }
                    { renderRow("CPU Cooler", "ARCTIC Alpine 64 Pro") }
                </>) 
            }
            <h2 className="accent-text">Peripherals</h2>
            {
                renderTable(<>
                    { renderRow("Mouse", "Logitech MX Master") }
                    { renderRow("Mouse (Gaming)", "Steelseries Rival 110") }
                    { renderRow("Keyboard", "Logitech G815 (Tactile)") }
                    { renderRow("Keyboard (Other)", "Ducky One") }
                    { renderRow("Headphones", "AKG K240 MkII") }
                    { renderRow("Microphone", "Audio Technica AT2020") }
                </>) 
            }
        </>
    );
}

const renderTable = (content : JSX.Element) => {
    return (
        <table className="mb-2">
            <colgroup>
               <col className="w-25" />
               <col className=""/>
            </colgroup>
            <tbody>
                { content }
            </tbody>
        </table>
    );
}
const renderRow = (part : string, name : string) => {
    return (
        <tr>
            <td className="text-right ">{ part }</td>
            <td style={{width: "20px"}}></td>
            <td className="text-left">{ name }</td>
        </tr>
    );
}
