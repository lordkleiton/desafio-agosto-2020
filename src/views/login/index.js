import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../app/slices/user";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Button,
  Avatar,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const styles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2, 1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  icon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  btn: {
    margin: theme.spacing(2),
  },
}));

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = styles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={5}>
        <Paper>
          <div className={classes.container}>
            <Avatar className={classes.icon}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h6" align="center">
              Faça login com uma conta do Google para prosseguir.
            </Typography>

            <Button
              variant="contained"
              fullWidth
              className={classes.btn}
              color="primary"
              onClick={() => {
                const onSuccess = () => {
                  history.replace("/");
                };

                dispatch(login(onSuccess));
              }}
            >
              login
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export { Login };
