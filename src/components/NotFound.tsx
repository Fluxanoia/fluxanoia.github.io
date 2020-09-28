import React from "react";

export default function NotFound() {
    const renderParagraph = (text : string) => <p className="text-center my-2">{ text }</p>;
    return ( 
        <>
            { renderParagraph("Oops, did you take a wrong turn?") }
            { renderParagraph("We couldn't find anything at this URL.") }
        </>
    );
}
