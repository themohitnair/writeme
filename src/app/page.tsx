import { Suspense } from 'react'
import ReadmeForm from './readme-form'

export default function Page() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black text-white p-4">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-800 rounded w-1/3"></div>
                        <div className="h-32 bg-gray-800 rounded"></div>
                        <div className="h-8 bg-gray-800 rounded w-1/4"></div>
                    </div>
                </div>
            </div>
        }>
            <ReadmeForm />
        </Suspense>
    )
}