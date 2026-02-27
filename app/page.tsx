import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 m-4">
            Welcome!
          </h1>

          <Link
            href="/users"
            className="text-white font-bold py-2 px-4 rounded m-auto bg-blue-600 hover:bg-blue-700"
          >
            Go to Users page
          </Link>
        </div>

      </div>

      <div className="absolute bottom-4 text-slate-400 text-sm">
        Powered by Next.js & Docker
      </div>
    </div>
  );
}