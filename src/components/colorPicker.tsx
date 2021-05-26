import React from "react";
import Slider from "rc-slider";
import { useState } from "react";
import styled, { CSSProperties } from "styled-components";
import { spacing2 } from "../utils/dimensions";
import { hexToRgb, rgbToHex } from "../utils/misc";
import { containerBorderColour } from "../utils/colours";

const sliderRailStyle : CSSProperties = { 
    backgroundColor: '#888888',
    height: 8,
};
export default function useColourPicker(
    startingColour? : string,
) : [JSX.Element, string] {
    const [startR, startG, startB] = hexToRgb(startingColour ?? `#000000`);
    const [r, setR] = useState(startR); 
    const [g, setG] = useState(startG); 
    const [b, setB] = useState(startB); 

    const renderSlider = (
        key : string,
        v : number,
        log : (v : number) => void,
        highlight : string,
    ) => (
        <Slider
            key={ key }
            min={ 0 }
            max={ 255 }
            step={ 1 }
            defaultValue={ v }
            onChange={ log }
            trackStyle={ {
                backgroundColor: highlight,
                height: 8,
            } }
            handleStyle={ {
                borderColor: highlight,
                height: 16,
                width: 16,
                marginTop: -4,
            } }
            railStyle={ sliderRailStyle }
        />
    );
    const component = (
        <Container>
            <ColourBox style={ { backgroundColor: rgbToHex(r, g, b) } } />
            <SliderBox>
                { renderSlider('r', r, setR, `#d83a3f`) }
                { renderSlider('g', g, setG, `#3ad84a`) }
                { renderSlider('b', b, setB, `#3a54d8`) }
            </SliderBox>
        </Container>
    );

    return [component, rgbToHex(r, g, b)];
}

const Container = styled.div`
    display: flex;
`;
const ColourBox = styled.div`
    flex: 1 1 100px;

    border-top-left-radius: ${spacing2};
    border-bottom-left-radius: ${spacing2};
    border: 2px solid ${containerBorderColour};
    border-right: 0px solid;
`;
const SliderBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    padding: 0 ${spacing2};

    flex: 1 1 900px;
    height: 180px;

    border-top-right-radius: ${spacing2};
    border-bottom-right-radius: ${spacing2};
    border: 2px solid ${containerBorderColour};
    border-left: 0px solid;
`;
