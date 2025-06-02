'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useGetLesson, useUpdateLesson } from '@/hooks/useLesson';

export default function EditLessonPage() {
    const router = useRouter();
    const { courseId, lessonId } = useParams<{courseId: string, lessonId: string}>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [lessonOrder, setLessonOrder] = useState(1);
    const [materials, setMaterials] = useState('');
    const [error, setError] = useState('');

    const { lesson, lessonLoading, lessonError } = useGetLesson(lessonId);
    const { updateLesson, updateLoading } = useUpdateLesson();

    useEffect(() => {
        if (lesson) {
            setTitle(lesson.title || "");
            setContent(lesson.content || "");
            setVideoUrl(lesson.videoUrl || "");
            setLessonOrder(lesson.lessonOrder || 1);
            setMaterials(lesson.materials || '');
        }
    }, [lesson]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const result = await updateLesson({
                id: lessonId,
                title,
                content,
                videoUrl,
                lessonOrder,
                materials,
                courseId: courseId
            });

            if (result.success) {
                router.push(`/dashboard/instructor/courses/${courseId}`);
            } else {
                setError(result.error || 'Failed to update lesson');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };

    if (lessonLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    if (lessonError) {
        return <div className="text-red-500">Error: {lessonError.message}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Edit Lesson</h1>
                    <Link 
                        href={`/dashboard/instructor/courses/${courseId}`}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        ← Back to Course
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lesson Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={10}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Video URL
                        </label>
                        <input
                            type="url"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lesson Order
                        </label>
                        <input
                            type="number"
                            value={lessonOrder}
                            onChange={(e) => setLessonOrder(parseInt(e.target.value))}
                            min="1"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Additional Materials (Optional)
                        </label>
                        <textarea
                            value={materials}
                            onChange={(e) => setMaterials(e.target.value)}
                            rows={4}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        {lesson && (
                            <Link 
                                href={`/api/preview?redirect=/lessons/${lessonId}&courseId=${courseId}`}
                                prefetch={false}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Preview Lesson
                            </Link>
                        )}
                        <Link
                            href={`/dashboard/instructor/courses/${courseId}`}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={updateLoading}
                            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer ${
                                updateLoading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {updateLoading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}