import React from "react";
import { PageInfo, getNotFoundPageInfo } from "../utils/pageInfo";

export const notFoundPageInfo : PageInfo = getNotFoundPageInfo(NotFound);
export default function NotFound() {
    return ( 
        <>
            <p className="text-center my-2">Oops, did you take a wrong turn?</p>
            <p className="text-center my-2">We couldn't find anything at this URL.</p>
        </>
    );
}
