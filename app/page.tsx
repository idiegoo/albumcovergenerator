import MainForm from "@/app/components/MainForm"

export default function Home() {
  return (
    <main className="min-h-screen bg-offwhite dark:bg-gray-900 flex items-start pt-4 justify-center">
      <section className="w-full max-w-md mx-auto p-4 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 tracking-wide dark:text-gray-50 mb-4">"ALBUM COVER GENERATOR"</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Enter a Spotify album URL to generate your album cover art.
        </p>
      </div>
      <MainForm />
      <p className='text-sm text-center'>This project is not affiliated with Spotify or its subsidiaries/affiliates.</p>
      </section>
    </main>
  )
}
