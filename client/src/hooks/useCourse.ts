import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_COURSES_BY_INSTRUCTOR } from "@/graphql/courseGraphQL";

export const useCreateCourse = () => {
    const router = useRouter();
    const createNewCourse = async (formData: FormData) => {
        const response = await fetch('http://localhost:4000/courses/upload', {
            method: 'POST',
            body: formData,
            credentials: 'include',
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

export const useGetCoursesByInstuructor = (instructorId: string) => {
    const { data, loading, error } = useQuery(GET_COURSES_BY_INSTRUCTOR, {
        variables: { instructorId },
    });

    if (loading) return { courses: [], loading: true, error: null };
    if (error) return { courses: [], loading: false, error };

    return {
        coursesData: data,
        coursesLoading: false,
        coursesError: null,
    };
}

