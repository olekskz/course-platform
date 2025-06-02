import { gql } from "@apollo/client";

export const GET_COURSES_BY_INSTRUCTOR = gql`
    query GetCoursesByInstructor($instructorId: String!) {
        getCourseByInstructorId(instructorId: $instructorId) {
            id
            title        
            description
            price
            image
            hours       
            lessonsCount 
            isActive
        }
    }
`;

export const GET_COURSE_BY_ID = gql`
    query GetCourseById($courseId: String!) {
        getCourseById(courseId: $courseId) {
            course {
                title        
                description
                price
                hours
                image       
                isActive
            }
            lessons {
                id
                title
                content
                videoUrl
                lessonOrder
                courseId
                materials
            }

        }
    }
`;

export const DELETE_COURSE = gql`
    mutation DeleteCourse($courseId: String!) {
        deleteCourse(courseId: $courseId) {
            success
            message
        }
    }
`;

export const GET_COURSES = gql`
    query GetCourses($pagination: PaginationInput) {
        getCourses(pagination: $pagination) {
            courses {
                id
                title
                description
                image
                price
                hours
                isActive
            }
            pageInfo {
                hasNextPage
                total
            }
        }
    }
`;