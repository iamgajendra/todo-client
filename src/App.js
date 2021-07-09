import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import AuthRoute from "./AuthRoute";
import { BrowserRouter } from "react-router-dom";
import AuthService from "./services/auth.service";

import Login from "./pages/Login";
import Register from "./pages/Register";
import List from "./pages/List";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setAuthed(true);
    }
    setLoading(false);
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  if (loading) {
    return null;
  }

  return (
    <div className="main__app">
      <BrowserRouter>
        <nav className="mainApp__navbar">
          {currentUser ? (
            <div className="navbar__inner">
              <li className="">
                <a
                  href="/login"
                  style={{ textDecoration: "none" }}
                  className="navbar__link"
                  onClick={logOut}
                >
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar__inner">
              <li className="">
                <Link
                  to={"/login"}
                  style={{ textDecoration: "none" }}
                  className="navbar__link"
                >
                  Login
                </Link>
              </li>

              <li className="">
                <Link
                  to={"/register"}
                  style={{ textDecoration: "none" }}
                  className="navbar__link"
                >
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <Switch>
          <Route path="/" exact component={authed ? List : Login} />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
          <PrivateRoute path="/list" component={List} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
