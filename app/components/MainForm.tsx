"use client"
import { Button, Divider, Radio, RadioGroup, Spinner, Input } from "@nextui-org/react";
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
  const [userPrefs, setUserPrefs] = useState({
    paperSize: 'a4',
    bgColor: 'f8fafc',
    textColor: '09090b'
  })
  //pasar como useSearchparams lo del usestate

  const handleSubmit = (url: string) => {
    const indexOfAlbumID = url.indexOf('/album/') + 7 // 7 = long de '/album/,' por eso se suma
    const albumID = url.slice(indexOfAlbumID, indexOfAlbumID + 22); // 22 = long de un album ID
    //const textColor = (document.querySelector('input[name="album-bg-color"]') as HTMLInputElement).value;
    //console.log(userPrefs)
    //getAlbumData(albumID);
    setLoading(true);
    router.push(
      `/${albumID}?paperSize=${userPrefs.paperSize}&bgColor=${userPrefs.bgColor}&textColor=${userPrefs.textColor}`
    );
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
                className="w-full px-3 py-3 mb-8 rounded-md focus:outline-none focus:ring focus:ring-violet-700 focus:border-violet-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
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

              {/* FORM SETTINGS */}
              <div className="bg-slate-50 bg-opacity-30 text-sm md:text-medium rounded shadow-xl p-2 py-4">
                <div className="mb-4">
                  <p className="p-1 tracking-wide text-zinc-900 text-lg font-bold text-center">ALBUM COVER SETTINGS</p>
                  <Divider className="bg-slate-50 bg-opacity-30" />
                </div>
                {/*
                <div className="space-y-2 bg-slate-300 bg-opacity-20 p-3 rounded-lg">
                  <label className="tracking-wide font-bold text-lg" htmlFor="paper-size">Paper Size</label>
                  <RadioGroup name="paperSize" onValueChange={ e => setUserPrefs( {...userPrefs, paperSize: e.valueOf()} ) } orientation="horizontal" color="secondary" defaultValue="a4">
                    <Radio value="a4">A4</Radio>
                    <Radio value="letter">Letter</Radio>
                  </RadioGroup>
                </div>
                */}
                <div className="space-y-2 mt-4 bg-slate-300 bg-opacity-20 p-3 rounded-lg">
                  <label className="tracking-wide font-bold text-lg" htmlFor="album-bg-color">Background Color</label>
                  <RadioGroup name="bgColor" onValueChange={ e => setUserPrefs( {...userPrefs, bgColor: e.valueOf()} ) } orientation="horizontal" color="secondary" defaultValue="f8fafc">
                    <Radio value="f8fafc">Light</Radio>
                    <Radio value="09090b">Dark</Radio> {/* LOS VALUE PARA COLORES DEBEN SER SIEMPRE SIN # O NO SE PASAN */}
                    <Radio value="custom">Custom</Radio> {/* OJO CON EL VALUE CUSTOM */}
                    {
                      (userPrefs.bgColor !== "f8fafc" && userPrefs.bgColor !== "09090b") &&
                      <div className="flex w-full pt-2">
                        <label htmlFor="custom-album-bg-color" className="font-bold self-center w-3/5">Pick the BACKGROUND color</label>
                        <Input className="border-none p-0 cursor-pointer bg-none" defaultValue="#ffffff" onChange={ e => setUserPrefs({...userPrefs, bgColor: e.currentTarget.value.substring(1)}) } type="color" name="bgColor" />
                      </div>
                    }
                  </RadioGroup>
                </div>
                <div className="space-y-2 mt-4 bg-slate-300 bg-opacity-20 p-3 rounded-lg">
                  <label className="tracking-wide font-bold text-lg" htmlFor="album-text-color">Text Color</label>
                  <RadioGroup name="textColor" onValueChange={ e => setUserPrefs( {...userPrefs, textColor: e.valueOf()} ) } orientation="horizontal" color="secondary" defaultValue="09090b">
                    <Radio value="f8fafc">Light</Radio>
                    <Radio value="09090b">Dark</Radio>
                    <Radio value="custom">Custom</Radio> {/* OJO CON EL VALUE CUSTOM */}
                    {
                      (userPrefs.textColor !== "f8fafc" && userPrefs.textColor !== "09090b") &&
                      <div className="flex w-full pt-2">
                        <label htmlFor="custom-album-text-color" className="font-bold self-center w-3/5">Pick the TEXT color</label>
                        <Input className="border-none p-0 cursor-pointer bg-none" defaultValue="#000000" onChange={ e => setUserPrefs({...userPrefs, textColor: e.currentTarget.value.substring(1)}) } type="color" name="textColor" />
                      </div>
                    }
                  </RadioGroup>
                </div>
              </div>
            </div>
            {/* FORM SETTINGS */}

            <Button color="secondary" variant="shadow" className="w-full py-6 font-bold text-lg" type="submit">
              GENERATE "COVER ART"
            </Button>
          </Form>
        )
      }
    </Formik>
  )
}