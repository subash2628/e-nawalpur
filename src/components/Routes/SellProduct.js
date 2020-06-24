import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { DropzoneDialog } from "material-ui-dropzone";

import ReactLoading from "react-loading";
import { connect } from "react-redux";
import {
  sellProduct,
  getAllProducts,
  getProductsById,
  getCatagories,
} from "../store/actions/productActions";

import { withRouter } from "react-router-dom";
import propTypes from "prop-types";

class SellProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: null,
      catagory: null,
      price: null,
      quantity: null,
      productImage: null,
      showUploadingPlatform: false,
      errors: null,
      loading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSell = this.onSell.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors, loading: false });
    } else if (nextProps.productId) {
      this.props.history.push("/");
      window.location.reload();
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSell() {
    this.setState({ errors: null, loading: true });
    const { name, catagory, price, quantity, productImage } = this.state;

    const newProduct = {
      name: name,
      catagory: catagory,
      price: price,
      quantity: quantity,
      productImage: productImage,
      userId: this.props.userId,
    };
    //console.log(newProduct);

    const fd = new FormData();
    //console.log(formData);

    fd.append("productImage", productImage);
    fd.append("name", name);
    fd.append("price", price);
    fd.append("catagory", catagory);
    fd.append("quantity", quantity);
    fd.append("userId", this.props.userId);
    //console.log(fd);
    this.props.sellProduct(fd);
    // this.props.getAllProducts();
    // this.props.getCatagories();
    // this.props.getProductsById();
  }

  render() {
    const {
      name,
      catagory,
      price,
      quantity,
      productImage,
      showUploadingPlatform,
      errors,
      loading,
    } = this.state;
    const classes = this.props.classes;
    const disableButton =
      name && catagory && price && quantity && productImage ? false : true;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sell Product
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Product Name"
                  autoFocus
                  //onClick={this.onChange}
                  error={errors ? (errors.name ? true : false) : false}
                  helperText={errors && errors.name}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="catagory"
                  label="Catagory"
                  name="catagory"
                  autoComplete="off"
                  onChange={this.onChange}
                  error={errors ? (errors.catagory ? true : false) : false}
                  helperText={errors && errors.catagory}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                  autoComplete="off"
                  type="number"
                  onChange={this.onChange}
                  error={errors ? (errors.price ? true : false) : false}
                  helperText={errors && errors.price}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="quantity"
                  label="Quantity"
                  type="quantity"
                  id="quantity"
                  autoComplete="off"
                  placeholder="ie 1 kg, 1 pkg, 1 pathi, 5 aana etc"
                  onChange={this.onChange}
                  error={errors ? (errors.quantity ? true : false) : false}
                  helperText={errors && errors.quantity}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.button}
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  onClick={() => this.setState({ showUploadingPlatform: true })}
                >
                  Add one productImage
                </Button>
                {errors && errors.productImage && (
                  <div className="text-justify text-danger">
                    {errors.productImage}
                  </div>
                )}
                <DropzoneDialog
                  acceptedFiles={["image/*"]}
                  cancelButtonText={"cancel"}
                  submitButtonText={"submit"}
                  maxFileSize={1024 * 1024}
                  open={showUploadingPlatform}
                  onClose={() =>
                    this.setState({ showUploadingPlatform: false })
                  }
                  onSave={(files) => {
                    console.log("Files:", files);
                    this.setState({
                      showUploadingPlatform: false,
                      productImage: files[0],
                    });
                  }}
                  showPreviews={true}
                  showFileNamesInPreview={true}
                />
              </Grid>
            </Grid>

            {!loading ? (
              <div className="mt-3">
                <Button
                  //type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={disableButton}
                  onClick={this.onSell}
                >
                  Sell
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-center mt-3">
                <ReactLoading
                  type={"spin"}
                  color={"blue"}
                  height={"10%"}
                  width={"10%"}
                />
              </div>
            )}
          </form>
        </div>
      </Container>
    );
  }
}
SellProduct.propTypes = {
  productId: propTypes.string.isRequired,
  errors: propTypes.object.isRequired,
  userId: propTypes.string.isRequired,
};

const mapStateToProp = (state) => ({
  errors: state.errors.errorSellingProduct,
  productId: state.products.soldProduct,
  userId: state.auth.user.id,
});

export default connect(mapStateToProp, {
  sellProduct,
  getAllProducts,
  getProductsById,
  getCatagories,
})(withRouter(SellProduct));
