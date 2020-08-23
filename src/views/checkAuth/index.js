import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { loggedIn } from "../../app/slices/user";

const CheckAuth = ({ children, ...rest }) => {
  const signedIn = useSelector(loggedIn);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        signedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export { CheckAuth };
