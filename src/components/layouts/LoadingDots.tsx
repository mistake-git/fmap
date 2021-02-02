import React, { Fragment} from "react";
import { Box　} from "@material-ui/core";

const LoadingDots = () => {
  return (
    <Fragment>
      <Box textAlign="center" fontWeight="bold" my={2}>
        Loading...
      </Box>
    </Fragment>
  );
};
export default LoadingDots;