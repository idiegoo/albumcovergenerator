import { getAlbumData } from "@/app/utils/getAlbumData";
import Image from "next/image";
import { Roboto_Mono } from "next/font/google";
import AlbumPageButtons from "@/app/components/AlbumPageButtons";
import { Button } from "@nextui-org/react";

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ['100', '300', '400', '500', '700']
});

export const revalidate = 3600// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-third-party-libraries

export default async function AlbumPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const albumData = await getAlbumData(id)
  let longAlbum = false
  if (albumData) {
    //console.log(albumData)
    if (albumData.tracks.length >= 17) {
      longAlbum = true
    }
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 pb-6 w-a4 md:w-full">{/* A4 size DEFAULT*/}
        <AlbumPageButtons albumName={albumData.albumName} />
        <div id="ref" className="flex flex-col bg-slate-50 p-8 shadow-lg overflow-visible h-a4 w-a4">{/* A4 size DEFAULT*/}
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col items-center">
              <Image
                sizes="1x" // Evita el zoom de la img al descargar pdf
                priority={true}
                src={albumData.photoURL}
                height={longAlbum ? 450 : 500}
                width={longAlbum ? 450 : 500}
                alt="Album Picture"
                className={`shadow-2xl ${longAlbum ? 'mb-6' : 'mb-4'}`}
                quality={100}
              />
            </div>
            <div className="flex items-start gap-1 justify-between">
              <div className="flex flex-col">
                <div className={`${albumData.tracks.length <= 12 ? 'text-xl' :
                  albumData.tracks.length <= 17 ? 'text-lg' : 'text-s'
                  } leading-tight`}> {/* Con 17max queda bien en lg */}
                  {
                    albumData.tracks.slice(0, longAlbum ? 18 : albumData.tracks.length)
                      .map(
                        (track, index) => (
                          <p className={`${robotoMono.variable} font-mono mb-0.5`} key={index + 1}>
                            {index + 1}.- {track}
                          </p>
                        )
                      )
                  }
                </div>
              </div>
              {
                longAlbum && (
                  <div className="flex flex-col">
                    <div className="text-s leading-tight">
                      {
                        albumData.tracks.slice(18).map((track, index) => (
                          <p className={`${robotoMono.variable} font-mono mb-0.5`} key={index + 19}>
                            {index + 19}.- {track}
                          </p>
                        )
                        )}
                    </div>
                  </div>
                )
              }
            </div>
            <div className="flex flex-col">
              <div className="flex flex-grow">
                <h1 className={`${albumData.tracks.length <= 12 ? 'text-3xl' : 'text-2xl'} font-bold mt-3 flex-1`}>
                  {albumData.albumName}
                </h1>
                <div className="flex space-x-2 m-3">
                  {
                    albumData.colorPalette.map(color => (
                      <div key={color} style={
                        {
                          backgroundColor: `${color}`,
                          WebkitBoxShadow: "0px 0px 10px 2px rgba(0,0,0,0.15)",
                          boxShadow: "0px 0px 10px 2px rgba(0,0,0,0.15)"
                        }
                      }
                        className="box-content w-7 h-7"></div>
                    )
                    )
                  }
                </div>
              </div>
              <div className="flex flex-grow">
                <p className={`${albumData.tracks.length <= 12 ? 'text-3xl' : 'text-2xl'} mt-1 flex-1`}>
                  {albumData.artists.map((artist, index) => (<span key={index}>{index > 0 && ", "}{artist}</span>)
                  )
                  }
                </p>
                <p className="font-bold self-center">{albumData.release_date}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}