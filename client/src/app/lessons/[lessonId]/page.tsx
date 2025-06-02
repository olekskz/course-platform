'use client'

import { useParams, useRouter } from 'next/navigation'
import { useGetLesson } from '@/hooks/useLesson'
import Link from 'next/link'

const getEmbedUrl = (url: string) => {
    try {
        const videoId = url.split('v=')[1]?.split('&')[0] 
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`
        }
        return url
    } catch (error) {
        return url
    }
}

export default function LessonPage() {
    const { lessonId } = useParams<{ lessonId: string }>()
    const router = useRouter()
    const { lesson, lessonLoading, lessonError } = useGetLesson(lessonId)

    if (lessonLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    if (lessonError) {
        return <div className="text-red-500">Error: {lessonError.message}</div>
    }

    if (!lesson) {
        return <div>Lesson not found</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Add Exit Preview Button */}
            <div className="bg-black text-white px-4 py-2 text-center">
                <button 
                    onClick={() => router.push('/api/preview/exit-preview')}
                    className="text-sm underline hover:text-gray-300"
                >
                    Exit Preview Mode
                </button>
            </div>

            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
                        <h1 className="text-3xl font-bold">{lesson.title}</h1>
                        
                        {lesson.videoUrl && (
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
                                <iframe
                                    src={getEmbedUrl(lesson.videoUrl)}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                                />
                            </div>
                        )}
                        
                        <div className="prose max-w-none">
                            {lesson.content}
                        </div>

                        {lesson.materials && (
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold mb-4">Additional Materials</h2>
                                <div className="prose max-w-none">
                                    {lesson.materials}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}