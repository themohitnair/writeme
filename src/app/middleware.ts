import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const installationId = request.nextUrl.searchParams.get('installation_id')

    if (request.nextUrl.pathname === '/readmegen' && !installationId) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/readmegen',
}