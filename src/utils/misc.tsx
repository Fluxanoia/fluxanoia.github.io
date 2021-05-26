import { UnexpectedError } from "spotify-api.js";

export const quantityText = (amount : number, capacity : number, noun : string) => {
    switch (amount) {
        case 0:        return `No ${noun}s`;
        case 1:        return `1 ${noun}`;
        case capacity: return `All ${noun}s`;
        default:       return `${amount} ${noun}s`;
    }
}

export const randomString = (length : number) => {
    let result = [];
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const len = chars.length;
    for (let i = 0; i < length; i++) {
        result.push(chars.charAt(Math.floor(Math.random() * len)));
    }
    return result.join('');
}

export const hexToRgb = (hex : string) => {
    if (hex.length === 7){
        hex = hex.slice(1);
    }
    if (hex.length !== 6) { 
        throw new UnexpectedError(`Cannot convert a hex code that isn't 6 or 7 digits.`);
    }
    let rgb = hex.match(/.{1,2}/g);
    if (!rgb) throw new UnexpectedError("Couldn't match hex code.");
    return rgb.map(x => parseInt(x, 16));
}

export const rgbToHex = (r : number, g : number, b : number) => {
    const inRange = (x : number) => x <= 255 && x >= 0;
    if (!(inRange(r) && inRange(g) && inRange(b))) {
        throw new UnexpectedError(`Out of range RGB values.`);
    }
    return `#${
        [r, g, b].map(x => x.toString(16))
                 .map(x => x.length < 2 ? `0${x}` : x)
                 .join(``)
    }`;
}
