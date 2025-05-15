
import { cookies } from 'next/headers';
import LoggedHeader from './loginnedHeader';
import NotLoggedHeader from './notLoggedHeader';
import { jwtDecode } from 'jwt-decode';

export default async function Header() {
  // Get cookies from the server
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return <NotLoggedHeader />;
  }

  try {
    const decoded = jwtDecode(token) as any;
    const role = decoded.role;

    if (role === 'USER' || role === 'INSTRUCTOR') {
      return <LoggedHeader role={role}/>;
    } else {
      return <NotLoggedHeader />;
    }
  } catch (error) {
    console.error('Invalid token:', error);
    return <NotLoggedHeader />;
  }
}
