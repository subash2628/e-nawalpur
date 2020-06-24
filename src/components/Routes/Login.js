import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
//import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
//import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router-dom";

// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemText from "@material-ui/core/ListItemText";

// import axios from "axios";
//import postData from "./PostData";
// import { baseURL } from "../functions/Global_Data";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../store/actions/authActions";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      phone: "",
      password: "",
      errors: null,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    } else if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      phone: this.state.phone,
      password: this.state.password,
    };
    this.props.loginUser(user, this.props.history);
  }

  render() {
    const { loggedInId, errors, phone, password } = this.state;
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              placeholder="98........"
              name="phone"
              autoComplete="tel"
              type="number"
              autoFocus
              onChange={this.onChange}
              value={phone}
              error={errors ? (errors.phone ? true : false) : false}
              helperText={errors && errors.phone}
            />
            {/* {errors && <div className="text-danger">{errors.phone}</div>} */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={this.onChange}
              error={errors ? (errors.password ? true : false) : false}
              helperText={errors && errors.password}
            />
            {/* {errors && <div className="text-danger">{errors.password}</div>} */}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={phone && password ? false : true}
              onClick={this.onSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {/* {errors &&
            Object.keys(this.state.errors).map((obj, i) => (
              <div className="text-danger">{this.state.errors[obj]}</div>
            ))} */}

        {/* {loggedInId && (
          <div className="text-success">
            Successfully logged in with userId {loggedInId}
          </div>
        )} */}
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProp = (state) => ({
  auth: state.auth,
  errors: state.errors.login,
});

export default connect(mapStateToProp, { loginUser })(withRouter(Login));
