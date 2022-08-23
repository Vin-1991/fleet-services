import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

const SkeletonLoader = (props) => {
  return (
    <Skeleton height={props.height} animation="wave" variant="rectangular" />
  );
};

export default SkeletonLoader;
