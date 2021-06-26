import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Collapse from "../components/collapse";
import { spacing2 } from "../utils/dimensions";
import { ReorderMetric } from "../utils/spotify";
import { BooleanOptionComponent } from "./optionsSelector";

type PlaylistOrderSelectorOptions = {
    title? : string,
    showDistinct? : boolean,
};
export default function usePlaylistOrderSelector(
    key : string,
    options? : PlaylistOrderSelectorOptions,
) : [JSX.Element, ReorderMetric, boolean] {
    const [metric, setMetric] = useState(ReorderMetric.NONE);
    const [distinct, setDistinct] = useState(true);

    const component = useMemo(() => {
        const metrics = (Object.keys(ReorderMetric) as Array<keyof typeof ReorderMetric>).map(k => {
            return (
                <BooleanOptionComponent
                    key={ k }
                    name={ ReorderMetric[k] }
                    value={ metric === ReorderMetric[k] }
                    onClick={ () => setMetric(ReorderMetric[k]) }
                />
            );
        });
        const metricComponent = (
            <CollapseContainer
                key={ `metrics` }
                title={ `Ordering by` }
                value={ metric }
            >
                <InnerContainer>
                    { metrics }
                </InnerContainer>
            </CollapseContainer>
        );
        if (options?.showDistinct) {
            return (
                <CollapseContainer key={ key } title={ (options ?? {}).title ?? `Choose ordering` }>
                    <InnerContainer>
                        <DistinctOption
                            key={ `distinct` }
                            name={ `Remove duplicates` }
                            value={ distinct }
                            onClick={ () => setDistinct(d => !d) }
                        />
                        { metricComponent }
                    </InnerContainer>
                </CollapseContainer>
            );
        } else {
            return metricComponent;
        }
    }, [key, options, metric, setMetric, distinct, setDistinct])

    return [component, metric, distinct];
}

const CollapseContainer = styled(Collapse)``;
const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: ${spacing2};
`;
const DistinctOption = styled(BooleanOptionComponent)`
    margin-bottom: ${spacing2};
`;
