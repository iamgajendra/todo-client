import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import AuthService from "./services/auth.service";

function AuthRoute ({component: Component, ...rest}) {
    const user = AuthService.getCurrentUser();
    let authed = false;
    if(user) {
      authed = true;
    }
    return (
      <Route
        {...rest}
        render={(props) => authed === false
          ? <Component {...props} />
          : <Redirect to={{pathname: '/list', state: {from: props.location}}} />}
      />
    )
  }

  export default AuthRoute;  