import React from "react";

import Spinner from "../spinner/spinner.component";

const WithSpinner = (WrappedComponent) => ({
  isFetching,
  passItem,
  ...otherProps
}) => {
  return isFetching || passItem === null ? (
    <Spinner />
  ) : (
    <WrappedComponent passItem={passItem} {...otherProps} />
  );
};

export default WithSpinner;
