
import { useRouter } from "next/navigation";

export const useCreateCourse = () => {
    const router = useRouter();
    const createNewCourse = async (formData: FormData) => {
        const response = await fetch('http://localhost:4000/courses/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.success) {
            router.push('/dashboard/instructor');
        } else {
            console.error('Failed to create course:', result.message);
        }
    };

    return { createNewCourse };
};