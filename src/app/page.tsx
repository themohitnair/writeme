import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

export default function Home() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <div className="max-w-3xl w-full space-y-8 text-center">
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                    README Generator
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                    Generate comprehensive README files for your GitHub repositories automatically. 
                    Just authorize access to your repository, and we&apos;ll do the rest.
                </p>

                <div className="pt-8">
                    <Link 
                        href="https://github.com/apps/writeme-bot"
                        className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-colors"
                    >
                        <FaGithub className="w-6 h-6 mr-2" />
                        Connect GitHub Repository
                    </Link>
                </div>

                <p className="text-sm text-gray-400 mt-8">
                    We only request read access to generate your README file.
                    Your code and data remain secure.
                </p>
            </div>
        </div>
    )
}