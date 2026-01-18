'use client'

import React, { useState, useRef } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [transcript, setTranscript] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const transcriptRef = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setTranscript(null)
    setCopied(false)

    try {
      const response = await fetch(`/api/transcript?url=${encodeURIComponent(url)}&text=true`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || '提取字幕失败')
      }

      setTranscript(data.content)
    } catch (err) {
      setError(err instanceof Error ? err.message : '提取字幕时发生未知错误')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (transcriptRef.current && transcript) {
      navigator.clipboard.writeText(transcript)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-16 md:mb-20">
          <div className="mb-6 md:mb-8">
            <div className="w-12 h-1 md:w-16 bg-blue-600 mb-4 md:mb-6"></div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">YouTube 字幕提取工具</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl">输入 YouTube 视频链接，一键提取字幕</p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-16 md:mb-20 max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <input
                type="url"
                placeholder="https://youtu.be/dQw4w9WgXcQ"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full px-6 md:px-8 py-3 md:py-4 border-2 border-gray-300 focus:outline-none focus:border-blue-600 text-base md:text-xl bg-white transition-colors placeholder-gray-400"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full h-full px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors font-medium text-base md:text-xl"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    提取中...
                  </div>
                ) : (
                  '提取'
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-12 p-5 md:p-6 border-l-4 border-red-500 bg-red-50 max-w-3xl">
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!transcript && !error && !loading && (
          <div className="max-w-3xl mb-20">
            <div className="bg-gray-50 p-10 text-gray-600">
              <p className="text-center">输入 YouTube 视频链接，点击提取按钮获取字幕</p>
            </div>
          </div>
        )}

        {/* Transcript Display */}
        {transcript && (
          <div className="max-w-3xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <div className="w-8 md:w-12 h-1 bg-blue-600 mb-3 md:mb-4"></div>
                <h2 className="text-2xl md:text-3xl font-bold">字幕内容</h2>
              </div>
              <button
                onClick={handleCopy}
                className="mt-4 md:mt-0 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {copied ? '已复制' : '复制字幕'}
              </button>
            </div>
            <div ref={transcriptRef} className="bg-gray-50 p-8 md:p-10 text-gray-800 leading-relaxed text-base md:text-lg whitespace-pre-line">
              {transcript}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
