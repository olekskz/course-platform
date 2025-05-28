'use client'
import Footer from "@/components/footer"
import Link from "next/link";
import { useState } from "react"
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useCreateCourse } from "@/hooks/useCourse";

interface DecodedToken {
  id: string;
  [key: string]: any;
}


export default function CreateCoursePage() {
    const [courseName, setCourseName] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [length, setLength] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);


    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
        try {
          setImage(file);
        } catch (error) {
          console.error("Upload error", error);
        }
    };

    //instructor id logic
    const token = Cookies.get("token") || "";
    if (!token) {
        return null;
    }

    const decoded = jwtDecode(token) as DecodedToken;
    const instructorId = decoded.id;

    const { createNewCourse } = useCreateCourse();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const formData = new FormData();
        formData.append('name', courseName);
        formData.append('price', price.toString());
        formData.append('hours', length.toString());
        formData.append('description', description);
        formData.append('instructorId', instructorId);
        
        if (image) {
            formData.append('image', image); 
        }
        await createNewCourse(formData);
        
    } catch (err) {
        console.error('Create course error:', err);
    }
}



    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow flex items-center justify-center bg-gray-100">
                <div className="relative bg-white shadow-md rounded-lg p-6 max-w-md w-full mx-auto">
                    <Link
                        href="/dashboard/instructor"
                        className="absolute -top-12 left-0 inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        ← Back
                    </Link>
                    <h1 className="text-2xl font-bold text-center">Create Course</h1>
                    <form className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                            <input value={courseName}
                                type="text"
                                id="courseName"
                                name="courseName"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                                onChange={(e) => setCourseName(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input value={price}
                                type="number"
                                id="price" 
                                name="price" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                onChange={(e) => setPrice(Number(e.target.value))}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="length" className="block text-sm font-medium text-gray-700">Length(in hours)</label>
                            <input value={length}
                                type="number" 
                                id="hours" 
                                name="hours" 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                onChange={(e) => setLength(Number(e.target.value))}
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea value={description} 
                                id="description" 
                                name="description" 
                                rows={4} 
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                required
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Course Image
                            </label>
                            <input 
                                onChange={handleImageChange}
                                type="file" 
                                id="image" 
                                name="image" 
                                accept="image/*"   
                                className="px-2 mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
                                required 
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 cursor-pointer">Create Course</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}