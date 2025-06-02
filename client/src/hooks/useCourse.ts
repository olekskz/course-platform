import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { GET_COURSE_BY_ID, GET_COURSES_BY_INSTRUCTOR, GET_COURSES } from "@/graphql/courseGraphQL";
import { client } from "../lib/apolloClient"

interface PaginationArgs {
    take?: number;
    skip?: number;
}

export const useGetCourses = (page: number = 1, itemsPerPage: number = 6) => {
    const { data, loading, error, fetchMore } = useQuery(GET_COURSES, {
        variables: {
            pagination: {
                skip: (page - 1) * itemsPerPage,
                take: itemsPerPage
            }
        }
    });

    const loadMore = async () => {
        if (data?.getCourses.pageInfo.hasNextPage) {
            await fetchMore({
                variables: {
                    pagination: {
                        skip: data.getCourses.courses.length,
                        take: itemsPerPage
                    }
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        getCourses: {
                            ...fetchMoreResult.getCourses,
                            courses: [
                                ...prev.getCourses.courses,
                                ...fetchMoreResult.getCourses.courses
                            ]
                        }
                    };
                }
            });
        }
    };

    return {
        courses: data?.getCourses.courses || [],
        pageInfo: data?.getCourses.pageInfo,
        loading,
        error,
        loadMore
    };
};
export const useCreateCourse = () => {
    const router = useRouter();
    
    const createNewCourse = async (formData: FormData) => {
        try {
            const response = await fetch('http://localhost:4000/courses/upload', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const result = await response.json();
            if (result.success) {
                await client.refetchQueries({
                    include: [GET_COURSES_BY_INSTRUCTOR],
                });
                router.push('/dashboard/instructor');
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Failed to create course:', error);
            throw error;
        }
    };

    return { createNewCourse };
};

export const useUpdateCourse = () => {
    const router = useRouter();

    const updateCourse = async (formData: FormData) => {
        try {
            const response = await fetch('http://localhost:4000/courses/update', {
                method: 'POST',
                body: formData,
                credentials: "include"
            });

            const result = await response.json();
            if (result.success) {
                await client.refetchQueries({
                    include: [GET_COURSES_BY_INSTRUCTOR],
                });
                router.push('/dashboard/instructor');
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Failed to update course:', error);
            throw error;
        }
    };
    
    return { updateCourse };
};


export const useGetCoursesByInstuructor = (instructorId: string) => {
    const { data, loading, error } = useQuery(GET_COURSES_BY_INSTRUCTOR, {
        variables: { instructorId },
    });

    if (loading) return { coursesData: null, coursesLoading: true, coursesError: null };
    if (error) return { coursesData: null, coursesLoading: false, coursesError: error };

    return {
        coursesData: data,
        coursesLoading: false,
        coursesError: null,
    };
};

export const useGetCourseById = (courseId: string) => {
    const { data, loading, error } = useQuery(GET_COURSE_BY_ID, {
        variables: { courseId }
    });

    if (loading) return { courseData: null, courseLoading: true, courseError: null };
    if (error) return { courseData: null, courseLoading: false, courseError: error };

    return {
        courseData: data,
        courseLoading: false,
        courseError: null
    };
};



