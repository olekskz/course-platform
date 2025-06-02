import { gql } from "@apollo/client";

export const CREATE_LESSON = gql`
    mutation CreateLesson($input: CreateLessonInput!) {
        createLesson(input: $input) {
            success
            message
        }
    }
`;

export const GET_LESSONS_BY_COURSE = gql`
    query GetLessonsByCourse($courseId: String!) {
        getLessonsByCourse(courseId: $courseId) {
            lessons {
                id
                title
                content
                videoUrl
                lessonOrder
                courseId
                materials
            }
            success
            message
        }
    }
`;

export const GET_LESSON_BY_ID = gql`
    query GetLessonById($lessonId: String!) {
        getLessonById(lessonId: $lessonId) {
            id
            title
            content
            videoUrl
            lessonOrder
            courseId
            materials
        }
    }
`

export const UPDATE_LESSON = gql`
    mutation UpdateLesson($input: UpdateLessonInput!) {
        updateLesson(input: $input) {
            success
            message
        }
    }
`;