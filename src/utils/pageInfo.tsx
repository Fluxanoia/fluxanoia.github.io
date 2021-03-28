import React from "react";

export type PageInfo = {
    component : React.ComponentType<any>,

    name : string, 
    link : string,
    tag : string,

    local : boolean,

    onNavbar : boolean,
    home : boolean,
    notFound : boolean,
};
export const createPageInfo = (
    component : React.ComponentType<any>,
    name : string,
    local : boolean,
    link : string,
    onNavbar : boolean,
    home : boolean = false,
    notFound : boolean = false 
) : PageInfo => {
    return {
        component: component,

        name: name,
        link: link,
        tag: name.toLowerCase(),

        local: local,

        onNavbar: onNavbar,
        home: home,
        notFound: notFound,
    }
};
export const createLocalPageInfo = (
    component : React.ComponentType<any>, 
    name : string,
    link : string | undefined = undefined,
    onNavbar : boolean,
    home : boolean,
    notFound : boolean,
) : PageInfo => {
    if (link === undefined) link = "/" + name.toLowerCase();
    return createPageInfo(component, name, true, link, onNavbar, home, notFound);
};
export const createExternalPageInfo = (name : string, link : string) : PageInfo => {
    return createPageInfo(() => <></>, name, false, link, true);
};

export function getHomePageInfo(component : React.ComponentType<any>) : PageInfo {
    return createLocalPageInfo(component, "Home", "/", true, true, false);
};
export function getNotFoundPageInfo(component : React.ComponentType<any>) : PageInfo {
    return createLocalPageInfo(component, "NotFound", "", false, false, true);
};
export function getLocalPageInfo(
    component : React.ComponentType<any>,
    name : string,
    onNavbar : boolean,
    link? : string
) : PageInfo {
    return createLocalPageInfo(component, name, link, onNavbar, false, false);
};
