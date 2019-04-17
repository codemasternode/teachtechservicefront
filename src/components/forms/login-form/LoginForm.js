import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { onChange as change } from "../../helpers/formHelpers";
import Axios from "axios";
import { AlertContext, AuthContext } from "../../../App";
import { FormHelperText } from "@material-ui/core";
import { isEmail } from "../../helpers/formHelpers";
import { withRouter, Redirect } from "react-router-dom";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    maxWidth: 400,
    width: "100%",
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyCenter: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,

    boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.75)"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
    width: 60,
    height: 60
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    maxWidth: 200,
    marginTop: "2rem",
    backgroundColor: "#d50000"
  }
});

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        password: "",
        email: ""
      }
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange = e => {
    change(this, e);
    process.nextTick(() => {
      console.log(this.state);
    });
  };

  onBlur = e => {
    if (e.target.name == "email") {
      if (this.state.email == "" || !this.state.email) {
        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            email: "Email jest wymagany"
          }
        });
      } else if (!isEmail(this.state.email)) {
        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            email: "Email jest nieprawidłowy"
          }
        });
      } else {
        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            email: ""
          }
        });
      }
    } else {
      if (this.state.password == "" || !this.state.password) {
        console.log("bcd");
        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            password: "Hasło jest wymagane"
          }
        });
      } else {
        this.setState({
          ...this.state,
          errors: {
            ...this.state.errors,
            password: ""
          }
        });
      }
    }
  };

  onSubmit = (e, handleOpenAlert) => {
    console.log(handleOpenAlert);
    e.preventDefault();
    Axios({
      url: `http://localhost:3000/auth/login`,
      method: "POST",
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }
    })
      .then(res => {
        handleOpenAlert("Udało się zalogować", "success");
        localStorage.setItem("token", res.data.token);
        this.props.history.replace("/");
      })
      .catch(err => {
        if (err.response) {
          let error = err.response;
          if (error.status === 400) {
            handleOpenAlert("Brak danych", "error");
          } else if (error.status === 401) {
            handleOpenAlert("Błędny email lub hasło", "error");
          } else {
            handleOpenAlert("Błąd serwera", "warning");
          }
        } else {
          handleOpenAlert("Błąd serwera", "warning");
        }
      });
  };

  componentDidMount() {
    console.log(this.props.history);
    if (localStorage.getItem("token")) {
      this.props.history.replace("/");
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <AuthContext.Consumer>
        {({ isAuth }) => (
          <React.Fragment>
            {isAuth ? (
              <Redirect to="/" />
            ) : (
              <AlertContext.Consumer>
                {({ handleOpenAlert }) => (
                  <React.Fragment>
                    <Paper className={classes.paper}>
                      <Avatar
                        src="images/logo.png"
                        style={{
                          width: 80,
                          height: 80,
                          marginBottom: "2.5rem"
                        }}
                      />
                      <Typography
                        component="h1"
                        variant="h3"
                        style={{ marginBottom: "2.3rem" }}
                      >
                        Zaloguj się
                      </Typography>
                      <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                          <InputLabel htmlFor="email">Adres email</InputLabel>
                          <Input
                            id="email"
                            name="email"
                            autoComplete="email"
                            onChange={this.onChange.bind(this)}
                            onBlur={this.onBlur}
                            className={`${
                              this.state.errors.email ? "error" : ""
                            }`}
                          />
                          {this.state.errors.email ? (
                            <FormHelperText style={{ color: "red" }}>
                              {this.state.errors.email}
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
                            onChange={this.onChange.bind(this)}
                            onBlur={this.onBlur}
                            className={`${
                              this.state.errors.password ? "error" : ""
                            }`}
                          />
                          {this.state.errors.password ? (
                            <FormHelperText style={{ color: "red" }}>
                              {this.state.errors.password}
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
                          onClick={e => this.onSubmit(e, handleOpenAlert)}
                        >
                          Zaloguj się
                        </Button>
                      </form>
                    </Paper>
                  </React.Fragment>
                )}
              </AlertContext.Consumer>
            )}
          </React.Fragment>
        )}
      </AuthContext.Consumer>
    );
  }
}

export default withRouter(withStyles(styles)(LoginForm));
