import { baseURL } from "../../functions/Global_Data";
import {
  SET_PRODUCTS,
  GET_ERRORS_PRODUCT,
  SET_CATAGORIES,
  GET_ERRORS_CATAGORIES,
  SET_PRODUCTS_BY_ID,
  GET_ERRORS_PRODUCTBYID,
  SELL_PRODUCT,
  ERROR_SELLING_PRODUCT,
} from "./types";

import axios from "axios";
export const getAllProducts = () => (dispach) => {
  //const formatIdIntoUri = productIdArray.join("&");
  //console.log(formatIdIntoUri);
  axios
    .get(`${baseURL}/api/product/all`)
    .then((res) => {
      //const { profile } = res.data;
      //console.log(res.data);
      dispach({
        type: SET_PRODUCTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      //console.log(err.response.data);
      dispach({
        type: GET_ERRORS_PRODUCT,
        payload: err.response.data,
      });
      //console.log(err.response);
    });
};

export const getCatagories = () => (dispach) => {
  //const formatIdIntoUri = productIdArray.join("&");
  //console.log(formatIdIntoUri);
  axios
    .get(`${baseURL}/api/product/catagory/all`)
    .then((res) => {
      //const { profile } = res.data;
      //console.log(res.data);
      dispach({
        type: SET_CATAGORIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      //console.log(err.response.data);
      dispach({
        type: GET_ERRORS_CATAGORIES,
        payload: err.response.data,
      });
      //console.log(err.response);
    });
};

export const getProductsById = (productIdArray) => (dispach) => {
  const formatIdIntoUri = productIdArray.join("&");
  //console.log(formatIdIntoUri);
  axios
    .get(`${baseURL}/api/product/id/${formatIdIntoUri}`)
    .then((res) => {
      //const { profile } = res.data;
      //console.log(res.data);
      dispach({
        type: SET_PRODUCTS_BY_ID,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispach({
        type: GET_ERRORS_PRODUCTBYID,
        payload: err.response.data,
        //payload: null,
      });
      //console.log(err.response);
    });
};

export const sellProduct = (newProduct) => (dispach) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  //console.log("action ", newProduct);
  axios
    .post(`${baseURL}/api/product/sell`, newProduct, config)
    .then((res) => {
      //console.log("response ", res.data);

      dispach({
        type: SELL_PRODUCT,
        payload: res.data,
      });
      //history.push('/');
    })
    .catch((err) => {
      dispach({
        type: ERROR_SELLING_PRODUCT,
        payload: err.response.data,
      });
    });
};
