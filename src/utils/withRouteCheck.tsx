import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useFirebaseAuthUser } from './firebase';
import { routes } from './routes';

export const withAuthCheck = (Component: React.ComponentType): React.FC =>
  function InnerComponent(props) {
    const user = useFirebaseAuthUser();
    const router = useRouter();
    const isLoading = user.isLoading;
    const routeAllowed = user.data?.uid;

    useEffect(() => {
      if (router.isReady && !isLoading && !routeAllowed) {
        router.replace(routes.home);
      }
    }, [router, isLoading, routeAllowed]);

    return !isLoading && routeAllowed ? <Component {...props} /> : null;
  };

export const withoutAuthCheck = (Component: React.ComponentType): React.FC =>
  function InnerComponent(props) {
    const user = useFirebaseAuthUser();
    const router = useRouter();
    const isLoading = user.isLoading;
    const routeAllowed = !user.data;

    useEffect(() => {
      if (router.isReady && !isLoading && !routeAllowed) {
        router.replace(routes.scorecards);
      }
    }, [router, isLoading, routeAllowed]);

    return !isLoading && routeAllowed ? <Component {...props} /> : null;
  };
