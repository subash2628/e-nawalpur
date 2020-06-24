import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ReactLoading from "react-loading";
import { baseURL } from "../functions/Global_Data";
import axios from "axios";
import { withRouter } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { registeruser } from "../store/actions/authActions";
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="#">
//         KhullaPasal
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

// export default function SignUp() {
class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      company: "",
      location: "",
      password: "",
      conformPassword: "",
      errors: null,
      registeredId: null,
      loading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, loading: false });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit() {
    this.setState({ loading: true, errors: null });
    const {
      firstName,
      lastName,
      phone,
      password,
      company,
      location,
      conformPassword,
      //errors,
      //classes,
    } = this.state;

    const newUser = {
      name: `${firstName} ${lastName}`,
      contact: phone,
      password: password,
      conformPassword: conformPassword,
      location: location,
      company: company,
    };
    console.log(newUser);
    this.props.registeruser(newUser, this.props.history);
  }

  render() {
    const {
      firstName,
      lastName,
      phone,
      password,
      company,
      location,
      conformPassword,
      errors,

      loading,
    } = this.state;
    const disbleButton =
      firstName &&
      lastName &&
      phone &&
      password &&
      company &&
      location &&
      conformPassword
        ? false
        : true;

    const classes = this.props.classes;
    const { user } = this.props.auth;
    //console.log(this.props.auth.user);
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up{user ? user.name : null}
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="on"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={this.onChange}
                  value={firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="on"
                  onChange={this.onChange}
                  value={lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="phone"
                  label="phoneNumber"
                  name="phone"
                  autoComplete="tel"
                  type="number"
                  onChange={this.onChange}
                  value={phone}
                  error={errors ? (errors.phone ? true : false) : false}
                  helperText={errors && errors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="company"
                  label="your company"
                  name="company"
                  autoComplete="on"
                  //type="number"
                  onChange={this.onChange}
                  value={company}
                  error={errors ? (errors.company ? true : false) : false}
                  helperText={errors && errors.company}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  name="location"
                  autoComplete="on"
                  //type="number"
                  onChange={this.onChange}
                  value={location}
                  error={errors ? (errors.location ? true : false) : false}
                  helperText={errors && errors.location}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.onChange}
                  value={password}
                  error={errors ? (errors.password ? true : false) : false}
                  helperText={errors && errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="conformPassword"
                  label="Conform Password"
                  type="password"
                  id="Conform Password"
                  autoComplete="current-password"
                  onChange={this.onChange}
                  value={conformPassword}
                  error={
                    errors ? (errors.conformPassword ? true : false) : false
                  }
                  helperText={errors && errors.conformPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive products updates via phone."
                />
              </Grid>
            </Grid>
            {!loading && (
              <Button
                //type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={disbleButton}
                onClick={this.onSubmit}
              >
                Sign Up
              </Button>
            )}
            {loading && (
              <ReactLoading
                type={"spin"}
                color={"blue"}
                height={"15%"}
                width={"15%"}
              />
            )}
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
}
Register.propTypes = {
  registeruser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors.register,
});
export default connect(mapStateToProps, { registeruser })(withRouter(Register));
