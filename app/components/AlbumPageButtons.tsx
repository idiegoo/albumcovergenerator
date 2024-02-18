"use client"
import { Button } from "@nextui-org/react"
import { printDocument } from "../utils/printDocument"
import { useRouter } from 'next/navigation'

export default function AlbumPageButtons({ albumName }: { albumName: string }) {
  const router = useRouter()
  return (
    <div className="flex flex-wrap gap-10 align-center justify-center p-3">
      <Button size="lg" color="primary" variant="shadow" className="p-5 font-bold" onClick=
        {
          () => printDocument(albumName,
            document.getElementById('ref') as HTMLDivElement)
        }>
        Download PDF
      </Button>
      <Button size="lg" color="secondary" variant="shadow" className="p-5 font-bold" onClick={() => router.replace('../')}>
        Back to Home
      </Button>
    </div>
  )
}