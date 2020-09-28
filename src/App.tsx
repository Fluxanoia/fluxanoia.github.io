import React, { useState } from "react";
import { History, LocationState } from 'history';
import { Route, Switch, Link, withRouter } from "react-router-dom";

import Contact from "./components/Contact";
import CV from "./components/CV";
import Discord from "./components/Discord";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Projects from "./components/Projects";

type AppProps = {
    history : History<LocationState>
}
function App(props : AppProps) {
    const processLocation = (loc : string) => {
        if (loc === "/") return "home";
        return loc.slice(1);
    }
    const [location, setLocation] = useState(
        processLocation(window.location.pathname));
    props.history.listen((location, _action) => {
        setLocation(processLocation(location.pathname))
    });

    const renderLink = (name : string) => {
        const displayName = name;
        name = name.toLowerCase();
        const className = "navbar-item " 
            + ((location === name) ? "force-hover" : "");
        if (name === "home") name = "";
        return <Link className={ className } to={ `/${name}` }>{ displayName }</Link>
    }
    const renderExternalLink = (name : string, link : string) => {
        return <a className="navbar-item" href={ link }>{ name }</a>;
    }

    return (
        <div className={ `app ${location}` }>
            <Link className="title" to="/">Fluxanoia</Link>
            <div className="navbar">
                { renderLink("Home") }
                { renderLink("Projects") }
                { renderLink("Discord") }
                { renderLink("Contact") }
                { renderExternalLink("GitHub", "https://github.com/Fluxanoia") }
            </div>
            <div className="main-container p-3 my-2">
                <Switch>
                  <Route path="/" exact component={ Home } />
                  <Route path="/home" component={ Home } />
                  <Route path="/projects" component={ Projects } />
                  <Route path="/discord" component={ Discord } />
                  <Route path="/contact" component={ Contact } />
                  <Route path="/cv" component={ CV } />
                  <Route component={ NotFound } />
                </Switch>
            </div> 
            <div className="vertical-fill"></div>
            <div className="main-container text-center mb-2">
                Copyright © 2020 Fluxanoia 
            </div> 
        </div>
    );
}
export default withRouter(App);
