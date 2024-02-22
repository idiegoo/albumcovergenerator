import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import convertDate from './convertDate';
import { extractColors } from 'extract-colors'; // https://www.npmjs.com/package/extract-colors
import { cache } from 'react';

const getPixels = require('get-pixels');

const client_id = process.env.SPOTIFY_CLIENT_ID!.toString();
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!.toString();


export interface Data {
  albumName: string;
  artists: string[];
  release_date: string;
  tracks: string[];
  photoURL: string;
  colorPalette: string[];
}

// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-third-party-libraries

export const getAlbumData = cache(async (albumID: string) => {
  const sdk = SpotifyApi.withClientCredentials(client_id, client_secret);
  const items = await sdk.albums.get(albumID);
  //console.log(items);

  const artistNames = items.artists.map(artist => artist.name);
  const photoURL = items.images[0].url;

  function getColors(photoURL: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      getPixels(photoURL, (err: Error, pixels: { data: number[] }) => {
        if (err) {
          reject(err);
          return;
        }

        const data = [...pixels.data];
        const width = Math.round(Math.sqrt(data.length / 4));// px / 4
        const height = width;

        extractColors({ data, width, height })
          .then(colors => resolve(colors.map(color => color.hex)))
          .catch(reject);
      });
    });
  }

  const colorPalette = (await getColors(photoURL));
  //console.log(colorPalette);

  const data: Data = {
    albumName: items.name,
    artists: artistNames,
    release_date: convertDate(items.release_date, items.release_date_precision),
    tracks: items.tracks.items.map(track => track.name),
    photoURL: photoURL,
    colorPalette: colorPalette,
  };

  return data;
});