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
    private _props : PageProps;

    public constructor(component : React.ComponentType<any>, props : PageProps) {
        this.component = component;
        this._props = props;
    }

    public getButton(forceHover : boolean) {
        const links = {
            [this.isLocal() ? `to` : `href`]: this.getLink(),
        }
        return (
            <ButtonContainer key={ `link-${this.getName()}` }>
                <Button {...links} forceHover={ forceHover }>
                    { this.getName() }
                </Button>
            </ButtonContainer>
        );
    }
    public getRoute() {
        const key = `route-${this.getName()}`;
        if (this.isNotFound()) return <Route key={ key } component={ this.component } />;
        return <Route
            key={ key }
            path={ this.getLink() }
            exact
            component={ this.component } />;
    }
    
    public hasLink(link : string) { return link === this.getLink(); }

    public getComponent() { return this.component; }
    public getColour() { return this._props.accentColour ?? defaultBgColour };
    public getName() { return this._props.name; }
    public getLink() { return this._props.link ?? `/${this.getName().toLowerCase()}`; }
    public isLocal() { return this._props.local ?? true; }
    public isOnNavbar() { return this._props.onNavbar ?? false; }
    public isHome() { return this._props.home ?? false; }
    public isNotFound() { return this._props.notFound ?? false; }
    public isIndependent() { return this._props.independent ?? false; }
};

const ButtonContainer = styled.div`
    flex-grow: 1;
    margin: 0 0 ${spacing1} 0;
    ${ifLarge} {
        margin: 0 ${spacing1};
    }
`;
