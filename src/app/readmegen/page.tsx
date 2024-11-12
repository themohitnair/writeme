"use client"

import { ReadmeGenerator } from './ReadmeGenerator'
import { redirect, useSearchParams } from 'next/navigation'

export default function ReadmeGenPage() {
    const searchParams = useSearchParams()
    const installationId = searchParams.get('installation_id')

    if (!installationId) {
        redirect('/')
    }

    return <ReadmeGenerator installationId={installationId} />
}
