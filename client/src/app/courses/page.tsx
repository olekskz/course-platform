'use client';
import { useState } from "react";
import Footer from "../../components/footer";
import CourseCard from "../../components/courseCard";
import { useGetCourses } from "@/hooks/useCourse";

type CourseCardType = {
    id: string;
    title: string;
    image: string;
}

export default function Courses() {
    const { courses, pageInfo, loading, loadMore } = useGetCourses(1, 6);

    const handleLoadMore = () => {
        if (pageInfo?.hasNextPage) {
            loadMore();
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto px-4 md:px-20 py-10">
                <h1 className="font-bold text-3xl mb-8">Explore 🔥</h1>

                {/* All Courses Section */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">All Courses</h2>
                    {loading && <div>Loading...</div>}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {courses?.map((course: CourseCardType) => (
                            <CourseCard
                                key={course.id}
                                id={course.id}
                                title={course.title}
                                image={course.image}
                            />
                        ))}
                    </div>

                    {pageInfo?.hasNextPage && (
                        <div className="text-center mt-8">
                            <button
                                onClick={handleLoadMore}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Load More'}
                            </button>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}

