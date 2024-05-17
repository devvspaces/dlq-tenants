import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loading = ({ color = "#fff" }: { color?: string }) => {
  return (
    <ThreeDots
      height="20"
      width="50"
      radius="9"
      color={color}
      ariaLabel="three-dots-loading"
    />
  );
};

export default Loading;
