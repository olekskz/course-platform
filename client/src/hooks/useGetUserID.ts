import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const useGetUserId = () => {
    // Get token from cookies client-side
    const token = Cookies.get('token');
    const decoded = token ? jwtDecode(token) as any : null;
    const userId = decoded?.id;
    const userRole = decoded?.role;
    const email = decoded?.email;

    return {
        userId,
        userRole,
        email,
        isAuthenticated: !!token,
    };
}