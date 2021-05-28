import React, { Fragment } from "react";
import { useCallback, useMemo, useState } from "react";
import { Playlist } from "spotify-api.js";
import styled from "styled-components";
import Button from "../components/button";
import Collapse from "../components/collapse";
import FluxifyElement, { Element } from "../components/fluxify/fluxifyElement";
import { spacing2, ifSuperSmall, spacing1 } from "../utils/dimensions";
import { quantityText } from "../utils/misc";

export const LikedSongsElement : Element<Playlist> = {
    id: `likedSongs`,
    name: `Liked Songs`,
    images: [],
    data : {
        "liked": true,
    },
};
type PlaylistSelectorOptions = {
    title? : string,
    includeLiked? : boolean,
}
export const usePlaylistSelector = (
    key : string,
    playlists : Array<Playlist> | null,
    options? : PlaylistSelectorOptions,
) : [JSX.Element, Array<Element<Playlist>>] => {
    const elements = useMemo(() => {
        let elements : Array<Element<Playlist>> = []
        if (options?.includeLiked) elements.push(LikedSongsElement);
        elements.push(...(playlists ?? []).map(p => {
            return {
                id: p.id,
                name: p.name,
                images: p.images,
                uri: p.uri,
                raw: p,
            };
        }));
        return elements;
    }, [playlists, options]);

    const selectorOptions = {
        title: options?.title,
    };
    return useElementSelector(key, `playlist`, elements, selectorOptions);
}

type ElementSelectorOptions = {
    title? : string,
}
export const useElementSelector = <T,>(
    key : string,
    elementName : string,
    elements : Array<Element<T>> | null,
    options? : ElementSelectorOptions,
) : [JSX.Element, Array<Element<T>>] => {
    const [selected, setSelected] = useState<Array<string>>([]);

    const isSelected = useCallback((checkId : string) => {
        return selected.some((id : string) => checkId === id);
    }, [selected]);

    const components = useMemo(() => {
        const updateSelected = (newId : string, isSelected : boolean) => {
            if (isSelected) {
                setSelected(selected => selected.concat([newId]));
            } else {
                setSelected(selected => selected.filter((id : string) => id !== newId));
            }
        };
        return (elements ?? []).map((e : Element<T>) => (
            FluxifyElement(e, isSelected(e.id), updateSelected)
        ));
    }, [elements, isSelected, setSelected])
    
    const component = useMemo(() => {
        if (!elements) return <Fragment/>;
        const selectAll = () => setSelected((elements ?? []).map(e => e.id));
        const selectNone = () => setSelected([]);
        return (
            <CollapseContainer
                key={ key }
                title={ (options ?? {}).title ?? `Select ${elementName}s` }
                value={ `${quantityText(selected.length, elements.length, elementName)} selected` }
            >
                <SelectInfoContainer>
                    <SelectTextContainer>
                        { `Listing ${
                            quantityText(elements.length, -1, `playlist`)
                        }` }
                    </SelectTextContainer>
                    <SelectButton key="selectAll" onClick={ selectAll }>{ `All` }</SelectButton>
                    <SelectButton key="selectNone" onClick={ selectNone }>{ `None` }</SelectButton>
                </SelectInfoContainer>
                <ElementsContainer>
                    { components }
                </ElementsContainer>
            </CollapseContainer>
        );
    }, [key, options, components, selected, elements, elementName])

    return [component, (elements ?? []).filter(e => isSelected(e.id))];
}

const CollapseContainer = styled(Collapse)``;

const ElementsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: ${spacing1};
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

