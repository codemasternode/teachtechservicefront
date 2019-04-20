import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

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

export default withStyles(styles)(({ classes }) => (
  <AppBar position="fixed" className={classes.appBar}>
    <Toolbar>
      <IconButton
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit" className={classes.grow}>
        Teach Tech Service
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
));
