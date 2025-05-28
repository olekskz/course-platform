import { gql } from "@apollo/client";

export const UserRegister = gql`
    mutation UserRegister($email: String!, $password: String!) {
        userRegister(email: $email, password: $password) {
            access_token 
        }
    }
`;

export const UserLogin = gql`
    mutation UserLogin($email: String!, $password: String!) {
        userLogin(email: $email, password: $password) {
            email
            access_token
        }
    }
`;




