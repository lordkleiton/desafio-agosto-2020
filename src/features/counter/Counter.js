import React from "react"; //{ useState }
import { useSelector, useDispatch } from "react-redux";
/* import {
  //decrement,
  //increment,
  //incrementByAmount,
  //incrementAsync,
  selectCount,
} from "./counterSlice"; */
import styles from "./Counter.module.css";

import { login, activeUser, logout, loggedIn } from "../../app/slices/user";

import { get, local, create } from "../../app/slices/despesas";

export function Counter() {
  //const count = useSelector(selectCount);
  const user = useSelector(activeUser);
  const _local = useSelector(local);
  const signedIn = useSelector(loggedIn);
  const dispatch = useDispatch();
  //const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className={styles.row}>
        {/*  <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button> */}
      </div>
      <div className={styles.row}>
        {/* <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button> */}

        {signedIn && <div>{user.displayName}</div>}

        <button
          onClick={() => {
            dispatch(login());
          }}
        >
          login
        </button>

        <button
          onClick={() => {
            dispatch(logout());
          }}
        >
          logout
        </button>

        <button
          onClick={() => {
            dispatch(get());
          }}
        >
          get despesas
        </button>

        <button
          onClick={() => {
            console.log(_local);
          }}
        >
          local
        </button>

        <button
          onClick={() => {
            dispatch(create(""));
          }}
        >
          add
        </button>
      </div>
    </div>
  );
}
