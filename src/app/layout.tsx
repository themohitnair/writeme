import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'writeme',
    description: 'Generate Your Perfect README',
    icons: "/favicon/writeme.svg"
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="">
            <head>
                <link rel="icon" type="image/svg+xml" href="/favicon/writeme.svg" />
            </head>
            <body>{children}</body>
        </html>
    )
}