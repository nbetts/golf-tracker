import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import routes from './routes';
import store from './store';

const withRouteCheck = (Component: React.ComponentType, access: 'signed-out' | 'signed-in'): React.FC =>
  function InnerComponent(props) {
    const appLoaded = store.useState((s) => s.appLoaded);
    const user = store.useState((s) => s.user);
    const router = useRouter();
    const [routeAllowed, setRouteAllowed] = useState(false);

    useEffect(() => {
      if (router.isReady && appLoaded) {
        if (user && access === 'signed-out') {
          setRouteAllowed(false);
          router.replace(routes.scorecards);
        } else if (!user && access === 'signed-in') {
          setRouteAllowed(false);
          router.replace(routes.home);
        } else {
          setRouteAllowed(true);
        }
      }
    }, [router, appLoaded, user]);

    return routeAllowed ? <Component {...props} /> : null;
  };

export default withRouteCheck;
