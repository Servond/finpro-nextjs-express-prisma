import { useEffect, ComponentType } from 'react';
import { useRouter } from 'next/router';

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> => {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
};

export default withAuth;
