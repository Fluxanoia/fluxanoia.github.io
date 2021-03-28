import React, { useCallback, useEffect, useState } from "react";
import { History, LocationState, Location } from 'history';
import { Route, Switch, Link, withRouter } from "react-router-dom";

import { PageInfo, createExternalPageInfo } from "./utils/pageInfo";

import { cvPageInfo } from "./components/CV";
import { discordPageInfo } from "./components/Discord";
import { homePageInfo } from "./components/Home";
import { notFoundPageInfo } from "./components/NotFound";
import { projectsPageInfo } from "./components/Projects";
import { specsPageInfo } from "./components/Specs";
import { studyPageInfo } from "./components/Study";

type AppProps = {
    history  : History<LocationState>,
    location : Location<LocationState>;
}
function App(props : AppProps) {
    const githubPageInfo : PageInfo = createExternalPageInfo(
        "GitHub", "https://github.com/Fluxanoia") 
    const pageInfos : PageInfo[] = [
        homePageInfo,
        projectsPageInfo,
        cvPageInfo,
        studyPageInfo,
        specsPageInfo,
        discordPageInfo,
        notFoundPageInfo,
        githubPageInfo,
    ];

    const getNotFoundPageIndex : (() => number) = useCallback(
        () => pageInfos.findIndex((pageInfo : PageInfo) => pageInfo.notFound), [pageInfos]);
    const getCurrentPageIndex : (() => number) = useCallback(
        () => {
            let currentPageIndex = pageInfos.findIndex((pageInfo : PageInfo) : boolean => {
                return pageInfo.link === props.location.pathname;
            });
            return (currentPageIndex < 0) ? getNotFoundPageIndex() : currentPageIndex;
        }, [props, pageInfos, getNotFoundPageIndex]);
    const [pageIndex, setPageIndex] = useState<number>(getCurrentPageIndex());

    useEffect(() => {
        setPageIndex(getCurrentPageIndex());
        document.title = "Fluxanoia | " + pageInfos[pageIndex].name;
    }, [pageInfos, pageIndex, getCurrentPageIndex]);

    const getTitle = () => {
        const currentPage : PageInfo = pageInfos[pageIndex];
        return (currentPage.onNavbar || currentPage.notFound) ? "Fluxanoia" : currentPage.name;
    };
    const renderNavbarButton = (pageInfo : PageInfo, index : number) => {
        const key = "link-" + pageInfo.name;
        if (!pageInfo.onNavbar) return <React.Fragment key={ key } />;
        if (pageInfo.local) {
            const className = "navbar-item " + ((pageIndex === index) ? "force-hover" : "");
            return <Link
                key={ key }
                className={ className }
                to={ pageInfo.link }>
                    { pageInfo.name }
                </Link>;
        } else {
            return <a 
                key={ key }    
                className="navbar-item"
                href={ pageInfo.link }>
                    { pageInfo.name }
                </a>;
        }
    }
    const renderRoute = (pageInfo : PageInfo) => {
        const key = "route-" + pageInfo.name;
        if (!pageInfo.local) console.error("Rendering external route.")
        if (pageInfo.notFound) return <Route key={ key } component={ pageInfo.component } />;
        return <Route
            key={ key }
            path={ pageInfo.link }
            exact={ pageInfo.home }
            component={ pageInfo.component } />;
    }

    return (
        <div className={ `app ` + pageInfos[pageIndex].tag }>
            <Link className="title" to="/">{ getTitle() }</Link>
            <div className="navbar">
                { pageInfos.map(renderNavbarButton) }
            </div>
            <div className="main-container p-3 my-2">
                <Switch>
                    { pageInfos.filter((pageInfo : PageInfo) => pageInfo.local).map(renderRoute) }
                </Switch>
            </div> 
            <div className="vertical-fill"></div>
            <div className="main-container text-center mb-2">
                Copyright © 2021 Fluxanoia 
            </div> 
        </div>
    );
}
export default withRouter(App);
