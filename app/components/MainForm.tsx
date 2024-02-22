"use client"
import { Button, Spinner } from "@nextui-org/react";
import { Field, Form, Formik } from "formik"
import { GiInfo } from "react-icons/gi";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const albumURLformats = [
  '^https:\/\/open\.spotify\.com\/album\/[a-zA-Z0-9]{22,}', // MOBILE link
  '^https:\/\/open\.spotify\.com\/intl-[a-z]{2}\/album\/[a-zA-Z0-9]{22,}', // APP PC link
];

function validateSpotifyAlbumURL(url: string) {
  let error;
  // Albumes actuales tienen long de 22 caracteres
  //Ej link MOBILE: https://open.spotify.com/album/6y0igZArWVi6Iz0rj35c1Y
  //Ej link APP PC: https://open.spotify.com/intl-es/album/6y0igZArWVi6Iz0rj35c1Y

  if (!url) {
    error = 'Introduce a Spotify album URL';
  } else if (!albumURLformats.some((format) => url.match(format))) {
    error = 'Invalid Spotify album URL format';
  }
  return error;
}

export default function MainForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (url: string) => {
    const indexOfAlbumID = url.indexOf('/album/') + 7 // 7 = long de '/album/,' por eso se suma
    const albumID = url.slice(indexOfAlbumID, indexOfAlbumID + 22); // 22 = long de un album ID
    //getAlbumData(albumID);
    setLoading(true);
    router.push(`/${albumID}`);
  }

  return (
    <Formik
      initialValues={{ 'spotify-url': '' }}
      // onSubmit={ (value) => { getAlbumData(value.url) } }
      onSubmit={(values) => {
        handleSubmit(values['spotify-url'])
      }}
    >
      {
        ({ errors, touched }) => (
          <Form className="space-y-4 w-full">
            <div className="space-y-2">
              <label className="tracking-wide font-bold text-gray-50" htmlFor="url">Spotify Album URL:</label>
              <Field
                name="spotify-url"
                className="w-full px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-violet-700 focus:border-violet-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
                placeholder="https://open.spotify.com/album/..."
                required
                type="url"
                validate={validateSpotifyAlbumURL}
              />
              {errors['spotify-url'] && touched['spotify-url'] &&
                <div className="text-danger-500 flex flex-wrap gap-1 items-center rounded-md">
                  <GiInfo />
                  <p>{errors['spotify-url']}</p>
                </div>
              }
              {loading &&
                <div className="flex items-center flex-wrap gap-1 justify-center">
                  <p className="text-sm font-bold text-secondary">Generating "cover art"...</p>
                  <Spinner color="secondary" size="md" />
                </div>
              }
            </div>
            <Button color="secondary" variant="shadow" className="w-full font-bold" type="submit">
              GENERATE "COVER ART"
            </Button>
          </Form>
        )
      }
    </Formik>
  )
}