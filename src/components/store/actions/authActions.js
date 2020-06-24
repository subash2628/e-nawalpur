import {
  GET_ERRORS_LOGIN,
  GET_ERRORS_REGISTER,
  SET_CURRENT_USER,
  RESET_CURRENT_USER,
} from "./types";
import axios from "axios";
import { baseURL } from "../../functions/Global_Data";

//Register User
export const registeruser = (userData, history) => (dispach) => {
  axios
    .post(`${baseURL}/api/users/register`, userData)
    .then((res) => {
      //this.setState({ loggedInId: res.data.uniqueId, errors: null })
      //console.log(res.data);
      if (res.status === 200) {
        console.log(res.data.userId);
        //this.setState({ registeredId: res.data.userId, loading: false });
        //routing should be done
        history.push("/login");
      }
    })
    .catch((err) => {
      dispach({
        type: GET_ERRORS_REGISTER,
        payload: err.response.data,
      });
      //this.setState({ errors: err.response.data, loading: false });
      console.log(err.response.data);
    });
};

//login User
export const loginUser = (userData, history) => (dispach) => {
  axios
    .get(`${baseURL}/api/users/login/${userData.phone}----${userData.password}`)
    .then((res) => {
      const { user } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      dispach(setCurrentUser(user));
      history.push("/");
    })
    .catch((err) => {
      console.log(err.response.data);
      dispach({
        type: GET_ERRORS_LOGIN,
        payload: err.response.data,
        //payload: null,
      });
      //console.log(err.response);
    });
};

//set logged in user
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
};

// export const resetCurrentUser = () => {
//   return {
//     type: RESET_CURRENT_USER,
//     //payload: user,
//   };
// };
