import React from "react";
import styled from "styled-components";
import { AiOutlineGithub, AiFillPhone } from "react-icons/ai";
import { BiGlobe } from "react-icons/bi";
import { SiMailDotRu } from "react-icons/si";
import { FiMapPin } from "react-icons/fi";
import { cvSpacing2 } from "../../utils/dimensions";
import { cvColour1, cvColour2 } from "../../utils/colours";

const createLink = (icon : JSX.Element, link : string, noLink? : boolean) => {
    if (noLink ?? false) {
        return (
            <LinkContainer>
                { icon } &nbsp; <span className="a">{ link }</span>
            </LinkContainer>
        );
    }
    const href = (link.includes('@')) ? `mailto:${link}` : `https://www.${link}`;
    return (
        <LinkContainer>
            { icon } &nbsp; <a href={ href }>{ link }</a>
        </LinkContainer>
    );
}

export default function CvHeader() {
    return (
        <HeaderContainer>
            <TitleContainer>
                Tyler Wright
            </TitleContainer>
            <SubtitleContainer>
                Studying Maths and Computer Science at the University of Bristol
            </SubtitleContainer>
            <LinksContainer>
                { createLink(<BiGlobe />, "fluxanoia.co.uk") }
                { createLink(<SiMailDotRu />, "contact@fluxanoia.co.uk") }
                { createLink(<AiFillPhone />, "+447468 417 670", true) }
                { createLink(<AiOutlineGithub />, "github.com/Fluxanoia") }
                { createLink(<FiMapPin />, "Bristol and London, UK", true) }
            </LinksContainer>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div``;
const TitleContainer = styled.h1`
    color: ${cvColour1};
    margin-bottom: 0;
    text-transform: uppercase;
`;
const SubtitleContainer = styled.h3`
    color: ${cvColour2};
`;
const LinksContainer = styled.div`
    display: flex;
`;
const LinkContainer = styled.div`
    display: flex;
    margin-right: ${cvSpacing2};
    svg {
        align-self: center;
    }
`;