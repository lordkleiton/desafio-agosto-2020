import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, activeUser, loggedIn } from "../../app/slices/user";
import { Link } from "react-router-dom";

const Login = () => {
  const user = useSelector(activeUser);
  const signedIn = useSelector(loggedIn);
  const dispatch = useDispatch();

  return (
    <div>
      <Link to="/despesas">despesas</Link>

      {signedIn && <div>{user.displayName}</div>}

      {!signedIn && (
        <button
          onClick={() => {
            const onSuccess = () => {
              console.log("logado com sucesso");
            };

            dispatch(login(onSuccess));
          }}
        >
          login
        </button>
      )}
    </div>
  );
};

export { Login };
