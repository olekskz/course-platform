'use client'

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useCreateLesson } from "@/hooks/useLesson";
import Footer from "@/components/footer";


export default function CreateLessonPage() {
    const { courseId } = useParams<{ courseId: string }>();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [order, setOrder] = useState(1);
    const [material, setMaterials] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { createLesson, lessonLoading, lessonError } = useCreateLesson()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            
            const result = await createLesson({
                title,
                content,
                videoUrl,
                lessonOrder: order,
                courseId,
                materials: material
            })

            if (result.success) {
                setError(result.message || null)
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Create New Lesson</h1>
                    <Link 
                        href={`/dashboard/instructor/courses/${courseId}`}
                        className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                        ← Back to Course
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                    <div className="bg-white shadow-sm rounded-lg p-6 space-y-6">
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
                                <span className="text-gray-400 text-xs ml-2">
                                    ({content.length}/1000 characters)
                                </span>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows={10}
                                maxLength={1000}
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
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Materials (optional)
                            </label>
                            <input
                                type="text"
                                value={material}
                                onChange={(e) => setMaterials(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lesson Order
                            </label>
                            <input
                                type="number"
                                value={order}
                                onChange={(e) => setOrder(parseInt(e.target.value))}
                                min="1"
                                required
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div className="flex justify-end space-x-4">
                            <Link
                                href={`/dashboard/instructor/courses/${courseId}`}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? 'Creating...' : 'Create Lesson'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}