import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            <img className="inline-img pb-3 pr-3" src="res/me.png" alt="That's me!"/>
            <p>
                I'm Tyler, a second-year Maths and Computer Scientist at the University of Bristol.
                This website is the home of my various programming projects.
            </p>
            <p>
                I am currently working on the beginnings of my third-year project as well
                as Fluxdrive, Cardmaster and, this website (more details on the projects page).
            </p>
            <p className="mb-0">
                My CV and other information is available <Link to="/cv">here</Link>.
            </p>
        </div>
    );
}