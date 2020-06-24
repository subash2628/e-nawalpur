import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { fade, makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";

import { getProductsById } from "../store/actions/productActions";

function styles() {
  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMedia: {
      paddingTop: "56.25%", // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));
  return useStyles;
}

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: null,
    };
  }

  componentDidMount() {
    const classes = styles();
    this.setState({ classes: classes });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.products) {
      this.setState({ cards: nextProps.products });
    }
  }

  render() {
    const { user } = this.props;
    const { classes } = this.state;
    const cards = this.state.cards ? this.state.cards : this.props.products;
    if (!classes) {
      console.log("!classes");
      return <div></div>;
    }
    return (
      <div>
        <div className=" ">
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.CardMedia}
                image="https://source.unsplash.com/random"
                title="Contemplative Reptile"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  UserId: {user.id}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Location: {user.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Company: {user.company}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Phone: {user.phone}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </div>
        <div className=" mt-3 display-4">My Products</div>
        <div className="mt-5 mb-5">
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards &&
                cards.map((card) => (
                  <Grid item key={card.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={card.imageLink}
                        title={card.name}
                      />
                      {/* <img
                        src={card.imageLink}
                        class="card-img-top h-10%"
                        alt="RANDOM"
                      ></img> */}
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
      </div>
    );
  }
}
const mapStateToProp = (state) => ({
  user: state.auth.user,
  products: state.products.productsById,
});

export default connect(mapStateToProp, { getProductsById })(Profile);
