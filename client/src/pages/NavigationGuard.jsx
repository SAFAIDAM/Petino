import { Route, Navigate } from 'react-router-dom';

function NavigationGuard({ component: Component, isAdmin, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAdmin ? (
          <Component {...props} />
        ) : (
          <Navigate to="*" />
        )
      }
    />
  );
}

export default NavigationGuard;