import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

class Catagory extends React.Component {
  constructor() {
    super();
    this.state = {
      catagories: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.catagories) {
      this.setState({ catagories: nextProps.catagories });
    }
  }
  render() {
    const { classes } = this.props;
    const catagories = this.state.catagories
      ? this.state.catagories
      : this.props.catagories;

    //catagories is object of arrays
    const keys = catagories && Object.keys(catagories);

    // catagories && console.log(catagories[keys[0]]);
    //catagories && keys.map((key) => console.log(key));

    return (
      <div>
        <div className=" mt-3 display-4">Catagories</div>
        {catagories &&
          keys.map((key) => (
            <div>
              <div className="mt-3 font-weight-bold h3">{key}</div>
              <div key={key} className="mt-5 mb-5">
                <Container className={classes.cardGrid} maxWidth="md">
                  {/* End hero unit */}
                  <Grid container spacing={4}>
                    {catagories[key].map((card) => (
                      <Grid item key={card.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                          <CardMedia
                            className={classes.cardMedia}
                            image="https://source.unsplash.com/random"
                            title={card.name}
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {card.name}
                            </Typography>
                            <Typography>
                              <div>
                                <div className="text-justify font-italic">
                                  Contact: {card.contact}
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
            </div>
          ))}
      </div>
    );
  }
}
const mapStateToProp = (state) => ({
  catagories: state.products.catagories,
});

export default connect(mapStateToProp, {})(Catagory);
