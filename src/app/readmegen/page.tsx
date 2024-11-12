import { ReadmeGenerator } from './ReadmeGenerator'
import { redirect } from 'next/navigation'

type SearchParams = {
    installation_id?: string
}

export default function ReadmeGenPage({
    searchParams,
}: {
    searchParams: SearchParams
}) {
    if (!searchParams.installation_id) {
        redirect('/')
    }
    return <ReadmeGenerator installationId={searchParams.installation_id} />
}