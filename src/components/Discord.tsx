import React from "react";
import { getLocalPageInfo, PageInfo } from "../utils/pageInfo";

export const discordPageInfo : PageInfo = getLocalPageInfo(Discord, "Discord", false);
export default function Discord() {
    return <p className="text-center my-2">
        The Teelai Association Discord server can be accessed via the 
        link <a href="https://discord.gg/ZfQn768">here</a>.
    </p>;
}