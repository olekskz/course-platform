import { UserLogin, UserRegister } from "@/graphql/authMutations";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { UserRole } from "../../../server/src/graphql";

export const useUserLogin = () => {
    const [login, { loading, error }] = useMutation(UserLogin);
    const router = useRouter();

    const loginUser = async (variables: { email: string; password: string }) => {
        try {
            const { data } = await login({ variables });
            
            if (data?.userLogin) {
                return data.userLogin;
            }
        } catch (err) {
            console.error('Login error:', err);
            throw err;
        }
    };

    return { loginUser, loading, error };
};

export const useUserRegister = () => {
    const [register, { loading, error }] = useMutation(UserRegister);
    const router = useRouter();

    const registerUser = async (variables: { email: string; password: string }) => {
        try {
            const { data } = await register({ variables });
            
            if (data?.userRegister) {
                return data.userRegister;
            }
        } catch (err) {
            console.error('Registration error:', err);
            throw err;
        }
    };

    return { registerUser, loading, error };
};


