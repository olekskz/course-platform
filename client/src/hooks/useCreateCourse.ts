import { CreateCourse } from "@/graphql/courseMutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";

export const useCreateCourse = () => {
    const [createCourse, { loading, error }] = useMutation(CreateCourse);
    const router = useRouter();

    const createNewCourse = async (variables: { name: string; price: number; length: number; description: string; image: File }) => {
        try {
            const { data } = await createCourse({ variables });
            
            if (data?.createCourse) {
                return data.createCourse;
            }
        } catch (err) {
            console.error('Create course error:', err);
            throw err;
        }
    };

    return { createNewCourse, loading, error };
};