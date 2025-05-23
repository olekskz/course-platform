import { gql } from "@apollo/client";

export const CREATE_INSTRUCTOR = gql`
    mutation CreateInstructor($name: String!, $secondName: String!, $phone: String!) {
        createInstructor(name: $name, secondName: $secondName, phone: $phone) {
            access_token
        }
    }
`  

export const GET_INSTRUCTOR_REQUESTS = gql`
    query GetInstructorRequests {
        getInstructorsRequests {
            id
            name
            email
            secondName
            phone
            status
        }
    }
`;

export const GET_INSTRUCTOR_PENDING_REQUEST = gql`
    query GetInstructorPendingRequest($email: String!) {
        getInstructorPendingRequest(email: $email) {
            success
        }
    }
`;

