import { gql } from "@apollo/client";

export const CreateCourse = gql`
  mutation CreateCourse($data: CreateCourseInput!) {
    createCourse(data: $data)
  }
`;