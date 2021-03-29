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

const githubPageInfo : PageInfo = createExternalPageInfo("GitHub", "https://github.com/Fluxanoia") 
const pageInfos : Array<PageInfo> = [
    homePageInfo,
    projectsPageInfo,
    cvPageInfo,
    studyPageInfo,
    specsPageInfo,
    discordPageInfo,
    notFoundPageInfo,
    githubPageInfo,
];

type AppProps = {
    history  : History<LocationState>,
    location : Location<LocationState>;
}
const App = (props : AppProps) => {
    const getNotFoundPageIndex : (() => number) = useCallback(
        () => { 
            return pageInfos.findIndex((pageInfo : PageInfo) => pageInfo.notFound);
        }, []);
    const getCurrentPageIndex : (() => number) = useCallback(
        () => {
            let currentPageIndex = pageInfos.findIndex(
                (pageInfo : PageInfo) => pageInfo.link === props.location.pathname);
            return (currentPageIndex < 0) ? getNotFoundPageIndex() : currentPageIndex;
        }, [props, getNotFoundPageIndex]);
    const [pageIndex, setPageIndex] = useState<number>(getCurrentPageIndex());

    useEffect(() => {
        let currentPageIndex = getCurrentPageIndex();
        document.title = "Fluxanoia | " + pageInfos[currentPageIndex].name;
        setPageIndex(currentPageIndex);
    }, [pageIndex, getCurrentPageIndex]);

    const renderTitle = () => {
        const currentPage : PageInfo = pageInfos[pageIndex];
        return (<Link className="title" to="/">
            { (currentPage.onNavbar || currentPage.notFound) ? "Fluxanoia" : currentPage.name }
        </Link>);
    };
    const renderNavbarButton = (pageInfo : PageInfo, index : number) => {
        if (!pageInfo.onNavbar) console.error("Rendering as navbar button illegally.")
        const key = "link-" + pageInfo.name;
        let className = "navbar-item";
        if (pageInfo.local) {
            className += (pageIndex === index) ? " force-hover" : "";
            return (<Link key={ key } className={ className } to={ pageInfo.link }>
                { pageInfo.name }
            </Link>);
        } else {
            return (<a key={ key } className={ className } href={ pageInfo.link }>
                { pageInfo.name }
            </a>);
        }
    }
    const renderRoute = (pageInfo : PageInfo) => {
        if (!pageInfo.local) console.error("Rendering external route.")
        const key = "route-" + pageInfo.name;
        if (pageInfo.notFound) return <Route key={ key } component={ pageInfo.component } />;
        return <Route
            key={ key }
            path={ pageInfo.link }
            exact={ pageInfo.home }
            component={ pageInfo.component } />;
    }

    const navbarInfos = pageInfos.filter((pageInfo : PageInfo) => pageInfo.onNavbar);
    const routeInfos = pageInfos.filter((pageInfo : PageInfo) => pageInfo.local);
    return (
        <div className={ `app ` + pageInfos[pageIndex].tag }>
            { renderTitle() }
            <div className="navbar">
                { navbarInfos.map(renderNavbarButton) }
            </div>
            <div className="main-container p-3 my-2">
                <Switch>
                    { routeInfos.map(renderRoute) }
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
