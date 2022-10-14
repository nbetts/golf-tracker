import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFirebaseAuthUser } from './firebase';
import routes from './routes';

const withRouteCheck = (Component: React.ComponentType, access: 'signed-out' | 'signed-in'): React.FC =>
  function InnerComponent(props) {
    const user = useFirebaseAuthUser();
    const router = useRouter();
    const [routeAllowed, setRouteAllowed] = useState(false);

    useEffect(() => {
      if (router.isReady) {
        if (user.data && access === 'signed-out') {
          setRouteAllowed(false);
          router.replace(routes.scorecards);
        } else if (!user && access === 'signed-in') {
          setRouteAllowed(false);
          router.replace(routes.home);
        } else {
          setRouteAllowed(true);
        }
      }
    }, [router, user]);

    return routeAllowed ? <Component {...props} /> : null;
  };

export default withRouteCheck;
