export enum Side {
    LEFT = `left`,
    RIGHT = `right`
};
export const flip = (side : Side) => side === Side.LEFT ? Side.RIGHT : Side.LEFT;

export enum LoadingState {
    NONE,
    LOADING,
    LOADED,
    FAILED,
}
export const isLoaded = (...states : Array<LoadingState>) => {
    return states.every(state => state === LoadingState.LOADED);
}

export type StyledProps = {
    className? : string,
}
