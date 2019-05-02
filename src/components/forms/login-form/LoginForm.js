import React from "react";
import { onChange as change } from "../../helpers/formHelpers";
import Axios from "axios";
import { AlertContext, AuthContext } from "../../../App";
import { isEmail } from "../../helpers/formHelpers";
import { withRouter, Redirect } from "react-router-dom";
import { Form } from "./Form";
import { withStyles } from "@material-ui/core";

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

    boxShadow: "none"
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
    backgroundColor: theme.palette.primary.main
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
    this.onChange = this.onChange.bind(this);
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

  onSubmit = (e, handleOpenAlert, login) => {
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
        console.log(res);
        handleOpenAlert("Udało się zalogować", "success");
        localStorage.setItem("token", res.data.token);
        login(res.data.time);
        this.props.history.replace("/");
      })
      .catch(err => {
        if (err.response) {
          let error = err.response;
          if (error.status === 400) {
            handleOpenAlert("Brak danych", "error");
          } else if (error.status === 401) {
            handleOpenAlert("Błędny email lub hasło", "error");
          } else if (error.status === 409) {
            handleOpenAlert("To konto wymaga weryfikacji", "warning");
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
    // if (localStorage.getItem("token")) {
    //   this.props.history.replace("/");
    // }
  }

  render() {
    const { classes } = this.props;
    return (
      <AuthContext.Consumer>
        {({ isAuth, login }) => {
          console.log(isAuth);
          return (
            <React.Fragment>
              {isAuth ? (
                <Redirect to="/" />
              ) : (
                <AlertContext.Consumer>
                  {({ handleOpenAlert }) => (
                    <React.Fragment>
                      <Form
                        classes={classes}
                        errors={this.state.errors}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                        onSubmit={this.onSubmit}
                        login={login}
                        handleOpenAlert={handleOpenAlert}
                      />
                    </React.Fragment>
                  )}
                </AlertContext.Consumer>
              )}
            </React.Fragment>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}

export default withRouter(withStyles(styles)(LoginForm));
