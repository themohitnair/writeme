import { Suspense } from 'react'
import ReadmeForm from './readme-form'

interface PageProps {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default function Page({ searchParams }: PageProps) {
    const installation_id = searchParams.installation_id as string

    return (
        <Suspense fallback={<FormSkeleton />}>
            <ReadmeForm initialInstallationId={installation_id} />
        </Suspense>
    )
}

function FormSkeleton() {
    return (
        <div className="min-h-screen bg-black text-white p-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div className="h-8 w-64 bg-gray-800 animate-pulse"></div>
                    <div className="h-10 w-32 bg-gray-800 animate-pulse"></div>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <div className="h-6 w-40 bg-gray-800 animate-pulse"></div>
                        <div className="space-y-2">
                            <div className="h-10 w-full bg-gray-800 animate-pulse"></div>
                            <div className="h-10 w-full bg-gray-800 animate-pulse"></div>
                            <div className="h-10 w-full bg-gray-800 animate-pulse"></div>
                        </div>
                    </div>
                    <div className="h-10 w-full bg-gray-800 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}