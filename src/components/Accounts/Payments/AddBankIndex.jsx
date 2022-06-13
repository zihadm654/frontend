import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./AddBankIndex.css";
import { addBankAccountStart } from "../../../store/actions/BankAccountAction";
import { translate, t } from "react-multi-lang";
import { Link } from "react-router-dom";

const AddBankIndex = (props) => {
  const [inputData, setInputData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(addBankAccountStart(inputData));
  };

  return (
    <div className="card-list-sec">
      <Container>
        <Link
          className="bookmarkes-list notify-title back-button head-title"
          onClick={() =>
            props.location.state && props.location.state.prevPath
              ? props.history.goBack()
              : props.history.push("/home")
          }
        >
          <img
            src={window.location.origin + "/assets/images/icons/back.svg"}
            className="svg-clone"
          />
          {t("add_bank")}
        </Link>
        {/* <h4 className="head-title">{t("add_bank")}</h4> */}
        <Row>
          <Col sm={12} md={12}>
            <div className="add-bank-box">
              <Form onSubmit={handleSubmit}>
                <Col md={6}>
                  <Form.Group controlId="formHorizontalNickname">
                    <Form.Label>{t("routing_number")}: (*)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("routing_number")}
                      value={inputData.route_number}
                      name="route_number"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          route_number: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="formHorizontalAccountNumber">
                    <Form.Label>{t("account_number")}: (*)</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={t("account_number")}
                      value={inputData.account_number}
                      min="0"
                      name="account_number"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          account_number: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="formHorizontalFirstname">
                    <Form.Label>{t("first_name")}: (*)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("first_name")}
                      value={inputData.first_name}
                      name="first_name"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          first_name: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formHorizontalLastname">
                    <Form.Label>{t("last_name")}: (*)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("last_name")}
                      value={inputData.last_name}
                      name="last_name"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          last_name: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>
                      {t("type_of_bank")}{" "}
                      <span className="text-capitalize">(*)</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="bank_type"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          bank_type: event.currentTarget.value,
                        });
                      }}
                    >
                      <option value="savings">{t("savings")}</option>
                      <option value="checking">{t("checking")}</option>
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="formHorizontalBusinessname">
                    <Form.Label>
                      {t("business_name")}: ({t("optional")})
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("business_name")}
                      value={inputData.business_name}
                      name="business_name"
                      onChange={(event) => {
                        setInputData({
                          ...inputData,
                          business_name: event.currentTarget.value,
                        });
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Check
                    inline
                    type="checkbox"
                    id="customControlAutosizing"
                    custom
                    required="required"
                    className="check-terms"
                  />
                  <Form.Label>
                    {t("i_agree_to")}
                    <Link
                      target="_blank"
                      to="/page/terms"
                      className="terms-link"
                    >
                      {" "}
                      {t("terms_conditions")}{" "}
                    </Link>
                  </Form.Label>
                </Col>

                <div className="edit-save">
                  <Button
                    className="btn gradient-btn gradientcolor addBank"
                    type="submit"
                    disabled={props.bankAccount.buttonDisable}
                  >
                    {props.bankAccount.loadingButtonContent !== null
                      ? props.bankAccount.loadingButtonContent
                      : t("submit")}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  bankAccount: state.bankAccount.addBankAccountInput,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(AddBankIndex));
