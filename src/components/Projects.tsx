import React from "react";

export default function Projects() {
    const cardmaster = `
        <iframe frameborder="0" src="https://itch.io/embed/718461?dark=true" width="552" height="167">
            <a href="https://fluxanoia.itch.io/cardmaster">
                Cardmaster by Fluxanoia
            </a>
        </iframe>
    `

    const renderProject = (title : string, text : string) => {
        return (
            <>
                <h2 className="rainbow-text">{ title }</h2>
                <p className="mx-2">
                    { text }
                </p>
            </>
        );
    }

    return (
        <>
            <p>
                I'm currently working on a few projects:          
            </p>
            
            { renderProject(`Helix`, `This is my third year project, which will
                be graphing software (hopefully) capable of higher dimensional plotting.
                It is being made in C++ with SDL.`) }

            { renderProject(`Cardmaster`, `This is a game I'm working on when I can,
                it started out in Java, migrated to C++ with SDL and is now on the
                Godot Engine. The widget below will take you to where it's hosted.`) }

            <div className="d-flex justify-content-center mb-2" dangerouslySetInnerHTML={{ __html: cardmaster }} />

            { renderProject(`www.fluxanoia.co.uk`, `This website is built on React with Typescript and hosted on GitHub Pages.`) }

            { renderProject(`Legacy Downloads`, `For nostalgia's sake, here are some links
                to projects that are no longer being worked on:`)}
            
            <div className="mx-2">
                <div><a href="http://www.mediafire.com/file/6m0h776pnl9hr32/Cardmaster_pre0.0.5.zip/file">Cardmaster (C++)</a></div>
                <div><a href="https://www.mediafire.com/file/x2m7ffz9zgq4h9o/Pulse.zip/file">Pulse</a></div>
                <div><a href="http://www.mediafire.com/file/q8ofirq3y8xlxoo/King_of_the_Skies_Package.zip/file">King of the Skies</a></div>
            </div>
        </>
    );
}