import React from "react";
// import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
// import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
// import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
// import { baseURL } from "./Global_Data";
// import ReactLoading from "react-loading";
// import InputBase from "@material-ui/core/InputBase";
// //import Badge from '@material-ui/core/Badge';
// import SearchIcon from "@material-ui/icons/Search";
// import axios from "axios";

//import { Header } from "./HeaderAndFooter";
//import { Footer } from "./HeaderAndFooter";

import { connect } from "react-redux";

class DashBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      allProducts: null,
    };
    //this.onChange = this.onChange.bind(this);
    //this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products) {
      this.setState({ allProducts: nextProps.products });
    }
  }

  render() {
    // const classes = this.props.classes;
    const allProducts = this.state.allProducts
      ? this.state.allProducts
      : this.props.products;
    const { classes } = this.props;
    if (classes) {
      return (
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Kule Mart
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                We dont build links, We build relationships
              </Typography>
            </Container>
          </div>
          <div className="mt-5 mb-5">
            <Container className={classes.cardGrid} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {allProducts &&
                  allProducts.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardMedia
                          className="card-img-top"
                          image={card.imageLink}
                          title={card.name}
                        />
                        {/* <img
                          src={card.imageLink}
                          class="card-img-top h-10%"
                          alt="RANDOM"
                        ></img> */}
                        {/* </CardMedia> */}
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {card.name}
                          </Typography>
                          <Typography>
                            <div className="text-justify font-italic">
                              Contact:{card.contact}
                            </div>
                            <div className="text-justify font-italic">
                              Location: {card.location}
                            </div>
                            <div className="text-justify font-italic">
                              price: {card.price}
                            </div>
                            <div className="text-justify font-italic">
                              Quantity: {card.quantity}
                            </div>
                            <div className="text-justify font-italic">
                              Provider: {card.vendor}
                            </div>
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            Buy
                          </Button>
                          <Button size="small" color="primary">
                            More Details
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </Container>
          </div>
        </main>
      );
    }
    return <div></div>;
  }
}
const mapStateToProps = (state) => ({
  products: state.products.products,
});
export default connect(mapStateToProps, {})(DashBoard);
