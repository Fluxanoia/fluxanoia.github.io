import React from "react";

export default function Home() {
    return (
        <div>
            <img className="inline-img mb-1 mr-3" src="res/me.png" alt="That's me!"/>
            <p>
                I'm Tyler, a final-year Maths and Computer Scientist at the University of Bristol.
                This website is the home of my various programming projects.
            </p>
            <p className="mb-0">
                I am currently working on my third-year project with
                Cardmaster on the backburner (more details on the projects page).
            </p>
        </div>
    );
}