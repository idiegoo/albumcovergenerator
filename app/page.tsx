import MainForm from "@/app/components/MainForm";
import Footer from "./components/Footer";
import { Card, CardBody } from "@nextui-org/react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-950 to-zinc-800 flex flex-col justify-between">
      <section className="flex-grow flex p-4 justify-center items-center">
        <Card isBlurred shadow="sm" className="border-none bg-background/40 xl:w-1/3">
          <CardBody className="flex flex-col min-h-96 space-y-2 md:space-y-6">
            <div className="text-center space-y-6">
              <h1 className="text-2xl font-bold tracking-wide text-gray-800 mb-4">"ALBUM COVER GENERATOR"</h1>
              <p className="text-zinc-900 pb-2">
                Enter a Spotify album URL to generate your album cover art.
              </p>
            </div>
            <MainForm />
            <p className="text-sm text-zinc-900 pt-4 md:pt-0 text-center">This project is not affiliated with Spotify or its subsidiaries/affiliates.</p>
          </CardBody>
        </Card>
      </section>
      <Footer />
    </main>
  );
}
