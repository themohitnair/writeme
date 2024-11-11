import { useState, useCallback, useMemo } from 'react'
import { FaClipboard, FaSpinner } from 'react-icons/fa'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { useRouter } from 'next/router'
import 'highlight.js/styles/github-dark.css'
import { MarkedOptions } from 'marked'

const markedOptions = {
    highlight: (code: string, lang: string) => {
        const language = hljs.getLanguage(lang) ? lang : 'plaintext'
        return hljs.highlight(code, { language }).value
    },
    langPrefix: 'hljs language-',
} as MarkedOptions

marked.setOptions(markedOptions)

export default function ReadmeGenerator() {
    const [repository, setRepository] = useState('')
    const [branch, setBranch] = useState('')
    const [readme, setReadme] = useState('')
    const [renderedReadme, setRenderedReadme] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const { installation_id } = router.query

    const generateReadme = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setReadme('')
        setRenderedReadme('')

        const branchToUse = branch || 'main'

        try {
            if (!installation_id) {
                setError('Installation ID is missing. Please authorize the app again.')
                return
            }

            const response = await fetch(
                `https://writeme-api.themohitnair.workers.dev/readmegen?repository=${encodeURIComponent(repository)}&branch=${encodeURIComponent(branchToUse)}&installation_id=${installation_id}`
            )

            if (!response.ok) {
                throw new Error('Failed to generate README')
            }

            const data = await response.text()
            setReadme(data)
            const rendered = await marked(data)
            setRenderedReadme(rendered)
        } catch (err) {
            setError('Failed to generate README. Please check your repository details and try again.')
            console.log('An Error occurred: ', err)
        } finally {
            setLoading(false)
        }
    }, [repository, branch, installation_id])

    const copyToClipboard = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(readme)
        } catch (err) {
            setError('Failed to copy to clipboard')
            console.log('An Error occurred: ', err)
        }
    }, [readme])

    const isFormValid = useMemo(() => repository.trim() !== '', [repository])

    return (
        <div className="min-h-screen bg-black text-white p-4">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-400">
                    Generate Your README
                </h1>

                <form onSubmit={generateReadme} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="repository" className="block text-sm font-medium text-gray-300">
                            Repository / Branch
                        </label>
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                id="repository"
                                value={repository}
                                onChange={(e) => setRepository(e.target.value)}
                                placeholder="repository"
                                required
                                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="text-gray-400">/</span>
                            <input
                                type="text"
                                id="branch"
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                placeholder="branch"
                                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <p className="text-xs text-gray-400">
                            Format: repository/branch (branch is optional, defaults to main)
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
                                Generating...
                            </span>
                        ) : (
                            'Generate README'
                        )}
                    </button>
                </form>

                {error && (
                    <div className="p-4 text-red-400 bg-red-900/20 rounded-lg">
                        {error}
                    </div>
                )}

                {renderedReadme && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-blue-400">Generated README</h2>
                            <button
                                onClick={copyToClipboard}
                                className="inline-flex items-center px-3 py-1 text-sm text-blue-400 border border-blue-400 rounded-lg hover:bg-blue-400/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900"
                            >
                                <FaClipboard className="w-4 h-4 mr-2" />
                                Copy to Clipboard
                            </button>
                        </div>
                        <div
                            className="prose prose-invert max-w-none bg-gray-800 rounded-lg p-4 overflow-auto"
                            dangerouslySetInnerHTML={{ __html: renderedReadme }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}