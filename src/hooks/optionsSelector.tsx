import React, { useCallback, useMemo, useState } from "react";
import { ImCross, ImCheckmark } from "react-icons/im";
import styled from "styled-components";
import Collapse from "../components/collapse";
import Pill from "../components/pill";
import { spacing2 } from "../utils/dimensions";

type OptionProps<T> = {
    key : string,
    name : string,
    value : T,
    onClick : () => void,
}

export type Option<T> = {
    key : string,
    name : string,
    def : T,
    getNextValue : (value : T) => T,
    component : React.FunctionComponent<OptionProps<T>>,
}
export const BooleanOptionNextValue = (v : boolean) => !v;
export const BooleanOptionComponent = (props : OptionProps<boolean>) => {
    const { name, value, ...otherProps } = props;
    return (
        <Pill {...otherProps}>
            { value ? <Check /> : <Cross /> }
            { name }
        </Pill>
    );
};
const Check = styled(ImCheckmark)`
    margin-right: ${spacing2};
`;
const Cross = styled(ImCross)`
    margin-right: ${spacing2};
`;

const getDefaultData = (optionInfo : Array<Option<any>>) => {
    let data : { [key : string]: any } = {};
    for (const o of optionInfo) data[o.key] = o.def;
    return data;
}

type OptionSelectorOptions = {
    title? : string,
}
export default function useOptionSelector(
    key : string,
    optionInfo : Array<Option<any>>,
    options? : OptionSelectorOptions,
) : [JSX.Element, { [key : string] : any }] {
    const [data, setData] = useState<{ [key : string]: any }>(getDefaultData(optionInfo));

    const updateData = useCallback((key : string, value : any) => {
        const otherData = data;
        delete otherData[key];
        setData({
            [key]: value,
            ...otherData,
        });
    }, [data, setData])

    const component = useMemo(() => (
        <CollapseContainer key={ key } title={ (options ?? {}).title ?? `Choose Options` }>
            <OptionsContainer>
                { optionInfo.map(o => {
                    const key = o.key;
                    const Option = o.component;
                    return (
                        <Option
                            key={ key }
                            name={ o.name }
                            value={ data[key] }
                            onClick={ () => updateData(key, o.getNextValue(data[key])) }
                        />
                    );
                }) }
            </OptionsContainer>
        </CollapseContainer>
    ), [key, optionInfo, options, data, updateData]);
    
    return [component, data];
}

const CollapseContainer = styled(Collapse)``;
const OptionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${spacing2};
`;
