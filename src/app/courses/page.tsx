import Header from "../../components/header";
import Footer from "../../components/footer";
import CourseCard from "../../components/courseCard";
import Image from "next/image";

export default function Courses() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-20 py-10">
                <h1 className="font-bold text-3xl mb-8">Explore 🔥</h1>

                {/* Trending Courses */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Trending</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <CourseCard title="AI for Everyone" desc="Вступ до штучного інтелекту для всіх." />
                        <CourseCard title="React Mastery" desc="Поглиблене вивчення React та сучасних підходів." />
                        <CourseCard title="Python Basics" desc="Основи програмування на Python для початківців." />
                    </div>
                </section>

                {/* Web Development */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Web Development</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <CourseCard title="HTML & CSS" desc="Верстка сучасних сайтів з нуля." />
                        <CourseCard title="JavaScript Essentials" desc="Глибоке розуміння JavaScript для вебу." />
                        <CourseCard title="Next.js Fundamentals" desc="Розробка SSR/SSG застосунків на Next.js." />
                    </div>
                </section>

                {/* Data Science */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Data Science</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <CourseCard title="Data Analysis with Python" desc="Обробка та аналіз даних у Python." />
                        <CourseCard title="Machine Learning Basics" desc="Основи машинного навчання для всіх." />
                        <CourseCard title="SQL for Data Science" desc="Робота з базами даних для аналітики." />
                    </div>
                </section>

                {/* Flutter Development */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Flutter Development</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <CourseCard title="Flutter for Beginners" desc="Початок розробки мобільних застосунків." />
                        <CourseCard title="Dart Programming" desc="Мова Dart для Flutter-розробників." />
                        <CourseCard title="Flutter UI Advanced" desc="Створення красивих UI у Flutter." />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

