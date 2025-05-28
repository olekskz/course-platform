'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGetCourseById } from "@/hooks/useCourse"
import { useParams } from "next/navigation"
import { useUpdateCourse } from "@/hooks/useCourse"

type Lesson = {
    id: string;
    title: string;
    order: number;
}


export default function EditCoursePage() {
    const { courseId } = useParams<{courseId: string}>()
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [price, setPrice] = useState<string>("0") 
    const [hours, setHours] = useState<string>("0") 
    const [image, setImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string>("/assets/default-image")
    const [isActive, setIsActive] = useState<boolean>(false)
    const [lessons, setLessons] = useState<Lesson[]>([])
    
    const { courseData, courseError, courseLoading } = useGetCourseById(courseId)
    

    useEffect(() => {
        if (courseData?.getCourseById) {
            setTitle(courseData.getCourseById.title || "")
            setDescription(courseData.getCourseById.description || "")
            setPrice(courseData.getCourseById.price?.toString() || "0")
            setHours(courseData.getCourseById.hours?.toString() || "0")
            setImagePreview(courseData.getCourseById.image || "/assets/default-image")
            setIsActive(!!courseData.getCourseById.isActive)
        }
    }, [courseData]) 

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImage(file)
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        }
    }

    
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setPrice(value)
        }
    }

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            setHours(value)
        }
    }

    const { updateCourse } = useUpdateCourse()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => { 
        event.preventDefault();

        try {
            const formData = new FormData()
            formData.append('id', courseId)
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('hours', hours);
            formData.append('isActive', String(isActive));
            
            if (image) {
                formData.append('image', image)
            }

            await updateCourse(formData)
        } catch (err) {
            console.error("Update course error", err)
        }
    }

    if (courseLoading) return <div>Loading...</div>;
    if (courseError) return <div>Error: {courseError}</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header with navigation */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Edit Course</h1>
                    <Link 
                        href="/dashboard/instructor"
                        className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Main content */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left side - Course details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Course Details</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Course Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                        <span className="text-gray-400 text-xs ml-2">
                                            ({description.length}/500 characters)
                                        </span>
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => {
                                            if (e.target.value.length <= 500) {
                                                setDescription(e.target.value)
                                            }
                                        }}
                                        rows={4}
                                        maxLength={500}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="block text-sm font-medium text-gray-700 mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price
                                    </label>
                                    <input
                                        value={price}
                                        onChange={handlePriceChange}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div className="block text-sm font-medium text-gray-700 mb-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Hours
                                    </label>
                                    <input
                                        value={hours}
                                        onChange={handleHoursChange}
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Lessons section */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                            <div className="space-y-4">
                                {lessons.map((lesson, index) => (
                                    <div key={lesson.id} className="flex items-center p-3 bg-gray-50 rounded-md">
                                        <span className="mr-4 text-gray-500">{index + 1}</span>
                                        <span className="flex-grow">{lesson.title}</span>
                                        <button className="text-gray-500 hover:text-gray-700">Edit</button>
                                    </div>
                                ))}
                                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-500 hover:text-gray-700 hover:border-gray-400">
                                    + Add Lesson
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Course preview */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Course Image</h2>
                            <div className="space-y-4">
                                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md mb-4">
                                    <Image 
                                        src={imagePreview}
                                        width={200}
                                        height={200}
                                        alt="Course preview"
                                        className="rounded-md object-cover w-full h-54"
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Change Image
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    />
                                </div>
                                {/* Add course status toggle */}
                                <div className="mt-4 flex items-center justify-between">
                                    <label className="text-sm font-medium text-gray-700">
                                        Course Status
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsActive(false)}
                                            className={`px-3 py-1 text-sm rounded-md ${
                                                !isActive 
                                                    ? 'bg-gray-200 text-gray-800' 
                                                    : 'bg-white text-gray-500 border border-gray-300'
                                            }`}
                                        >
                                            Draft
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsActive(true)}
                                            className={`px-3 py-1 text-sm rounded-md ${
                                                isActive 
                                                    ? 'bg-green-600 text-white' 
                                                    : 'bg-white text-gray-500 border border-gray-300'
                                            }`}
                                        >
                                            Publish
                                        </button>
                                    </div>
                                </div>
                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-4">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}