import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { Home, AccountBox, ContactSupport } from "@material-ui/icons";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

const routes = [
  {
    path: "/",
    text: "Strona Główna",
    icon: () => <Home />
  },
  {
    path: "/my-courses",
    text: "Moje kursy",
    icon: () => <AccountBox />,
    isPrivate: true
  },
  {
    path: "/about-us",
    text: "O nas",
    icon: () => <ContactSupport />
  }
];

function Menu(props) {
  const { classes, theme, handleMenuOpen, open, history } = props;
  const changeLocation = location => {
    return () => {
      handleMenuOpen(false)();
      history.push(location);
    };
  };
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        onClose={handleMenuOpen(false)}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleMenuOpen(!open)}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {routes.map((value, index) =>
            value.isPrivate ? (
              localStorage.getItem("token") ? (
                <ListItem
                  button
                  key={index}
                  onClick={changeLocation(value.path)}
                >
                  <ListItemIcon>{value.icon()}</ListItemIcon>
                  <ListItemText primary={value.text} />
                </ListItem>
              ) : (
                ""
              )
            ) : (
              <ListItem button key={index} onClick={changeLocation(value.path)}>
                <ListItemIcon>{value.icon()}</ListItemIcon>
                <ListItemText primary={value.text} />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List />
      </Drawer>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(withRouter(Menu));
