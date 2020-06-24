import {
  GET_ERRORS_CATAGORIES,
  GET_ERRORS_PRODUCT,
  GET_ERRORS_LOGIN,
  GET_ERRORS_REGISTER,
  GET_ERRORS_PRODUCTBYID,
  ERROR_SELLING_PRODUCT,
} from "../actions/types";

const initialState = {
  products: null,
  catagories: null,
  login: null,
  register: null,
  productsById: null,
  errorSellingProduct: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS_CATAGORIES:
      return {
        ...state,
        catagories: action.payload,
      };
    case GET_ERRORS_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case GET_ERRORS_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case GET_ERRORS_REGISTER:
      return {
        ...state,
        register: action.payload,
      };
    case GET_ERRORS_PRODUCTBYID:
      return {
        ...state,
        productsById: action.payload,
      };
    case ERROR_SELLING_PRODUCT:
      return {
        ...state,
        errorSellingProduct: action.payload,
      };
    default:
      return state;
  }
}
