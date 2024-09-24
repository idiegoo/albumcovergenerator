import MainForm from "@/app/components/MainForm";
import Footer from "./components/Footer";
import { Card, CardBody } from "@nextui-org/react";
import CoveritLogo from "./components/CoveritLogo";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-950 to-zinc-800 flex flex-col justify-between">
      <section className="flex flex-col p-4 justify-center items-center">
        <div className="justify-center items-center align-middle p-4">
          <CoveritLogo className="h-20 w-64" viewBox="0 0 188 36"/>
        </div>
        <Card isBlurred shadow="sm" className="border-none bg-background/40 xl:w-1/3">
          <CardBody className="min-h-96 space-y-2 md:space-y-6">
              <h1 className="text-xl font-extrabold tracking-wide mb-4 md:mb-0 text-center bg-clip-text text-transparent bg-gradient-to-r from-lime-50 to-stone-50">
                Make your custom album covers <span className="bg-clip-text bg-gradient-to-r brightness-125 from-pink-500 via-stone-50 to-yellow-200 text-transparent animate-gradient" >instantly!</span>
              </h1>
            <MainForm />
            <p className="text-sm text-zinc-900 pt-4 md:pt-0 text-center">This project is not affiliated with Spotify or its subsidiaries/affiliates.</p>
          </CardBody>
        </Card>
      </section>
      <Footer />
    </main>
  );
}
