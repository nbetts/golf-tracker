import { useEffect } from 'react';
import { useFirebaseAuthUser } from './firebase';
import { routes } from './routes';
import { useNavigate } from 'react-router-dom';

export const withAuthCheck = (Component: React.ComponentType): React.FC =>
  function InnerComponent(props) {
    const user = useFirebaseAuthUser();
    const navigate = useNavigate();
    const isLoading = user.isLoading;
    const routeAllowed = user.data?.uid;

    useEffect(() => {
      if (!(isLoading || routeAllowed)) {
        navigate(routes.home);
      }
    }, [isLoading, routeAllowed]);

    return !isLoading && routeAllowed ? <Component {...props} /> : null;
  };

export const withoutAuthCheck = (Component: React.ComponentType): React.FC =>
  function InnerComponent(props) {
    const user = useFirebaseAuthUser();
    const navigate = useNavigate();
    const isLoading = user.isLoading;
    const routeAllowed = !user.data;

    useEffect(() => {
      if (!(isLoading || routeAllowed)) {
        navigate(routes.scorecards);
      }
    }, [isLoading, routeAllowed]);

    return !isLoading && routeAllowed ? <Component {...props} /> : null;
  };
