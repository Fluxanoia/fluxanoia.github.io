
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
