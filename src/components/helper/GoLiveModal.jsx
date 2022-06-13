import React, { useState } from "react";
import { Form, Button, Image, Modal, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";
import { videoCallBroadcastStart } from "../../store/actions/LiveVideoAction";

const GoLiveModal = (props) => {
  const [inputData, setInputData] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(0);

  const paymentStatusOnchange = (event) => {
    setInputData({
      ...inputData,
      payment_status: event,
    });
    setPaymentStatus(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(videoCallBroadcastStart(inputData));
    props.closeGoLiveModal();
  };
  return (
    <>
      <Modal
        className="modal-dialog-center sent-tip-modal go-live-modal"
        size="lg"
        centered
        show={props.goLive}
        onHide={props.closeGoLiveModal}
      >
        {props.goLive === true ? (
          <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{t("go_live")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col md={6}>
                  <div className="go-live-img-sec">
                    <Image
                        className="go-live-img"
                        src={
                            window.location.origin + "/assets/images/go-live-img.svg"
                        }
                    />
                  </div>
                </Col>
                <Col md={6}>
                <div className="header-userinfo">
                  <div className="g-avatar online_status_class">
                    <Image
                      src={props.userPicture}
                      alt={props.name}
                      className="tips__user__img"
                    />
                  </div>
                  <div className="body-userinfo">
                    <div className="popup-username-row">
                      <div className="pop-username">
                        <div className="">
                          {props.name}{" "}
                          {props.is_verified_badge == 1 ? (
                            <img
                              className="verified-badge"
                              alt="verified-badge"
                              src={
                                configuration.get(
                                  "configData.verified_badge_file"
                                )
                                  ? configuration.get(
                                      "configData.verified_badge_file"
                                    )
                                  : ""
                              }
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="popup-username-row">
                      <span className="pop-username popuser-realname">
                        <div className="pop-user-username">@{props.username}</div>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="floating-form go-live-form">
                  {/* <div className="floating-label mb-4">
                    <input
                      className="floating-input"
                      type="text"
                      placeholder={t("title")}
                      value={inputData.title ? inputData.title : null}
                      onChange={(event) =>
                        setInputData({
                          ...inputData,
                          title: event.currentTarget.value,
                        })
                      }
                    />
                    <span className="highlight"></span>
                    <label className="default-label">{t("title")}</label>
                  </div> */}
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label className="choose-payment-label">{t("title")}</Form.Label>
                    <Form.Control type="text" placeholder={t("title")}
                      value={inputData.title ? inputData.title : null}
                      onChange={(event) =>
                        setInputData({
                          ...inputData,
                          title: event.currentTarget.value,
                        })
                      } />
                  </Form.Group>
                  <Form>
                    <label className="choose-payment-label">
                      {t("choose_streaming_mode")}
                    </label>
                    {["radio"].map((type) => (
                      <div key={`custom-inline-${type}`} className="mb-3">
                        <Form.Check
                          custom
                          inline
                          label="Public"
                          type={type}
                          id="public"
                          value="public"
                          name="type"
                          // defaultChecked={true}
                          onChange={(event) =>
                            setInputData({
                              ...inputData,
                              type: "public",
                            })
                          }
                        />
                        <Form.Check
                          custom
                          inline
                          label="Private"
                          type={type}
                          // id={`custom-inline-${type}-2`}
                          id="private"
                          value="private"
                          name="type"
                          onChange={(event) =>
                            setInputData({
                              ...inputData,
                              type: "private",
                            })
                          }
                        />
                      </div>
                    ))}
                  </Form>
                  <Form>
                    <label className="choose-payment-label">
                      {t("payment_status")}
                    </label>
                    {["radio"].map((type) => (
                      <div key={`custom-inline-${type}`} className="mb-3">
                        <Form.Check
                          custom
                          inline
                          label="Free"
                          type={type}
                          id="free"
                          value="0"
                          name="payment_status"
                          // defaultChecked={true}
                          onChange={(event) => {
                            paymentStatusOnchange(event.currentTarget.value);
                          }}
                        />
                        <Form.Check
                          custom
                          inline
                          label="Paid"
                          type={type}
                          // id={`custom-inline-${type}-2`}
                          id="paid"
                          value="1"
                          name="payment_status"
                          onChange={(event) => {
                            paymentStatusOnchange(event.currentTarget.value);
                          }}
                        />
                      </div>
                    ))}
                  </Form>

                  {paymentStatus == 1 ? (
                    // <div className="floating-label mb-4">
                    //   <input
                    //     className="floating-input"
                    //     type="number"
                    //     min="0"
                    //     step="any"
                    //     value={inputData.amount ? inputData.amount : null}
                    //     onChange={(event) =>
                    //       setInputData({
                    //         ...inputData,
                    //         amount: event.currentTarget.value,
                    //       })
                    //     }
                    //   />
                    //   <span className="highlight"></span>
                    //   <label className="default-label">{t("amount")}</label>
                    // </div>
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label className="choose-payment-label">{configuration.get("configData.is_only_wallet_payment") == 1 ? t("token") : t("amount")}</Form.Label>
                      <Form.Control  type="number"
                        min="0"
                        step="any"
                        value={inputData.amount ? inputData.amount : null}
                        onChange={(event) =>
                          setInputData({
                            ...inputData,
                            amount: event.currentTarget.value,
                          })
                        } />
                    </Form.Group>
                  ) : (
                    ""
                  )}
                  {/* <div className="floating-label">
                    <input
                      className="floating-input"
                      type="text"
                      value={inputData.description ? inputData.description : null}
                      placeholder={t("go_live_description_placeholder")}
                      onChange={(event) =>
                        setInputData({
                          ...inputData,
                          description: event.currentTarget.value,
                        })
                      }
                    />
                    <span className="highlight"></span>
                    <label className="default-label">
                      {t("description")} ({t("optional")})
                    </label>
                  </div> */}
                  <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label className="choose-payment-label">{t("description")} ({t("optional")})</Form.Label>
                      <Form.Control  as="textarea" rows={2}
                        className="height-auto"
                        value={inputData.description ? inputData.description : null}
                        placeholder={t("go_live_description_placeholder")}
                        onChange={(event) =>
                          setInputData({
                            ...inputData,
                            description: event.currentTarget.value,
                          })
                        }
                      />
                    </Form.Group>
                </div>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={props.closeGoLiveModal}
              >
                {t("cancel")}
              </Button>
              <Button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleSubmit}
                disabled={props.videocall.buttonDisable}
              >
                {props.videocall.loadingButtonContent !== null
                  ? props.videocall.loadingButtonContent
                  : t("go_live")}
              </Button>
            </Modal.Footer>
          </Form>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  videocall: state.videocall.saveVideoCallRequest,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(GoLiveModal));
