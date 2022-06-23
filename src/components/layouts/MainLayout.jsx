import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/index";
import { Notify } from "react-redux-notify";
import LatestFooter from "./Footer/LatestFooter";
import { connect } from "react-redux";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import { useHistory } from 'react-router-dom';
import HeaderIndex from "./Header/HeaderIndex";
import { Col, Row } from "react-bootstrap";

const MainLayout = (props) => {
  let history = useHistory();
  const [isContentCreator, setIsContentCreator] = useState(null)

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
    if (localStorage.getItem('is_content_creator') != 2) {
      setIsContentCreator(false)
    }
    else {
      setIsContentCreator(true)
    }
  }, [])

  return (
    <div style={{ overflow: 'hidden' }} className={`${themeState ? "dark-mode" : ""}`} >
      <div className="app-admin-wrap layout-sidebar-large">
        <Notify position="TopRight" />
        <Row>
          {!isContentCreator ? (
            null) : (
            <Col xl={2} sm={2} md={2}>
              {!isContentCreator ? (
                null
              ) : (
                <SideNav />
              )}
            </Col>
          )
          }
          <Col
            sm={isContentCreator ? (9) : (12)}
            md={isContentCreator ? (9) : (12)}
            xl={isContentCreator ? (9) : (12)}
            className="main__content">
            <HeaderIndex toggleTheme={toggleClass} />
            <div style={{ marginTop: '1.5rem', overflow: 'hidden' }} className="main-content-wrap sidenav-open d-flex flex-column">
              <div className="main-wrap-sec">
                {React.cloneElement(props.children)}
              </div>
              {/* <LatestFooter /> */}
            </div>
            <LatestFooter />
          </Col>
        </Row>
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