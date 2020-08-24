import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  local,
  loading as _loading,
  remove,
  create,
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
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import moment from "moment";
import { Formik, Form, ErrorMessage } from "formik";

const Despesas = () => {
  const [open, setOpen] = useState(false);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {!loading && (
        <Button
          color="inherit"
          onClick={() => {
            dispatch(find());
          }}
        >
          atualizar
        </Button>
      )}

      <Button color="inherit" onClick={handleClickOpen}>
        criar
      </Button>

      <CustomDialog
        action={(values) => {
          dispatch(create(values));
        }}
        open={open}
        handleClose={handleClose}
        title="Nova despesa"
      />

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
                <IconButton onClick={() => {}}>
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

const CustomForm = ({ initialData, action }) => (
  <Formik
    initialValues={
      initialData
        ? initialData
        : { valor: 0, pago: false, descricao: "", data: "" }
    }
    validate={(values) => {
      const errors = {};

      const { valor, descricao, data } = values;

      if (valor <= 0) errors.valor = "Valor deve ser maior que 0";

      if (!descricao) errors.descricao = "Campo obrigatório";

      if (!data) errors.data = "Campo obrigatório";

      return errors;
    }}
    onSubmit={(values, { setSubmitting }) => {
      action(values);

      setSubmitting(false);
    }}
  >
    {({ isSubmitting, values, handleSubmit, handleChange }) => (
      <Form>
        <Grid container spacing={3} alignItems="center" justify="center">
          <Grid xs={6} item>
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
          </Grid>

          <Grid xs={6} item>
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
          </Grid>

          <Grid xs={6} item>
            {" "}
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
          </Grid>

          <Grid xs={6} item>
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
          </Grid>

          <Grid xs={6} item></Grid>
        </Grid>

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
);

const CustomDialog = ({ open, handleClose, action, initialData, title }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <CustomForm action={action} initialData={initialData} />
      </DialogContent>
    </Dialog>
  );
};

export { Despesas };
