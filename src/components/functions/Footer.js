import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import ReactLoading from "react-loading";
import Button from "@material-ui/core/Button";
//import history from "./history";

export function Footer({ classes }) {
  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" gutterBottom>
        Kule Mart
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        Thanks for Visiting Our Site
      </Typography>

      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://www.google.com">
          Kule Mart
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </footer>
  );
}

export function Loading() {
  return (
    <div className="d-flex justify-content-center">
      <ReactLoading
        type={"spin"}
        color={"green"}
        height={"20%"}
        width={"20%"}
      />
    </div>
  );
}
// export function NewHeader({ classes }) {
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             edge="start"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="open drawer"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography className={classes.title} variant="h6" noWrap>
//             Material-UI
//           </Typography>
//           <div className={classes.search}>
//             <div className={classes.searchIcon}>
//               <SearchIcon />
//             </div>
//             <InputBase
//               placeholder="Search…"
//               classes={{
//                 root: classes.inputRoot,
//                 input: classes.inputInput,
//               }}
//               inputProps={{ "aria-label": "search" }}
//             />
//           </div>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }
