import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from './routes';
import store from './store';

const withRouteCheck = (Component: React.ComponentType, access: 'signed-out' | 'signed-in'): React.FC =>
  function InnerComponent(props) {
    const appLoaded = store.useState((s) => s.appLoaded);
    const user = store.useState((s) => s.user);
    const navigate = useNavigate();
    const [routeAllowed, setRouteAllowed] = useState(false);

    useEffect(() => {
      if (appLoaded) {
        if (user && access === 'signed-out') {
          navigate(routes.scorecards, { replace: true });
        } else if (!user && access === 'signed-in') {
          navigate(routes.home, { replace: true });
        } else {
          setRouteAllowed(true);
        }
      }
    }, [appLoaded, user, access]);

    return routeAllowed ? <Component {...props} /> : null;
  };

export default withRouteCheck;
