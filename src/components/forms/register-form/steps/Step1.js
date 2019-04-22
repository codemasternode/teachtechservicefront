import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { withStyles } from "@material-ui/core";
import { Main } from "./index";
import { RegisterFormContext } from "../RegisterForm";
import Period from "./Period";

const tiers = [
  {
    title: "Podstawowy",
    price: "40",
    description: [
      "Pakiet zadań na tydzień",
      "Dostęp do rozwiązań zadań",
      "Darmowe konto twórcy"
    ]
  },
  {
    title: "Rozszerzony",
    subheader: "Popularny",
    price: "60",
    description: [
      "Pakiet zadań na tydzień",
      "Dostęp do rozwiązań zadań",
      "Darmowe konto twórcy",
      "Nielimitowany dostęp do filmów"
    ]
  },
  {
    title: "Profesjonalny",
    price: "100",
    description: [
      "Pakiet zadań na tydzień",
      "Dostęp do rozwiązań zadań",
      "Darmowe konto twórcy",
      "Nielimitowany dostęp do filmów",
      "Darmowa pomoc"
    ]
  }
];
const style = theme => {
  console.log(theme);
  return {
    container: {
      padding: "1rem"
    },
    cardGrid: {
      margin: "4px 4px",
      boxSizing: "border-box"
    },
    card: {
      width: "100%",
      height: 600,
      position: "relative",
      background: theme.palette.common.white,
      [theme.breakpoints.down("sm")]: {
        marginBottom: "1rem"
      },
      boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
      transition: "all .1s ease-in-out"
    },
    cardHeader: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      textTransform: "uppercase",
      letterSpacing: 3,
      fontWeight: "600 !important"
    },
    cardContent: {
      minHeight: 250,
      position: "relative",
      padding: 0
    },
    cardPrice: {
      paddingTop: 32,
      paddingBottom: 32,
      width: "100%",
      fontSize: 42,
      fontWeight: 600,
      borderBottom: "2px solid lightgray",
      marginBottom: 16
    },
    cardActions: {
      borderTop: "2px solid lightgray",
      position: "absolute",
      bottom: 0,
      width: "100%"
    },
    selectButton: {
      fontSize: 26,
      background: "orange",
      color: theme.palette.common.white,
      padding: "0.25em 2em",
      marginLeft: "auto",
      marginRight: "auto",
      "&:hover": {
        background: theme.palette.secondary.dark
      }
    },
    h6: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 240,
      borderBottom: "1px solid lightgray"
    },
    h6Last: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 240
    }
  };
};

export default withStyles(style)(({ classes }) => (
  <RegisterFormContext.Consumer>
    {({ setPlan, plan }) => (
      <Main>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Cennik
        </Typography>
        <Grid
          sm={12}
          container
          justify="center"
          className={classes.container}
          spacing={2}
        >
          {tiers.map((value, index) => {
            console.log(value.subheader);
            return (
              <Grid
                item
                key={index}
                xs={12}
                sm={6}
                md={3}
                className={classes.cardGrid}
              >
                <Card
                  key={index}
                  className={classes.card}
                  style={
                    index == plan
                      ? {
                          boxShadow: " 0px 0px 5px 1px rgba(80,50,250,1)",
                          transform: "scale(1.05)",
                          position: "relative",
                          zIndex: 4
                        }
                      : {}
                  }
                  item
                >
                  {index == plan ? (
                    <CardHeader
                      title={value.title}
                      className={classes.cardHeader}
                      style={{ background: "#0be032" }}
                    />
                  ) : (
                    <CardHeader
                      title={value.title}
                      className={classes.cardHeader}
                    />
                  )}

                  <CardContent className={classes.cardContent}>
                    <Typography
                      variant="h4"
                      color="textPrimary"
                      className={classes.cardPrice}
                    >
                      {value.price} PLN
                      <br />
                      za miesiąc
                    </Typography>
                    {value.description.map((desc, index) => (
                      <React.Fragment>
                        {index == value.description.length - 1 ? (
                          <Typography
                            variant="h6"
                            key={index}
                            className={classes.h6Last}
                          >
                            {desc}
                          </Typography>
                        ) : (
                          <Typography
                            variant="h6"
                            key={index}
                            className={classes.h6}
                          >
                            {desc}
                          </Typography>
                        )}
                      </React.Fragment>
                    ))}
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button
                      className={classes.selectButton}
                      onClick={() => setPlan(index)}
                    >
                      Wybierz
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
          style={{ marginTop: "4rem", marginBottom: 0 }}
        >
          Okres czasu
        </Typography>
        <Grid
          sm={12}
          container
          justify="space-around"
          className={classes.container}
          spacing={2}
        >
          <Period />
        </Grid>
      </Main>
    )}
  </RegisterFormContext.Consumer>
));
