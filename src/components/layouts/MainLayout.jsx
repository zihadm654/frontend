import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/index";
import { Notify } from "react-redux-notify";
import LatestFooter from "./Footer/LatestFooter";
import { connect } from "react-redux";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import { useHistory } from 'react-router-dom';
import HeaderIndex from "./Header/HeaderIndex";

const MainLayout = (props) => {
  let history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('userLoginStatus'))

  const [themeState, setThemeState] = useState(false);

  const toggleClass = () => {
    setThemeState(!themeState);
  };

  useEffect(() => {
    props.dispatch(fetchUserDetailsStart());
  }, []);

  useEffect(() => {
    if (!props.profile.loading && props.profile.data.is_email_verified === 0) {
      history.push('/register/verify');
    }
  }, [props.profile]);
  useEffect(() => {
    if (localStorage.getItem('userLoginStatus') === "true") {
      setIsLoggedIn(true)
    }
    else {
      setIsLoggedIn(false)
    }
  }, [])
  // const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  console.log(isLoggedIn)
  return (
    <div className={`${themeState ? "dark-mode" : ""}`} >
      <div className="app-admin-wrap layout-sidebar-large">
        <Notify position="TopRight" />
        <HeaderIndex toggleTheme={toggleClass} />
        {/* <SideNav /> */}
        <div className="main-content-wrap sidenav-open d-flex flex-column">
          <div className="main-wrap-sec">
            {React.cloneElement(props.children)}
          </div>
          <LatestFooter />
        </div>
      </div>
    </div>
  );
}

const mapStateToPros = (state) => ({
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros, mapDispatchToProps
)(MainLayout);