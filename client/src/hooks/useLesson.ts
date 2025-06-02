import { useMutation, useQuery } from "@apollo/client"
import { CREATE_LESSON, GET_LESSON_BY_ID, GET_LESSONS_BY_COURSE, UPDATE_LESSON } from "@/graphql/lessonGraphQL"
import { useRouter } from "next/navigation"

interface LessonInput {
    title: string;
    content: string;
    videoUrl: string;
    lessonOrder: number;
    materials?: string;
    courseId: string;
}

interface LessonUpdateInput {
    id: string;
    title: string;
    content: string;
    videoUrl: string;
    lessonOrder: number;
    materials?: string;
    courseId: string;
}

interface Lesson {
    id: string;
    title: string;
    content: string;
    videoUrl: string;
    lessonOrder: number;
    materials?: string;
}

interface GetLessonsByCourseResponse {
    getLessonsByCourse: {
        lessons: Lesson[];
        success: boolean;
        message: string;
    }
}


interface CreateLessonResponse {
    createLesson: {
        success: boolean;
        message: string;
    }
}

interface UpdateLessonResponse {
    updateLesson: {
        success: boolean;
        message: string;
    }
}

export const useUpdateLesson = () => {
    const router = useRouter()
    const [updateLessonMutation, {loading, error}] = useMutation<
    UpdateLessonResponse, 
    { input: LessonUpdateInput }>(UPDATE_LESSON)

    const updateLesson = async (input: LessonUpdateInput) => {
        try {
            const { data } = await updateLessonMutation({
                variables: { input }
            });

            if (data?.updateLesson.success) {
                router.push(`/dashboard/instructor/courses/${input.courseId}`);
                return {
                    success: true,
                    message: data.updateLesson.message
                }
            }

            return {
                success: false,
                error: data?.updateLesson.message || 'Failed to update lesson'
            }
        } catch (err) {
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Failed to update lesson'
            };
        }
    }

    return {
        updateLesson,
        updateLoading: loading,
        updateError: error
    }
}


export const useCreateLesson = () => {
    const router = useRouter();
    const [createLessonMutation, { loading, error }] = useMutation<
        CreateLessonResponse, 
        { input: LessonInput }
    >(CREATE_LESSON);

    const createLesson = async (input: LessonInput) => {
        try {
            const { data } = await createLessonMutation({
                variables: { input }
            });

            if (data?.createLesson.success) {
                router.push(`/dashboard/instructor/courses/${input.courseId}`);
                return { 
                    success: true, 
                    message: data.createLesson.message 
                };
            }
            
            return { 
                success: false, 
                error: data?.createLesson.message || 'Failed to create lesson' 
            };
        } catch (err) {
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Failed to create lesson'
            };
        }
    };

    return {
        createLesson,
        lessonLoading: loading,
        lessonError: error
    };
};

export const useGetLessons = (courseId: string) => {
    const { data, loading, error } = useQuery<GetLessonsByCourseResponse>(
        GET_LESSONS_BY_COURSE,
        {
            variables: { courseId },
        }
    );

    return {
        lessonsFetched: data?.getLessonsByCourse.lessons || [],
        lessonsLoading: loading,
        lessonsError: error
    };
};

export const useGetLesson = (lessonId: string) => {
    const { data, loading, error } = useQuery(GET_LESSON_BY_ID, {
        variables: { lessonId },
        skip: !lessonId,
    });


    return {
        lesson: data?.getLessonById,
        lessonLoading: loading,
        lessonError: error
    };
};

