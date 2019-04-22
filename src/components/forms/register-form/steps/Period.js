import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  range: {
    maxWidth: 800,
    minWidth: 250,
    width: "100%"
  },
  info: {
    minWidth: 300,
    marginTop: "1rem",
    marginBottom: "5rem"
  }
});

class SimpleSlider extends React.Component {
  state = {
    value: 0,
    ranges: [
      {
        multiplier: 1.4,
        months: 1
      },
      {
        multiplier: 1,
        months: 4
      },
      {
        multiplier: 0.9,
        months: 9
      },
      {
        multiplier: 0.75,
        months: 12
      }
    ]
  };
  onChange = e => {
    console.log(e.target.value);
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { value, ranges } = this.state;
    console.log(ranges[value].multiplier - 1);
    return (
      <React.Fragment>
       
        <div className={classes.main}>
          <div className={classes.info}>
            <h2>
              Czas trwania: {ranges[value].months}
              {ranges[value].months == 1 ? (
                " miesiąc"
              ) : (
                <React.Fragment>
                  {ranges[value].months <= 4 ? " miesiące" : " miesięcy"}
                </React.Fragment>
              )}
            </h2>
            <h2>
              Zniżka:
              {ranges[value].multiplier == 1 ? (
                " 0%"
              ) : (
                <React.Fragment>
                  {ranges[value].multiplier > 1 ? (
                    <span className="red">
                      {` + ${Math.round(
                        (ranges[value].multiplier - 1) * 100
                      )}%`}
                    </span>
                  ) : (
                    <span className="green">
                      {` - ${Math.round(
                        (1 - ranges[value].multiplier) * 100
                      )}%`}
                    </span>
                  )}
                </React.Fragment>
              )}
            </h2>
          </div>

          <input
            type="range"
            min="0"
            max="3"
            step="1"
            value={value}
            onChange={this.onChange}
            className={classes.range}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SimpleSlider);
