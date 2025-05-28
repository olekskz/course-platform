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
            title        
            description
            price
            hours
            image       
            isActive
        }
    }
`;
