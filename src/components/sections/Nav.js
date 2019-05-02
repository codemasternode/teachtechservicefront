import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { AuthContext } from "../../App";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    color: "black",
    background: "white"
  },
  grow: {
    flexGrow: 1,
    fontFamily: "Museo Slab",
    color: theme.palette.secondary.main,
    fontWeight: 600
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

function changeLocation(e, path, history) {
  e.preventDefault();
  history.push(path);
}

export default withStyles(styles)(
  withRouter(({ classes, history }) => (
    <AuthContext.Consumer>
      {({ isAuth, logout }) => {
        console.log(isAuth);
        return (
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.grow}
                onClick={e => changeLocation(e, "/", history)}
              >
                Teach Tech Service
              </Typography>
              {isAuth ? (
                <Button onClick={e => logout(e, history)} color="inherit">
                  Wyloguj
                </Button>
              ) : (
                <div>
                  <Button
                    onClick={e => changeLocation(e, "/login", history)}
                    color="inherit"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={e => changeLocation(e, "/register", history)}
                    color="inherit"
                  >
                    Register
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>
        );
      }}
    </AuthContext.Consumer>
  ))
);
