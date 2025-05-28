import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_COURSE_BY_ID, GET_COURSES_BY_INSTRUCTOR } from "@/graphql/courseGraphQL";

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

export const useUpdateCourse = () => {
    const router = useRouter()

    const updateCourse = async (formData: FormData) => {
        const response = await fetch('http://localhost:4000/courses/update', {
            method: 'POST',
            body: formData,
            credentials: "include"
        })

        const result = await response.json()

        if (result.success) {
            router.push('/dashboard/instructor');
        } else {
            console.error('Failed to update course:', result.message)
        }
    }
    return { updateCourse }
}

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

export const useGetCourseById = (courseId: string) => {
    const { data, loading, error} = useQuery(GET_COURSE_BY_ID, {
        variables: { courseId }
    })

    if (loading) return { data: "", loading: true, error: null}
    if (error) return {data: "", loading: false, error }

    return {
        courseData: data,
        courseLoading: false,
        courseError: null
    }
}



