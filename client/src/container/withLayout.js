import React from "react";
import NavbarContainer from "./navbar";
const withLayout = WrappedComponent => props => (
  <div className="wrapper">
    <NavbarContainer />
    <div className="content">
      <WrappedComponent {...props} />
    </div>
  </div>
);

export default withLayout;
