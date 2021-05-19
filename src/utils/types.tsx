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

export type AnchorProps = React.ComponentPropsWithoutRef<"a">;
export type DivProps = React.ComponentPropsWithoutRef<"div">;
export type ImgProps = React.ComponentPropsWithoutRef<"img">;
export type H1Props = React.ComponentPropsWithoutRef<"h1">;
export type H2Props = React.ComponentPropsWithoutRef<"h2">;
export type H3Props = React.ComponentPropsWithoutRef<"h3">;
export type H4Props = React.ComponentPropsWithoutRef<"h4">;
export type H5Props = React.ComponentPropsWithoutRef<"h5">;
export type H6Props = React.ComponentPropsWithoutRef<"h6">;
