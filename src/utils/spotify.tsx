import Client, { CreatePlaylist, Paging, PagingOptions, Playlist, SpotifyURI, UnexpectedError } from "spotify-api.js";
import { randomString } from "./misc";

export const spotifyPlaylistTitleLimit = 100;
export const spotifyPlaylistDescLimit = 300;

export const spotifyPlaylistLimit = 50;
export const spotifyTrackLimit = 50;

export const spotifyTrackAddLimit = 50;

export const createPlaylist = async (
    client : Client,
    throwError : (error : Error) => void,
    name : string,
    desc : string,
    options? : {
        public?: boolean,
        collab?: boolean,
    }
) => {
    const playlistOptions : CreatePlaylist = {
        name: `${name}-${randomString(10)}`.slice(0, spotifyPlaylistTitleLimit),
        description: `Playlist created by Fluxify, ${desc}`.slice(0, spotifyPlaylistDescLimit),
        public: options ? options.public : false,
        collaborative: options ? options.collab : false,
    };
    return await client.playlists.create(playlistOptions).catch(throwError);
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
        if (!data) {
            throwError(new UnexpectedError("Failed to load (useSpotifyPlaylists)."));
            return null;
        }
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
        if (data) tracks.push(...data.items);
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
        await playlist.add(uris.slice(offset, offset + spotifyTrackAddLimit)).catch(throwError);
        offset += spotifyTrackAddLimit;
    } while (offset < uris.length);
}
