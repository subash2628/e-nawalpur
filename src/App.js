import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Container from "@material-ui/core/Container";

//import Header from "./components/HeaderAndFooter";
import CssBaseline from "@material-ui/core/CssBaseline";

import Login from "./components/Routes/Login";
import Register from "./components/Routes/Register";
import DashBoard from "./components/Routes/DashBoard";
import Sell from "./components/Routes/SellProduct";
import Profile from "./components/Routes/profile";
import { Footer } from "./components/functions/Footer";
import Header from "./components/functions/Header";
import Catagory from "./components/Routes/catagories";
//import history from "./components/history";
import classes from "./components/styles/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouteLink,
} from "react-router-dom";

//store
import { Provider } from "react-redux";
import store from "./components/store/store";
import { setCurrentUser } from "./components/store/actions/authActions";

//checking for local storage to check user is logged in or not
if (localStorage.user) {
  store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
}

class App extends React.Component {
  render() {
    //console.log(store);
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <React.Fragment>
              <CssBaseline />
              <Header classes={classes} />

              <Container className="pt-5 pb-5">
                <Switch>
                  <Route exact path="/">
                    <DashBoard classes={classes} />
                  </Route>
                  <Route exact path="/login">
                    <Login classes={classes} />
                  </Route>
                  <Route exact path="/register">
                    <Register classes={classes} />
                  </Route>
                  <Route exact path="/sell">
                    <Sell classes={classes} />
                  </Route>
                  <Route exact path="/catagory">
                    <Catagory classes={classes} />
                  </Route>
                  <Route exact path="/profile">
                    <Profile classes={classes} />
                  </Route>
                </Switch>
              </Container>

              <Footer classes={classes} />
            </React.Fragment>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
