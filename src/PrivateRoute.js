import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import AuthService from "./services/auth.service";

function PrivateRoute ({component: Component, ...rest}) {
    const user = AuthService.getCurrentUser();
    let authed = false;
    if(user) {
      authed = true;
    }
    return (
      <Route
        {...rest}
        render={(props) => authed === true
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
}

export default PrivateRoute;  