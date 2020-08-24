import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  local,
  loading as _loading,
  remove,
  //create,
  //update,
  find,
} from "../../app/slices/despesas";
import {
  Button,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Grid,
  CardActions,
  IconButton,
  Switch,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import moment from "moment";
import { Formik, Form, ErrorMessage } from "formik";

const DespesasForm = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ valor: 0, pago: false, descricao: "", data: "" }}
      validate={(values) => {
        const errors = {};

        const { valor, descricao, data } = values;

        if (valor <= 0) errors.valor = "Valor deve ser maior que 0";

        if (!descricao) errors.descricao = "Descrição obrigatória";

        if (!data) errors.data = "Data obrigatória";

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);

        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, handleSubmit, handleChange }) => (
        <Form>
          <TextField
            variant="outlined"
            name="descricao"
            label="Descrição"
            type="text"
            value={values.descricao}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <ErrorMessage name="descricao" component="div" />

          <TextField
            variant="outlined"
            name="valor"
            label="Valor"
            type="number"
            step="0.01"
            value={values.valor}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <ErrorMessage name="valor" component="div" />

          <TextField
            variant="outlined"
            name="data"
            label="Data"
            type="datetime-local"
            value={values.data}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <ErrorMessage name="data" component="div" />

          <FormControlLabel
            label="Pago?"
            control={
              <Switch
                checked={values.pago}
                onChange={handleChange}
                color="primary"
                name="pago"
                type="checkbox"
              />
            }
          />
          <ErrorMessage name="pago" component="div" />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            enviar
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

const useStyles = makeStyles({
  card: {
    width: 250,
    wordBreak: "break-all",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Despesas = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const _local = useSelector(local);
  const loading = useSelector(_loading);
  const toMoment = (seconds, nanoseconds) =>
    moment(seconds * 1000 + nanoseconds / 1000).toLocaleString();

  let data = [];

  for (let k in _local) {
    const v = _local[k];

    if (v.data) data.push(v);
  }

  return (
    <div>
      {!loading && (
        <Button
          color="inherit"
          onClick={() => {
            dispatch(find());
          }}
        >
          carregar
        </Button>
      )}

      <DespesasForm />

      <Grid container spacing={3} alignItems="center" justify="center">
        {data.map((d) => (
          <Grid key={d.id} item>
            <Card>
              <CardContent className={classes.card}>
                <Typography variant="h5" component="h2">
                  {d.valor}
                </Typography>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {d.pago ? "pago" : "pendente"}
                </Typography>
                <Typography variant="body2" component="p">
                  {d.descricao}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {toMoment(d.data.seconds, d.data.nanoseconds)}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton>
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => {
                    dispatch(remove(d.id));
                  }}
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export { Despesas };
