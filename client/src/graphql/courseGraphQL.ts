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