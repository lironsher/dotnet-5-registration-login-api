import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';
interface MyRouteProps extends RouteProps {
  component: any;
  authenticated: boolean;
  rest?: any;
}
const PrivateRoute: React.SFC<MyRouteProps> = ({
  component: Component,
  authenticated,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated ? <Component {...props} /> : <Redirect to="/signIn" />
    }
  />
);
const mapStateToProps = (state: any) => ({
  authenticated: state.user.authenticated
});
export default connect(mapStateToProps)(PrivateRoute);
