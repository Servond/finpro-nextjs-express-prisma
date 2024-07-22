import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

function useAuthorizeUser() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user || !user.role_id) {
      router.push('/');
      return;
    }

    switch (user.role_id) {
      case 1:
        if (pathname !== '/user') {
          router.push('/user');
        }
        break;
      case 2:
        if (pathname !== '/eo') {
          router.push('/eo');
        }
        break;
      default:
        router.push('/');
        break;
    }
  }, [router, pathname]);
}

export default useAuthorizeUser;