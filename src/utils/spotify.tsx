import { createCanvas } from "canvas";
import { shuffle, uniqBy } from "lodash";
import Client, { CreatePlaylist, Paging, PagingOptions, Playlist, PlaylistTrackType, SpotifyURI, Track } from "spotify-api.js";
import { Element } from "../components/fluxify/fluxifyElement";
import { randomString } from "./misc";

export const spotifyPlaylistTitleLimit = 100;
export const spotifyPlaylistDescLimit = 300;

export const spotifyPlaylistLimit = 50;
export const spotifyTrackLimit = 50;

export const spotifyTrackAddLimit = 50;

export const createColourUri = (
    colour : string
) => {
    const size = 128;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = colour;
    ctx.rect(0, 0, size, size);
    ctx.fill();
    return canvas.toDataURL(`image/jpeg`).replace(`data:image/jpeg;base64,`, ``);
}

export const createPlaylist = async (
    client : Client,
    throwError : (error : Error) => void,
    name : string,
    desc : string,
    image? : string | null,
    options? : {
        public?: boolean,
        collab?: boolean,
    },
) => {
    const playlistOptions : CreatePlaylist = {
        name: `Fluxify-${name}-${randomString(10)}`.slice(0, spotifyPlaylistTitleLimit),
        description: `Playlist created by Fluxify, ${desc}`.slice(0, spotifyPlaylistDescLimit),
        public: options ? options.public : false,
        collaborative: options ? options.collab : false,
    };
    const playlist = await client.playlists.create(playlistOptions).catch(throwError);
    if (!playlist) return null;
    if (image || image === null) {
        const imageUri = image ? (
            createColourUri(image)
        ) : (
            await fetch(`res/fluxify.uri`).then(r => r.text()).catch(throwError)
        );
        if (!imageUri) return null;
        if (!(await playlist.uploadImage(imageUri).catch(throwError))) return null;
    }
    return playlist;
}

export const load = async <T,>(
    loader : (options?: PagingOptions) => Promise<Paging<T>>,
    throwError : (error : Error) => void,
    hitLimit : number,
) => {
    let items = [];
    let [offset, total] = [0, 0];
    do {
        let data = await loader({
            limit: hitLimit,
            offset: offset,
        }).catch(throwError);
        if (!data) return null;
        items.push(...data.items);
        offset += hitLimit;
        total = data.total;
    } while (offset < total);
    return {
        items: items,
        total: total,
    }
}

export const loadPlaylists = async (
    client : Client,
    throwError : (error : Error) => void,
) => load((o?: PagingOptions) => client.user.getPlaylists(o), throwError, spotifyPlaylistLimit);

export const loadTracks = async (
    client : Client,
    playlist : Playlist | Element<Playlist>,
    throwError : (error : Error) => void,
) => {
    const args = (p : Playlist) : [
        (options?: PagingOptions) => Promise<Paging<PlaylistTrackType>>,
        (error : Error) => void,
        number,
    ] => [
        (o?: PagingOptions) => p.getTracks(o),
        throwError,
        spotifyTrackLimit,
    ];
    if (playlist instanceof Playlist) {
        return load(...args(playlist));
    } else if (playlist.raw) {
        return load(...args(playlist.raw));
    } else {
        return loadLiked(client, throwError);
    }
};

export const loadLiked = async (
    client : Client,
    throwError : (error : Error) => void,
) => load((o?: PagingOptions) => client.user.getTracks(o), throwError, spotifyTrackLimit);

export const loadAllTracks = async (
    client : Client,
    playlists : Array<Playlist | Element<Playlist>>,
    throwError : (error : Error) => void,
) : Promise<Array<Track> | null> => {
    let tracks = [];
    for (const playlist of playlists) {
        const data = await loadTracks(client, playlist, throwError);
        if (!data) return null;
        tracks.push(...data.items);
    }
    return tracks.map(t => t.track).filter(t => t instanceof Track) as Array<Track>;
}

export const addToPlaylist = async (
    playlist : Playlist,
    uris : Array<SpotifyURI>,
    throwError : (error : Error) => void,
) => {
    let offset = 0;
    do {
        const result = await playlist.add(uris.slice(offset, offset + spotifyTrackAddLimit))
                                     .catch(throwError);
        if (!result) return false;
        offset += spotifyTrackAddLimit;
    } while (offset < uris.length);
    return true;
}

export enum ReorderMetric {
    ALBUM = `Album`,
    ARTIST = `Artist`,
    DURATION = `Track duration`,
    NAME = `Track name`,
    SHUFFLE = `Random`,

    NONE = `Default order`,
};

export const reorderTracks = (
    tracks : Array<Track>,
    metric : ReorderMetric,
    removeDuplicates? : boolean,
) => {
    if (removeDuplicates) tracks = uniqBy(tracks, t => t.uri);

    let order = (a : Track, b : Track) => 0;
    switch (metric) {
        case ReorderMetric.SHUFFLE:
            return shuffle(tracks);

        case ReorderMetric.ALBUM:
            order = (a : Track, b : Track) => {
                const albumComp = a.album.name.localeCompare(b.album.name);
                if (albumComp !== 0) return albumComp;
                return a.trackNumber - b.trackNumber;
            };
            break;
        case ReorderMetric.ARTIST:
            order = (a : Track, b : Track) => {
                if (a.artists.length === 0 || b.artists.length === 0) {
                    return a.artists.length - b.artists.length;
                }
                const artistComp = a.artists[0].name.localeCompare(b.artists[0].name);
                if (artistComp !== 0) return artistComp;
                const albumComp = a.album.name.localeCompare(b.album.name);
                if (albumComp !== 0) return albumComp;
                return a.trackNumber - b.trackNumber;
            }
            break;
        case ReorderMetric.DURATION:
            order = (a : Track, b : Track) => a.duration - b.duration;
            break;
        case ReorderMetric.NAME:
            order = (a : Track, b : Track) => a.name.localeCompare(b.name);
            break;
    }
    return tracks.sort(order);
}
