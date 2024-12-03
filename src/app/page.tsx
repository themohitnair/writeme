import Link from 'next/link';
import { LightBulbIcon, CodeBracketIcon } from '@heroicons/react/24/solid';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-[#020814] text-white font-['GeistMono']">
            <main className="text-center max-w-2xl px-6 sm:px-4">
                {/* Header Section */}
                <h1 className="text-4xl sm:text-3xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    writeme
                </h1>
                <h2 className="text-2xl sm:text-xl md:text-3xl font-semibold mb-6">
                    Generate Your Perfect README
                </h2>
                <p className="text-base sm:text-sm md:text-lg mb-10 text-gray-300 leading-relaxed">
                    Authorize our GitHub app to access your repository and let AI
                    create a comprehensive README tailored to your project.
                </p>

                {/* Call-to-Action Button */}
                <Link
                    href="/api/auth/github"
                    className="
                        inline-flex items-center justify-center
                        bg-gradient-to-r from-blue-500 to-indigo-500
                        text-white px-6 py-3 rounded-full
                        font-bold text-lg shadow-lg
                        transition-transform duration-300 ease-in-out
                        hover:scale-105 hover:shadow-2xl
                    "
                >
                    <LightBulbIcon className="w-5 sm:w-4 md:w-6 h-5 sm:h-4 md:h-6 mr-2 animate-pulse" />
                    Authorize GitHub Access
                </Link>
            </main>

            {/* Source Code Section */}
            <section className="mt-16 text-center max-w-2xl px-6 sm:px-4">
                <h3 className="text-xl sm:text-lg md:text-2xl font-bold mb-4">
                    Explore the Source Code
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                    Want to dive deeper? The source code for <span className="font-bold">writeme</span> is available on GitHub. 
                    Feel free to explore, contribute, or adapt it to your needs.
                </p>
                <Link
                    href="https://github.com/themohitnair/writeme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        inline-flex items-center justify-center
                        bg-gradient-to-r from-gray-700 to-gray-900
                        text-white px-6 py-3 rounded-full
                        font-bold text-lg shadow-lg
                        transition-transform duration-300 ease-in-out
                        hover:scale-105 hover:shadow-2xl
                    "
                >
                    <CodeBracketIcon className="w-5 sm:w-4 md:w-6 h-5 sm:h-4 md:h-6 mr-2" />
                    View Source on GitHub
                </Link>
            </section>

            {/* Decorative Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 left-1/3 w-80 sm:w-60 md:w-96 h-80 sm:h-60 md:h-96 bg-blue-700 rounded-full opacity-10 blur-3xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-64 sm:w-48 md:w-80 h-64 sm:h-48 md:h-80 bg-indigo-700 rounded-full opacity-10 blur-3xl"></div>
            </div>
        </div>
    );
}