import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loading = () => {
  return (
    <ThreeDots
      height="20"
      width="50"
      radius="9"
      color="#fff"
      ariaLabel="three-dots-loading"
    />
  );
};

export default Loading;
