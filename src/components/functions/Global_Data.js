import React from "react";
import ReactLoading from "react-loading";

//export const baseURL = "http://localhost:5000/e-nawalpur/us-central1/app";
export const baseURL = "https://us-central1-e-nawalpur.cloudfunctions.net/app";

export function Loading({
  type = "balls",
  color = "#ffffff",
  height = "20%",
  width = "20%",
}) {
  return (
    <ReactLoading type={type} color={color} height={height} width={width} />
  );
}
