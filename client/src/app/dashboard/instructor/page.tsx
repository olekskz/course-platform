'use client';
import Footer from "../../../components/footer"
import Image from "next/image"
import dynamic from "next/dynamic"
import Link from "next/link";
import { useGetCoursesByInstuructor } from "@/hooks/useCourse";
import { useGetUserId } from "@/hooks/useGetUserID";
import { useState, useEffect, useMemo } from "react";

type Course = {
    id: string;           
    title: string;         
    description: string;
    price: number;
    image: string;
    hours: number;
    lessonsCount: number;
    isActive: boolean;
}

const EarningsChart = dynamic(() => import("../../../components/charts/EarningsChart"), { ssr: false });

export default function InstructorDashboard() {
    
    const userData = useGetUserId();
    const { coursesData, coursesLoading, coursesError } = useGetCoursesByInstuructor(userData.userId);
    
    
    const sortedCourses = useMemo(() => {
        if (!coursesData?.getCourseByInstructorId) return [];
        return [...coursesData.getCourseByInstructorId];
    }, [coursesData?.getCourseByInstructorId]);



    
    const stats = {
        completedCourses: 5,
        activeStudents: 120,
        totalSales: 340,
        earningsData: [120, 200, 150, 300, 250, 400, 350]
    };

    
    if (coursesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (coursesError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-500">Error: {coursesError.message}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto">
                {/* Аналітичні картки */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                        <span className="text-3xl font-bold text-blue-600">{stats.completedCourses}</span>
                        <span className="text-gray-600 mt-2">Completed Courses</span>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                        <span className="text-3xl font-bold text-green-600">{stats.activeStudents}</span>
                        <span className="text-gray-600 mt-2">Active Students</span>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                        <span className="text-3xl font-bold text-purple-600">{stats.totalSales}</span>
                        <span className="text-gray-600 mt-2">Total Sales</span>
                    </div>
                </div>

                {/* Графік заробітку */}
                <div className="shadow-lg p-4 rounded-lg w-full max-w-4xl mx-auto mt-10">
                    <h2 className="text-xl font-semibold mb-4">Earnings</h2>
                    <EarningsChart earningsData={stats.earningsData} />
                </div>

                {/* Курси інструктора */}
                <div className="shadow-lg p-4 rounded-lg w-full max-w-4xl mx-auto mt-10">
                    <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
                    <ul className="space-y-2">
                        { sortedCourses.length === 0 ? (
                            <p className="text-gray-500">You have no courses, Create One!</p>
                        ) : (
                            sortedCourses.map((course: Course) => (
                            <li key={course.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-100">
                                <Image src={course.image} alt="course" width={40} height={40} className="flex-shrink-0" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-1 flex items-center justify-between">
                                        {course.title} 
                                        <Link href={`/dashboard/instructor/courses/${course.id}`} className="ml-4 px-3 py-1 text-sm bg-gray-200 hover:bg-blue-600 hover:text-white rounded transition cursor-pointer">Edit</Link>
                                    </h3>
                                    <div className="text-sm text-gray-500 mb-1">Lessons: {course.lessonsCount}</div>
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs ${course.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                                        {course.isActive ? "Active" : "Draft"}
                                    </span>
                                </div>
                            </li>
                        )))}
                    </ul>
                    <Link href="/dashboard/instructor/create-course" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer max-w-xs text-center mx-auto block">Add New Course</Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
