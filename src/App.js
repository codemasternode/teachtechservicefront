import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Pages from "./pages";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import Alert from "./components/alerts/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import "dotenv/config";

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
    isAuth: false
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        isAuth: true
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

  render() {
    console.log(process.env.REACT_APP_PUBLIC_URL);
    return (
      <MuiThemeProvider theme={theme}>
        <AuthContext.Provider value={{ isAuth: this.state.isAuth }}>
          <AlertContext.Provider
            value={{
              handleCloseAlert: this.handleCloseAlert,
              handleOpenAlert: this.handleOpenAlert
            }}
          >
            <div className="App">
              <Router>
                <Switch>
                  <Route path="/login" component={Pages.LoginPage} />
                  <Route path="/register" component={Pages.RegisterPage} />
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
