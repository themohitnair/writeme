import { ReadmeGenerator } from './ReadmeGenerator'

export default function ReadmeGenPage({ searchParams }: { searchParams: { installation_id: string } }) {
    return <ReadmeGenerator installationId={searchParams.installation_id} />
}