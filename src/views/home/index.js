import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeUser, loggedIn } from "../../app/slices/user";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector(activeUser);
  const signedIn = useSelector(loggedIn);

  return (
    <div>
      {!signedIn && (
        <div>
          <p>Faça login para continuar</p>
          <Link to="/login">Login</Link>
        </div>
      )}
      {signedIn && <div>{user.displayName}</div>}
    </div>
  );
};

export { Home };
