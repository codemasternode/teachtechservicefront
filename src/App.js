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
import { withRouter } from "react-router-dom";
import AdminRoute from "./components/helpers/routes/AdminRoute";

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
    history.push("/");
  }

  render() {
    console.log(process.env.REACT_APP_PUBLIC_URL);
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
            <div className="App">
              <Router>
                <Nav />
                <div style={{ marginTop: "4rem" }}>
                  <Switch>
                    <Route exact path="/" component={Pages.HomePage} />
                    <Route path="/login" component={Pages.LoginPage} />
                    <Route path="/register" component={Pages.RegisterPage} />
                    <AdminRoute
                      path="/dashboard"
                      component={Pages.AdminDashboard}
                    />
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
export default App;
