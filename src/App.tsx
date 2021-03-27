import React, { useCallback, useEffect, useState } from "react";
import { History, LocationState, Location } from 'history';
import { Route, Switch, Link, withRouter } from "react-router-dom";

import CV from "./components/CV";
import Discord from "./components/Discord";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Projects from "./components/Projects";
import Specs from "./components/Specs";
import Study from "./components/Study";

type AppProps = {
    history : History<LocationState>,
    location: Location<LocationState>;
}
function App(props : AppProps) {
    const [location, setLocation] = useState("");

    const getLocationName = useCallback(() => {
        if (location.length < 4) {
            return location.toUpperCase();
        } else {
            return location.charAt(0).toUpperCase() + location.slice(1);
        }
    }, [location]);
    useEffect(() => {
        const path = props.location.pathname;
        setLocation((path === "/") ? "home" : path.slice(1))
        document.title = "Fluxanoia | " + getLocationName();
    }, [props, getLocationName])

    const localLinkNames = ["Home", "Projects", "CV", "Study"]
    const renderLink = (name : string) => {
        const displayName = name;
        name = name.toLowerCase();
        const className = "navbar-item " + ((location === name) ? "force-hover" : "");
        if (name === "home") name = "";
        return <Link className={ className } to={ `/${name}` }>{ displayName }</Link>
    }
    const renderLocalLinks = () => {
        return <>{ localLinkNames.map(renderLink) }</>;
    }
    const renderExternalLink = (name : string, link : string) => {
        return <a className="navbar-item" href={ link }>{ name }</a>;
    }
    const getTitle = () => {
        let name = getLocationName()
        return (localLinkNames.includes(name)) ? "Fluxanoia" : name;
    }

    return (
        <div className={ `app ${location}` }>
            <Link className="title" to="/">{ getTitle() }</Link>
            <div className="navbar">
                { renderLocalLinks() }
                { renderExternalLink("GitHub", "https://github.com/Fluxanoia") }
            </div>
            <div className="main-container p-3 my-2">
                <Switch>
                  <Route path="/" exact component={ Home } />
                  <Route path="/home" component={ Home } />
                  <Route path="/projects" component={ Projects } />
                  <Route path="/discord" component={ Discord } />
                  <Route path="/cv" component={ CV } />
                  <Route path="/study" component={ Study } />
                  <Route path="/specs" component={ Specs } />
                  <Route component={ NotFound } />
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
