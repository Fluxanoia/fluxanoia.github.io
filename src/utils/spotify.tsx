import { createCanvas } from "canvas";
import Client, { CreatePlaylist, Paging, PagingOptions, Playlist, SpotifyURI } from "spotify-api.js";
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
    playlist : Playlist,
    throwError : (error : Error) => void,
) => load((o?: PagingOptions) => playlist.getTracks(o), throwError, spotifyTrackLimit);

export const loadLiked = async (
    client : Client,
    throwError : (error : Error) => void,
) => load((o?: PagingOptions) => client.user.getTracks(o), throwError, spotifyTrackLimit);

export const loadAllTracks = async (
    playlists : Array<Playlist>,
    throwError : (error : Error) => void,
) => {
    let tracks = [];
    for (const playlist of playlists) {
        const data = await loadTracks(playlist, throwError);
        if (!data) return null;
        tracks.push(...data.items);
    }
    return tracks;
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
