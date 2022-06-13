import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import { Button, Container, Row, Col, Table, Badge } from "react-bootstrap";
import NoDataFound from "../NoDataFound/NoDataFound";
import BillingAccountLoader from "../Loader/BillingAccountLoader";
import GoLiveModal from "../helper/GoLiveModal";
import { fetchLiveVideosHistoryStart } from "../../store/actions/LiveVideoAction";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import "../Wallet/Wallet.css";

const LiveVideosIndex = (props) => {
  const [goLive, setGoLive] = useState(false);

  useEffect(() => {
    if (props.userDetails.loading) props.dispatch(fetchUserDetailsStart());
    props.dispatch(fetchLiveVideosHistoryStart());
  }, []);

  const closeGoLiveModal = () => {
    setGoLive(false);
  };

  return (
    <>
      <div className="wallet-sec live-video-list-header-sec">
        <Container>
          <Row>
            <Col sm={12} md={12}>
              <div className="wallet-header-sec">
                <Row>
                  <Col sm={12} md={12} xl={8}>
                    <Link
                      className="bookmarkes-list notify-title back-button"
                      onClick={() => props.history.goBack()}
                    >
                      <img
                        src={
                          window.location.origin +
                          "/assets/images/icons/back-white.svg"
                        }
                        className="svg-clone"
                      />
                      <h3 className="ml-2 mb-0">{t("live_history")}</h3>
                    </Link>
                    <h3></h3>
                  </Col>
                  <Col sm={12} md={12} xl={4} className="align-right">
                    <div>
                      <Link
                        className="live-history-btn mr-2"
                        to={"/live-videos"}
                      >
                        {t("live_videos")}
                      </Link>

                      <Link
                        className="go-live-btn"
                        onClick={() => setGoLive(true)}
                      >
                        {t("go_live")}
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="trans-table-sec">
        <Container>
          {props.liveVideos.loading ? (
            <BillingAccountLoader />
          ) : props.liveVideos.data.videos &&
            props.liveVideos.data.videos.length > 0 ? (
            <Row>
              <Col sm={12} md={12}>
                <div className="trans-table">
                  <Table borderedless responsive>
                    <thead>
                      <tr className="bg-white text-muted text-center">
                        <th>{t("title")}</th>
                        <th>{t("username")}</th>
                        <th>{t("streamed_date")}</th>
                        <th>{t("view_count")}</th>
                        <th>{t("status")}</th>
                        <th>{t("amount")}</th>
                        <th>{t("revenue")}</th>
                        {/* <th>{t("action")}</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {props.liveVideos.data.videos.map((videos) => (
                        <tr key={videos.user_billing_account_id}>
                          <td>{videos.title}</td>
                          <td>{videos.user_displayname}</td>
                          <td>{videos.created_at_formatted}</td>
                          <td>{videos.viewer_cnt}</td>
                          <td>{videos.payment_type_text}</td>
                          <td>{videos.amount_formatted}</td>
                          <td>{videos.user_amount_formatted}</td>
                          {/* <td>
                              
                                <Button
                                  style={{ marginBottom: "1rem" }}
                                >
                                  {t("view")}
                                </Button>
                              
                            </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          ) : (
            <NoDataFound />
          )}
        </Container>
        {props.userDetails.loading ? (
          t("loading")
        ) : (
          <GoLiveModal
            goLive={goLive}
            closeGoLiveModal={closeGoLiveModal}
            username={props.userDetails.data.username}
            userPicture={props.userDetails.data.picture}
            name={props.userDetails.data.name}
            user_id={props.userDetails.data.user_id}
          />
        )}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  liveVideos: state.liveVideo.liveVideosHistory,
  userDetails: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LiveVideosIndex));
