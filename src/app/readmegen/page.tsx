import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { ReadmeGenerator } from './ReadmeGenerator'

type SearchParams = {
    installation_id?: string
}

export default async function ReadmeGenPage({
    searchParams,
}: {
    searchParams: SearchParams
}) {
    if (!searchParams.installation_id) {
        redirect('/')
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReadmeGenerator installationId={searchParams.installation_id} />
        </Suspense>
    )
}
