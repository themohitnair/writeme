'use client'

import { useState, useCallback, useMemo } from 'react'
import { FaClipboard, FaSpinner, FaHome } from 'react-icons/fa'
import Link from 'next/link'

interface ReadmeFormProps {
  initialInstallationId?: string
}

export default function ReadmeForm({ initialInstallationId }: ReadmeFormProps) {
    const [owner, setOwner] = useState('')
    const [repository, setRepository] = useState('')
    const [branch, setBranch] = useState('')
    const [readme, setReadme] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const generateReadme = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setReadme('')

        const branchToUse = branch || 'main'

        try {
            if (!initialInstallationId) {
                setError('Installation ID is missing. Please authorize the app again.')
                return
            }

            const response = await fetch(
                `https://writeme-api.themohitnair.workers.dev/readmegen?owner=${encodeURIComponent(owner)}&repository=${encodeURIComponent(repository)}&branch=${encodeURIComponent(branchToUse)}&installation_id=${initialInstallationId}`
            )

            if (!response.ok) {
                throw new Error('Failed to fetch repository content')
            }

            const data = await response.json()

            let content = ''
            for (const [filePath, fileContent] of Object.entries(data)) {
                content += `### File: ${filePath}\n\n`
                content += `${fileContent}\n\n`
            }

            setReadme(content)
        } catch (err) {
            setError('Failed to fetch repository content. Please check your repository details and try again.')
            console.error('An Error occurred: ', err)
        } finally {
            setLoading(false)
        }
    }, [owner, repository, branch, initialInstallationId])

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(readme)
        } catch (err) {
            setError('Failed to copy to clipboard')
            console.error('An Error occurred: ', err)
        }
    }, [readme])

    const isFormValid = useMemo(() => owner.trim() !== '' && repository.trim() !== '', [owner, repository])

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-400">
                        View Repository Content
                    </h1>
                    <Link href="/" className="inline-flex items-center px-4 py-2 text-sm text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-colors">
                        <FaHome className="w-4 h-4 mr-2" />
                        Go back Home
                    </Link>
                </div>

                <form onSubmit={generateReadme} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="owner" className="block text-sm font-medium text-gray-300">
                            Owner / Repository / Branch
                        </label>
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                            <input
                                type="text"
                                id="owner"
                                value={owner}
                                onChange={(e) => setOwner(e.target.value)}
                                placeholder="owner"
                                required
                                className="w-full sm:w-auto flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="hidden sm:inline text-gray-400">/</span>
                            <input
                                type="text"
                                id="repository"
                                value={repository}
                                onChange={(e) => setRepository(e.target.value)}
                                placeholder="repository"
                                required
                                className="w-full sm:w-auto flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="hidden sm:inline text-gray-400">/</span>
                            <input
                                type="text"
                                id="branch"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                placeholder="branch"
                                className="w-full sm:w-auto flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <p className="text-xs text-gray-400">
                            Format: owner/repository/branch (branch is optional, defaults to main)
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !isFormValid}
                        className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? (
                            <span className="inline-flex items-center">
                                <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                                Fetching Content...
                            </span>
                        ) : (
                            'View Repository Content'
                        )}
                    </button>
                </form>

                {error && (
                    <div className="p-4 text-red-400 bg-red-900/20 rounded-lg">
                        {error}
                    </div>
                )}

                {readme && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-blue-400">Repository Content</h2>
                        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto max-h-96">
                            {readme}
                        </pre>
                        <button
                            onClick={copyToClipboard}
                            className="inline-flex items-center px-3 py-1 text-sm text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                        >
                            <FaClipboard className="w-4 h-4 mr-2" />
                            Copy to Clipboard
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}