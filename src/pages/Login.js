import React from "react";
import LoginForm from "../components/forms/login-form/LoginForm";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  main: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "100vw",
    height: "70vh",
    overflow: "hidden",
    padding: "0.5rem"
  }
};

export default withStyles(styles)(({ classes }) => (
  <div className={classes.main}>
    <LoginForm />
  </div>
));
