'use client';
import LoginnedHeader from "../../../components/headers/loginnedHeader"
import Footer from "../../../components/footer"
import Image from "next/image"
import dynamic from "next/dynamic"
import { ProgressBar } from "../../../components/ProgressBar"
import { useState } from "react";
import InstructorModal from "@/components/modals/instructorModal";
const ProgressChart = dynamic(() => import("../../../components/charts/progressChart"), { ssr: false })

export default function Dashboard() {

    const progressData = [2, 5, 8, 12, 18, 25];
    const [isInstructorModalOpen, setIsInstructorModalOpen] = useState<boolean>(false);

    return (
        <>
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto">
                <div className="flex flex-row items-center justify-between gap-10 mt-10 shadow-lg p-2 rounded-lg">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold">Student Dashboard</h1>
                        <Image src="/assets/379383_student_icon.png" alt="profile" width={40} height={40} />   
                    </div>
                    <button className="bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer px-4 py-2" onClick={() => setIsInstructorModalOpen(true)}>Become an Instructor</button>
                </div>
                {isInstructorModalOpen && <InstructorModal isOpen={isInstructorModalOpen} onClose={() => setIsInstructorModalOpen(false)} />}
                <div className="grid grid-cols-1 gap-6 mt-10">
                    <div className="shadow-lg p-4 rounded-lg w-full max-w-3xl mx-auto">
                        <ProgressChart progressData={progressData} />
                    </div>
                    <div className="shadow-lg p-4 rounded-lg w-full max-w-3xl mx-auto">
                        <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
                        {/* Тут буде список курсів */}
                        <ul className="space-y-2">
                            <li className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-100">
                                <Image src="/assets/8665237_code_development_icon.png" alt="profile" width={40} height={40} className="flex-shrink-0" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-1">Introduction to Programming</h3>
                                    <ProgressBar current={2} total={10} />
                                    <div className="flex justify-end">
                                        <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">Continue</button>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-100">
                                <Image src="/assets/8665237_code_development_icon.png" alt="profile" width={40} height={40} className="flex-shrink-0" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-1">Introduction to Programming</h3>
                                    <ProgressBar current={2} total={10} />
                                    <div className="flex justify-end">
                                        <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">Continue</button>
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200 border border-gray-100">
                                <Image src="/assets/8665237_code_development_icon.png" alt="profile" width={40} height={40} className="flex-shrink-0" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-1">Introduction to Programming</h3>
                                    <ProgressBar current={2} total={10} />
                                    <div className="flex justify-end">
                                        <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">Continue</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">View All Courses</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
        </>
    )
}

