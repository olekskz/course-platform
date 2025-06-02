'use client';
import { useGetCourseById } from "@/hooks/useCourse";
import { useParams } from "next/navigation";
import Image from "next/image";
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

export default function CoursePage() {
  const { course } = useParams<{course: string}>();
  const { courseData, courseLoading, courseError } = useGetCourseById(course);

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

  if (!courseData?.getCourseById) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Course not found</div>
      </div>
    );
  }

  const { course: courseInfo, lessons } = courseData.getCourseById;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Title, Image, About, Content */}
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-6">{courseInfo.title}</h1>
            <Image 
              src={courseInfo.image} 
              width={250} 
              height={250} 
              alt={courseInfo.title}
              className="rounded-lg mb-6"
            />

            <div className="mb-6">
              <h2 className="font-bold text-xl mb-2">About</h2>
              <p className="text-gray-700">
                {courseInfo.description}
              </p>
            </div>

            <div>
              <h2 className="font-bold text-xl mb-2">Course Content</h2>
              <div className="bg-gray-100 rounded-md divide-y">
                {sortedLessons.map((lesson) => (
                  <div key={lesson.id} className="flex items-center px-4 py-3">
                    <button className="mr-4 text-gray-600">
                      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="8,5 19,12 8,19" fill="currentColor" />
                      </svg>
                    </button>
                    <span className="font-medium mr-2">{lesson.lessonOrder}</span>
                    <span>{lesson.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Card */}
          <div className="w-full md:w-80">
            <div className="border rounded-xl p-6 bg-white shadow flex flex-col items-center">
              <div className="text-3xl font-bold mb-2">${courseInfo.price.toFixed(2)}</div>
              <button className="bg-blue-600 text-white px-8 py-2 rounded-md font-semibold mb-4 hover:bg-blue-700 transition">
                Enroll
              </button>
              <div className="flex items-center text-gray-700 mb-2">
                <span className="mr-2">🕒</span> {courseInfo.hours} hours
              </div>
              <div className="flex items-center text-gray-700 mb-2">
                <span className="mr-2">📋</span> {lessons.length} lessons
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}