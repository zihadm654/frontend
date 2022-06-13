import React, { Component } from "react";
import AuthHeader from "./Header/AuthHeader";
import { Notify } from "react-redux-notify";
import LandingFooter from "./Footer/LandingFooter";

class AuthLayout extends Component {
  state = {};
  render() {
    return (
      <body>
        <Notify position="TopRight" />
        <AuthHeader />
        <div className="landing-main-wrapper">
          {React.cloneElement(this.props.children)}
        </div>
        <LandingFooter />
      </body>
    );
  }
}

export default AuthLayout;
