import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  role: string;
  [key: string]: any;
}

export const useRedirect = () => {
  const router = useRouter();

  const handleAuthRedirect = (token: string) => {
    const decoded = jwtDecode(token) as DecodedToken;
    const role = decoded.role;

    switch (role) {
      case 'INSTRUCTOR':
        router.push('/dashboard/instructor');
        break;
      case 'ADMIN':
        router.push('/dashboard/admin');
        break;
      default:
        router.push('/dashboard/student');
    }
    router.refresh();
  };

  return { handleAuthRedirect };
};