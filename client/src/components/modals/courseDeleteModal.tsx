'use client'

import { DELETE_COURSE } from "@/graphql/courseGraphQL";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import React from 'react';

interface CourseDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseId: string;
}

const CourseDeleteModal: React.FC<CourseDeleteModalProps> = ({ isOpen, onClose, courseId }) => {
    const router = useRouter();
    const [deleteCourse] = useMutation(DELETE_COURSE);

    const handleDelete = async () => {
        try {
            const { data } = await deleteCourse({
                variables: { courseId }
            });
            
            if (data?.deleteCourse) {
                await router.refresh();
                router.push('/dashboard/instructor');
                onClose();
            }
        } catch (error) {
            console.error('Error deleting course:', error);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-8 rounded-lg shadow-lg z-10 relative">
                <button 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer" 
                    onClick={onClose}
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4">Delete Course</h2>
                <p className="mb-4">Are you sure you want to delete this course? This action cannot be undone.</p>
                <div className="flex gap-2">
                    <button 
                        onClick={handleDelete}
                        className="bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer px-4 py-2"
                    >
                        Delete
                    </button>
                    <button 
                        className="bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition cursor-pointer px-4 py-2" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDeleteModal;