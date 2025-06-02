'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useGetCourseById } from "@/hooks/useCourse"
import { useParams } from "next/navigation"
import { useUpdateCourse } from "@/hooks/useCourse"
import CourseDeleteModal from "@/components/modals/courseDeleteModal"
import { useGetLessons } from "@/hooks/useLesson"
import Footer from "@/components/footer"
import { useMemo } from 'react';

interface Lesson {
  id: string;
  title: string;
  lessonOrder: number;
  content: string;
  videoUrl: string;
  materials?: string;
  courseId: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  hours: number;
  isActive: boolean;
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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const { courseData, courseError, courseLoading } = useGetCourseById(courseId)

    useEffect(() => {
        if (courseData?.getCourseById?.course) {
            const { course } = courseData.getCourseById;
            setTitle(course.title)
            setDescription(course.description)
            setPrice(course.price?.toString() || "0")
            setHours(course.hours?.toString() || "0")
            setImagePreview(course.image)
            setIsActive(course.isActive)
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

    const sortedLessons = useMemo(() => {
        if (!courseData?.getCourseById?.lessons) return [];
        return [...courseData.getCourseById.lessons].sort((a, b) => a.lessonOrder - b.lessonOrder);
    }, [courseData?.getCourseById?.lessons]);

    if (courseLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (courseError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-red-500">Error: {courseError.message}</div>
            </div>
        );
    }

    if (!courseData?.getCourseById?.course) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Course not found</div>
            </div>
        );
    }


    return (
        <>
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
                                        rows={7}
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
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Course Content</h2>
                                <span className="text-sm text-gray-500">
                                    {sortedLessons.length} {sortedLessons.length === 1 ? 'lesson' : 'lessons'}
                                </span>
                            </div>
                            <div className="space-y-4">
                                {sortedLessons.length > 0 ? (
                                    sortedLessons.map((lesson) => (
                                        <div 
                                            key={lesson.id} 
                                            className="flex items-center p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                                        >
                                            <span className="mr-4 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full">
                                                {lesson.lessonOrder}
                                            </span>
                                            <span className="flex-grow font-medium">{lesson.title}</span>
                                            <Link 
                                                href={`/dashboard/instructor/courses/${courseId}/lessons/create/edit/${lesson.id}`}
                                                className="text-gray-500 hover:text-blue-600 transition-colors"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        No lessons added yet
                                    </div>
                                )}
                                <Link 
                                    href={`/dashboard/instructor/courses/${courseId}/lessons/create`}
                                    className="flex items-center justify-center w-full py-4 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-all"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add New Lesson
                                </Link>
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
                                <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors mt-4 cursor-pointer"
                                    onClick={() =>  setIsDeleteModalOpen(true)}
                                    type="button"
                                >
                                    Delete Course
                                </button>
                                <CourseDeleteModal 
                                    isOpen={isDeleteModalOpen} 
                                    onClose={() => setIsDeleteModalOpen(false)} 
                                    courseId={courseId}
                                />
                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors cursor-pointer">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
        </>
    )
}