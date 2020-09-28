import React from "react";

export default function Discord() {
    const widget = `
        <iframe src="https://discordapp.com/widget?id=324273447972634624&theme=dark" 
            width="350" height="500" allowtransparency="true" frameborder="0">
        </iframe>
    `;

    return (
        <>
            <p>
                The Teelai Association Discord server can be accessed via the 
                link <a href="https://discord.gg/ZfQn768">here</a>. The collaborative Spotify playlist
                is <a href="https://open.spotify.com/playlist/3MER32HK7y9bTcUFbTHZ13?si=dZeRGg0XSgaKQ5FhxgBmuQ">here</a>.
            </p>
            <div className="d-flex justify-content-center" dangerouslySetInnerHTML={{ __html: widget }} />
        </>
    );
}