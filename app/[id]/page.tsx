import { getAlbumData } from "@/app/utils/getAlbumData";
import Album from "../components/Album";

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
      <Album albumData={albumData} longAlbum={longAlbum}/>
    )
  }
}