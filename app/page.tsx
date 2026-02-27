import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-blue-100">
      
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center max-w-lg w-full border border-gray-100">
        
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Welcome!
        </h1>
        
        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
          Test for LKMX Software possition
        </p>

        <Link
          href="/users"
          className="group relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-200 ease-out shadow-lg hover:shadow-blue-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          Go to Users page
          <svg 
            className="ml-2 -mr-1 w-5 h-5 transition-transform group-hover:translate-x-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            ></path>
          </svg>
        </Link>

      </div>

      <div className="absolute bottom-4 text-slate-400 text-sm">
        Powered by Next.js & Docker
      </div>
    </main>
  );
}