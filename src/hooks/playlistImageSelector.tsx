import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Collapse from "../components/collapse";
import useColourPicker from "../components/colorPicker";
import { spacing1, spacing2 } from "../utils/dimensions";
import { BooleanOptionComponent } from "./optionsSelector";

enum ImageType {
    IMAGE,
    COLOUR,
    NONE,
};

type PlaylistImageSelectorOptions = {
    title? : string,
};
export default function usePlaylistImageSelector(
    key : string,
    options? : PlaylistImageSelectorOptions,
) : [JSX.Element, string | null | undefined] {
    const [imageType, setImageType] = useState(ImageType.IMAGE);
    const [colourComponent, colour] = useColourPicker(`#1DB954`);

    const component = useMemo(() => {
        return (
            <CollapseContainer key={ key } title={ (options ?? {}).title ?? `Choose Image` }>
                <InnerContainer>
                    <BooleanOptionComponent
                        key={ `image` }
                        name={ `Use default image` }
                        value={ imageType === ImageType.IMAGE }
                        onClick={ () => setImageType(ImageType.IMAGE) }
                    />
                    <BooleanOptionComponent
                        key={ `colour` }
                        name={ `Use plain colour` }
                        value={ imageType === ImageType.COLOUR }
                        onClick={ () => setImageType(ImageType.COLOUR) }
                    />
                    { imageType === ImageType.COLOUR ? (
                        <ColourPickerContainer>
                            { colourComponent }
                        </ColourPickerContainer>
                    ) : `` }
                    <BooleanOptionComponent
                        key={ `none` }
                        name={ `No image` }
                        value={ imageType === ImageType.NONE }
                        onClick={ () => setImageType(ImageType.NONE) }
                    />
                </InnerContainer>
            </CollapseContainer>
        );
    }, [key, options, imageType, setImageType, colourComponent])

    const resolve = (type : ImageType) => {
        switch (type) {
            case ImageType.COLOUR: return colour;
            case ImageType.IMAGE: return null;
        }
        return undefined;
    }
    return [component, resolve(imageType)];
}

const CollapseContainer = styled(Collapse)``;
const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${spacing2};
`;
const ColourPickerContainer = styled.div`
    padding-top: ${spacing2};
    padding-bottom: ${spacing1};
`;