export enum Side {
    LEFT = `left`,
    RIGHT = `right`
};
export const flip = (side : Side) => side === Side.LEFT ? Side.RIGHT : Side.LEFT;