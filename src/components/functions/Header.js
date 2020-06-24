import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
// import { fade, makeStyles } from "@material-ui/core/styles";
// import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
// import SearchIcon from "@material-ui/icons/Search";
// import ReactLoading from "react-loading";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
//import { getProducts } from "../store/actions/productById";
import {
  getAllProducts,
  getCatagories,
  getProductsById,
} from "../store/actions/productActions";
import { setCurrentUser } from "../store/actions/authActions";
import { withRouter } from "react-router-dom";
class Header extends React.Component {
  // constructor(){
  //     super();
  //     this.state={
  //         isAuthenticated: false,
  //     }
  // }
  componentDidMount() {
    //this.props.getProducts(this.props.auth.user.ItemsForSell);
    const { isAuthenticated } = this.props.auth;
    this.props.getAllProducts();
    this.props.getCatagories();
    isAuthenticated &&
      this.props.getProductsById(this.props.auth.user.Products);
  }
  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="d-flex flex-row">
        <AppBar position="static">
          <Toolbar>
            {/* <CameraIcon className={classes.icon} /> */}
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className="d-inline-flex p-2"
            >
              <Link to="/" className="btn text-white">
                <h4>Khulla Pasal</h4>
              </Link>
            </Typography>

            <div className="d-inline-flex p-2 flex-grow-1 justify-content-end">
              {!isAuthenticated && (
                <Link to="/login" className="btn  text-white mr-3">
                  Login
                </Link>
              )}

              {!isAuthenticated && (
                <Link to="/register" className="btn  text-white mr-3">
                  Sign Up
                </Link>
              )}

              {isAuthenticated && (
                <Link to="/sell" className="btn  text-white mr-3">
                  Sell
                </Link>
              )}

              <Link to="/catagory" className="btn  text-white mr-3">
                Catagories
              </Link>

              {isAuthenticated && (
                <Link to="/profile" className="btn  text-white mr-3">
                  My Profile
                </Link>
              )}

              {isAuthenticated && (
                <Button
                  className="btn btn-outline text-white mr-3"
                  onClick={() => {
                    //empty local storage

                    localStorage.setItem("user", null);
                    this.props.setCurrentUser();
                    this.props.history.push("/");
                    //console.log("logOut");
                  }}
                >
                  Sign Out
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProp, {
  getAllProducts,
  getCatagories,
  setCurrentUser,
  getProductsById,
})(withRouter(Header));
