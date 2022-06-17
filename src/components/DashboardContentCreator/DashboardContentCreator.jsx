import React, { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./DashboardContentCreator.css";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchContentCreatorDashboardStart } from "../../store/actions/UserAction";
import NoDataFound from "../NoDataFound/NoDataFound";
import { translate, t } from "react-multi-lang";

const DashboardContentCreator = (props) => {
  useEffect(() => {
    props.dispatch(fetchContentCreatorDashboardStart());
  }, []);

  const state = {
    labels: props.dashboard.loading
      ? ["January", "February", "March", "April", "May"]
      : props.dashboard.data.analytics.last_x_days_month,
    datasets: [
      {
        label: "Revenue",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        fill: true,
        data: props.dashboard.loading
          ? [65, 59, 80, 81, 56]
          : props.dashboard.data.analytics.last_x_days_earning,
      },
    ],
  };
  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14
    }
  };

  const options = {
    title: {
      display: true,
      text: t('last_x_day_revenue'),
      fontSize: 20
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      ]
    }
  };

  return (
    <>
      {props.dashboard.loading ? null : (
        <div className="dashboard-content-creator-sec">
          <Container>
            <h1>General Statictics</h1>
            <Row>
              <Col xl={3} lg={3} md={6} sm={6}>
                <div className="dashboard-card">
                  <div className="dashboard-content">
                    <h6>{t("total_posts")}</h6>
                    <p>{props.dashboard.data.total_posts}</p>
                  </div>
                  <div className="dashboard-icon-sec">
                    <i className="far fa-map"></i>
                  </div>
                </div>
              </Col>
              <Col xl={3} lg={3} md={6} sm={6}>
                <div className="dashboard-card">
                  <div className="dashboard-content">
                    <h6>{t("total_chat_asset_amount")}</h6>
                    <p>{props.dashboard.data.chat_asset_payments}</p>
                  </div>
                  <div className="dashboard-icon-sec">
                    <i className="fas fa-chart-line"></i>
                  </div>
                </div>
              </Col>
              <Col xl={3} lg={3} md={6} sm={6}>
                <div className="dashboard-card">
                  <div className="dashboard-content">
                    <h6>{t("total_revenue_amount")}</h6>
                    <p>{props.dashboard.data.total_payments}</p>
                  </div>
                  <div className="dashboard-icon-sec">
                    <i className="far fa-star"></i>
                  </div>
                </div>
              </Col>
              <Col xl={3} lg={3} md={6} sm={6}>
                <div className="dashboard-card">
                  <div className="dashboard-content">
                    <h6>{t("total_post_amount")}</h6>
                    <p>{props.dashboard.data.post_payments}</p>
                  </div>
                  <div className="dashboard-icon-sec">
                    <i className="far fa-heart"></i>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl={3} lg={3} md={6} sm={6}>
                <div className="dashboard-card">
                  <div className="dashboard-content">
                    <h6>{t("total_subscription_amount")}</h6>
                    <p>{props.dashboard.data.subscription_payments}</p>
                  </div>
                  <div className="dashboard-icon-sec">
                    <i className="far fa-map"></i>
                  </div>
                </div>
              </Col>
              <Col xl={3} lg={3} md={6} sm={6}>
                <div className="dashboard-card">
                  <div className="dashboard-content">
                    <h6>{t("total_tips_amount")}</h6>
                    <p>{props.dashboard.data.user_tips}</p>
                  </div>
                  <div className="dashboard-icon-sec">
                    <i className="fas fa-usd"></i>
                  </div>
                </div>
              </Col>
              <Col xl={3} lg={3} md={6} sm={6}>
                <div className="dashboard-card">
                  <div className="dashboard-content">
                    <h6>{t("total_video_call_amount")}</h6>
                    <p>{props.dashboard.data.video_call_payments}</p>
                  </div>
                  <div className="dashboard-icon-sec">
                    <i className="fas fa-video-camera"></i>
                  </div>
                </div>
              </Col>
              <Col xl={3} lg={3} md={6} sm={6}>
                <div className="dashboard-card">
                  <div className="dashboard-content">
                    <h6>{t("total_audio_call_amount")}</h6>
                    <p>{props.dashboard.data.audio_call_payments}</p>
                  </div>
                  <div className="dashboard-icon-sec">
                    <i className="fas fa-phone"></i>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="margin-to-lg">
              <Col md={6}>
                <div className="dashboard-box">
                  <h3>{t('last_x_day_revenue')}</h3>
                  <div className="dashboard-chart-sec">
                    {/* <div> */}
                    <Line data={state} legend={legend} options={options} />
                    {/* </div> */}
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="dashboard-box">
                  {props.dashboard.loading ? (
                    "Loading.."
                  ) : (
                    <>
                      <h3 className="mb-3">{t('recent_followers')}</h3>
                      {props.dashboard.data.followers.length > 0 ? (
                        props.dashboard.data.followers.map((follower) => (
                          <div className="dashboard-user-card">
                            <div className="dashboard-user-img-sec">
                              <Image
                                className="dashboard-user-img"
                                src={follower.picture}
                              />
                            </div>
                            <div className="dashboard-user-details">
                              <h5>{follower.name}</h5>
                              <Link to={`/` + follower.u_unique_id}>
                                @{follower.username}
                              </Link>
                            </div>
                          </div>
                        ))) : (
                        <NoDataFound></NoDataFound>
                      )}
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  dashboard: state.users.dashboard,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(DashboardContentCreator));
