import React, { useState, useEffect } from "react";
import NotificationAllSec from "./NotificationAllSec";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { fetchNotificationsStart } from "../../store/actions/NotificationAction";
import { connect } from "react-redux";
import NotificationLoader from "../Loader/NotificationLoader";
import NotificationTabSec from "./NotificationTabSec";
import NotificationCommentsSec from "./NotificationCommentsSec";
import NotificationLikedSec from "./NotificationLikedSec";
import NotificationSubscribedSec from "./NotificationSubscribedSec";
import NotificationTippedSec from "./NotificationTippedSec";
import NotificationVideoCallSec from "./NotificationVideoCallSec";
import NotificationAudioCallSec from "./NotificationAudioCallSec";
import { translate, t } from "react-multi-lang";

const NotificationIndex = (props) => {
  const [activeSec, setActiveSec] = useState("notify-all");

  useEffect(() => {
    props.dispatch(fetchNotificationsStart());
  }, []);

  const changeSection = (event, type) => {
    setActiveSec(type);
    if (type == "notify-all") {
      props.dispatch(fetchNotificationsStart());
    } else {
      props.dispatch(fetchNotificationsStart({ notification_type: type }));
    }
  };

  return (
    <>
      <div className="notification-page">
        <Container>
          <Row>
            <Col sm={12} md={12} xs={12}>
              <div className="profile-post-area">
                <div className="bookmarkes-list bookmarks-right-side resp-sapce-center">
                  <div className="pull-left">
                    <Link className="bookmarkes-list notify-title" to={`/home`}>
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/icons/back.svg"
                        }
                        className="svg-clone"
                      />
                      {t("notifications")}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="tabbable-panel">
                <div className="tab" role="tabpanel">
                  <NotificationTabSec
                    activeSec={activeSec}
                    setActiveSec={setActiveSec}
                    changeSection={changeSection}
                  />
                  <div className="tab-content tabs padding-top-md">
                    {props.notification.loading ? (
                      <NotificationLoader></NotificationLoader>
                    ) : (
                      <>
                        <NotificationAllSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                        />

                        <NotificationCommentsSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                        />

                        <NotificationLikedSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                        />

                        <NotificationSubscribedSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                        />

                        <NotificationTippedSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                        />

                        <NotificationVideoCallSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                        />

                        <NotificationAudioCallSec
                          activeSec={activeSec}
                          setActiveSec={setActiveSec}
                          notifications={props.notification.data.notifications}
                          totalNotifications={props.notification.data.total}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  notification: state.notification.notification,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NotificationIndex));
