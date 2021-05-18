import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/button";
import { defaultBgColour } from "../utils/colours";
import { ifLarge, spacing1 } from "../utils/dimensions";

export const externalPage = (name : string, link : string) => {
    return new Page(() => <></>, {
        name: name,
        link: link,
        onNavbar: true,
        local: false,
    })
}

type PageProps = {
    accentColour? : string;
    
    name : string,
    link? : string,

    local? : boolean,
    independent? : boolean,
    
    onNavbar? : boolean,
    home? : boolean,
    notFound? : boolean,
};
export default class Page {
    private component : React.ComponentType<any> | undefined;
    private props : PageProps;

    public constructor(component : React.ComponentType<any>, props : PageProps) {
        this.component = component;
        props.link = props.link ?? `/` + props.name.toLowerCase();
        this.props = props;
    }

    public getButton(forceHover : boolean) {
        return (
            <ButtonContainer key={ "link-" + this.props.name }>
                <Button href={ this.props.link ?? "" } forceHover={ forceHover }>
                    { this.props.name }
                </Button>
            </ButtonContainer>
        );
    }
    public getRoute() {
        const key = "route-" + this.props.name;
        if (this.props.notFound) return <Route key={ key } component={ this.component } />;
        return <Route
            key={ key }
            path={ this.props.link }
            exact
            component={ this.component } />;
    }
    
    public hasLink(link : string) { return link === this.props.link; }

    public getComponent() { return this.component; }
    public getColour() { return this.props.accentColour ?? defaultBgColour };
    public getName() { return this.props.name; }
    public isLocal() { return this.props.local ?? true; }
    public isOnNavbar() { return this.props.onNavbar ?? false; }
    public isHome() { return this.props.home ?? false; }
    public isNotFound() { return this.props.notFound ?? false; }
    public isIndependent() { return this.props.independent ?? false; }
};

const ButtonContainer = styled.div`
    flex-grow: 1;
    margin: 0 0 ${spacing1} 0;
    ${ifLarge} {
        margin: 0 ${spacing1};
    }
`;
