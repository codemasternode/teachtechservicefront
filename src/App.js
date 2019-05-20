import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Pages from "./pages";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Alert from "./components/alerts/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import "dotenv/config";
import Nav from "./components/sections/Nav";
import Axios from "axios";
import { withStyles } from "@material-ui/styles";
import AdminRoute from "./components/helpers/routes/AdminRoute";
import PrivateRoute from "./components/helpers/routes/PrivateRoute";

const AlertContext = React.createContext();
const AuthContext = React.createContext();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0a2957"
    },
    secondary: {
      main: "#ffc107"
    },
    error: {
      main: "#d50000"
    }
  }
});

const styles = {
  root: {
    maxWidth: 1600,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "2rem 2rem 2rem 1rem",
    marginTop: "5rem",
    boxSizing: "border-box"
  }
};

class App extends Component {
  state = {
    isOpenAlert: false,
    messageAlert: "",
    variantAlert: "info",
    isAuth: undefined,
    sessionTime: null
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      Axios({
        method: "POST",
        url: `${process.env.REACT_APP_PUBLIC_URL}/auth/checkauth`,
        data: {
          token: localStorage.getItem("token")
        }
      })
        .then(time => {
          this.sessionTime = setTimeout(() => {
            this.setState({
              isAuth: false
            });
          }, time * 1000 - 60000);
          process.nextTick(() => {
            this.setState({
              isAuth: true
            });
          });
        })
        .catch(err => {
          localStorage.removeItem("token");
          localStorage.removeItem("isAdmin");
          this.setState({
            isAuth: false
          });
        });
    }
  }

  handleCloseAlert = () => {};

  handleOpenAlert = (message, variant) => {
    console.log(message, variant);
    this.setState({
      isOpenAlert: true,
      messageAlert: message,
      variantAlert: variant
    });
  };

  login(time) {
    this.setState({
      isAuth: true
    });
    this.sessionTime = setTimeout(() => {
      this.setState({
        isAuth: false
      });
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
    }, time);
  }

  logout(e, history) {
    this.setState({
      isAuth: false
    });
    Axios({
      url: `${process.env.REACT_APP_PUBLIC_URL}/auth/logout`,
      method: "POST",
      data: {
        token: localStorage.getItem("token")
      }
    })
      .then(res => {
        console.log(res);
        clearInterval(this.state.sessionTime);
      })
      .catch(err => {
        console.log(err);
      });
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    history.push("/");
  }

  render() {
    console.log(process.env.REACT_APP_PUBLIC_URL);
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            isAuth: this.state.isAuth,
            logout: this.logout.bind(this),
            login: this.login.bind(this)
          }}
        >
          <AlertContext.Provider
            value={{
              handleCloseAlert: this.handleCloseAlert,
              handleOpenAlert: this.handleOpenAlert
            }}
          >
            <div>
              <Router>
                <Nav />
                <div className={classes.root}>
                  <Switch>
                    <Route exact path="/" component={Pages.HomePage} />
                    <Route exact path="/login" component={Pages.LoginPage} />
                    <Route
                      exact
                      path="/register"
                      component={Pages.RegisterPage}
                    />
                    <Route exact path="/about-us" component={Pages.AboutUs} />
                    <PrivateRoute
                      path="/my-courses"
                      component={Pages.MyCourses}
                    />
                    <PrivateRoute
                      exact
                      path="/course/:courseTitle"
                      component={Pages.CoursePage}
                    />
                    <AdminRoute
                      exact
                      path="/dashboard"
                      component={Pages.AdminDashboard}
                    />
                    <Route component={Pages.NotFound} />
                  </Switch>
                  <Snackbar
                    open={this.state.isOpenAlert}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    autoHideDuration={6000}
                    onClose={() => this.setState({ isOpenAlert: false })}
                  >
                    <Alert
                      onClose={() => this.setState({ isOpenAlert: false })}
                      message={this.state.messageAlert}
                      variant={this.state.variantAlert}
                    />
                  </Snackbar>
                </div>
              </Router>
            </div>
          </AlertContext.Provider>
        </AuthContext.Provider>
      </MuiThemeProvider>
    );
  }
}
export { AlertContext, AuthContext };
export default withStyles(styles)(App);
