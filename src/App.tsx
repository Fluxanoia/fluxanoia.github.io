import React, { useEffect, useState } from "react";
import { History, LocationState, Location } from 'history';
import { Switch, withRouter } from "react-router-dom";
import styled from 'styled-components';
import { bgTransitionTime, GlobalStyling } from "./utils/globalStyling";
import Page from "./pages/pages";
import Title from "./components/title";
import Footer from "./components/footer";
import { containerStyling } from "./utils/colours";
import { ifLarge, mainContainerSizeSettings, spacing2, spacing3 } from "./utils/dimensions";
import { homePage } from "./pages/home";
import { notFoundPage } from "./pages/notFound";
import { projectsPage } from "./pages/projects";
import { cvPage } from "./pages/cv/cvPage";
import { helixPage } from "./pages/helix";
import { discordPage } from "./pages/discord";
import { specsPage } from "./pages/specs";
import { githubPage } from "./pages/external";
import { cvPdfPage } from "./pages/cv/cvPdf";
import { teelaiPage } from "./pages/teelai";

const pages : Array<Page> = [
    homePage,
    projectsPage,
    cvPage,
    helixPage,
    githubPage,
    discordPage,
    specsPage,
    teelaiPage,

    cvPdfPage,

    notFoundPage,
];
const getNotFoundIndex = () => pages.findIndex(p => p.isNotFound());
const getCurrentIndex = (link : string) => {
    let currentPageIndex = pages.findIndex(p => p.hasLink(link));
    return (currentPageIndex < 0) ? getNotFoundIndex() : currentPageIndex;
};

type AppProps = {
    history  : History<LocationState>,
    location : Location<LocationState>;
}
const App = (props : AppProps) => {
    const [pageIndex, setPageIndex] = useState<number>(getCurrentIndex(props.location.pathname));

    useEffect(() => {
        let currentPageIndex = getCurrentIndex(props.location.pathname);
        document.title = "Fluxanoia | " + pages[currentPageIndex].getName();
        setPageIndex(currentPageIndex);
    }, [props, pageIndex]);

    const renderNavbarButton = (page : Page, index : number) => {
        if (!page.isOnNavbar) console.error("Rendering as navbar button illegally.")
        return page.getButton(pageIndex === index);
    }
    const renderRoute = (page : Page) => {
        if (!page.isLocal()) console.error("Rendering external route.")
        return page.getRoute();
    }

    const routes = pages.filter((page : Page) => page.isLocal()).map(renderRoute);
    if (pages[pageIndex].isIndependent()) {
        return (<Switch>{ routes }</Switch>);
    }

    const accentColour = pages[pageIndex].getColour();
    const navbarButtons = pages.filter((page : Page) => page.isOnNavbar()).map(renderNavbarButton);
    return (
        <AppContainer>
            <GlobalStyling bgColour={ accentColour } />
            <Title page={ pages[pageIndex] } />
            <Navbar>
                { navbarButtons }
            </Navbar>
            <MainContainer accentColour={ accentColour }>
                <Switch>
                    { routes }
                </Switch>
            </MainContainer> 
            <Spacer />
            <Footer />
        </AppContainer>
    );
}
export default withRouter(App);

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
`;

const Navbar = styled.nav`
    ${mainContainerSizeSettings}
    ${ifLarge} {
        width: 90%;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    div {
        flex: 1 0 0;
    }

    ${ifLarge} {
        flex-direction: row;
    }
`;

const MainContainer = styled.div<{ accentColour : string }>`
    ${containerStyling}
    ${mainContainerSizeSettings}

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    padding: ${spacing3};
    margin-top: ${spacing2};
    margin-bottom: ${spacing2};

    a, .a, .accent {
        color: ${props => props.accentColour};
        transition: color ${bgTransitionTime};
    }
`;

const Spacer = styled.div`
    flex-grow: 1;
`;
