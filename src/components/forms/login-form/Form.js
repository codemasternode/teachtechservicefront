import React from "react";
import { FormHelperText } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

export const Form = ({
  classes,
  onChange,
  onBlur,
  errors,
  onSubmit,
  handleOpenAlert,
  login
}) => (
  <Paper className={classes.paper}>
    <Typography component="h1" variant="h3" style={{ marginBottom: "2.3rem" }}>
      Zaloguj się
    </Typography>
    <form className={classes.form}>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="email">Adres email</InputLabel>
        <Input
          id="email"
          name="email"
          autoComplete="email"
          onChange={onChange}
          onBlur={onBlur}
          className={`${errors.email ? "error" : ""}`}
        />
        {errors.email ? (
          <FormHelperText style={{ color: "red" }}>
            {errors.email}
          </FormHelperText>
        ) : (
          <FormHelperText />
        )}
      </FormControl>
      <FormControl margin="normal" required fullWidth>
        <InputLabel htmlFor="password">Hasło</InputLabel>
        <Input
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={onChange}
          onBlur={onBlur}
          className={`${errors.password ? "error" : ""}`}
        />
        {errors.password ? (
          <FormHelperText style={{ color: "red" }}>
            {errors.password}
          </FormHelperText>
        ) : (
          <FormHelperText />
        )}
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={e => onSubmit(e, handleOpenAlert, login)}
      >
        Zaloguj się
      </Button>
    </form>
  </Paper>
);
