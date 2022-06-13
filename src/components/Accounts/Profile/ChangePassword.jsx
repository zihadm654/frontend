import React, { useState, useRef, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Image, Media, Form } from "react-bootstrap";
import "./NewSettings.css";
import { Link } from "react-router-dom";
import SettingsSidebar from "./SettingsSidebar";
import { connect } from "react-redux";
import { changePasswordStart } from "../../../store/actions/UserAction";
import { translate, t } from "react-multi-lang";
import { Form as FORM, Formik, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const ChangePassword = (props) => {

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);

  const formikRef = useRef();

  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.resetForm();
    }
  }, [props.activeSec])

  const changePasswordSchema = Yup.object().shape({
    old_password: Yup.string()
      .min(6, "Password must be 6 characters at minimum")
      .required("Old Password is required *"),
    password: Yup.string()
      .min(6, "Password must be 6 characters at minimum")
      .required("New Password is required *")
      .test('passwords-match', 'New Password should not be old password', function (value) {
        return this.parent.old_password !== value
      }),
    password_confirmation: Yup.string().required("ConfirmPassword is required")
      .test('passwords-match', 'Passwords must match', function (value) {
        return this.parent.password === value
      })
  });

  const validatePassword = (password) => {
    let msg = "";
    if (password !== password.trim())
      msg = "White space is not allowed in the begning or end of password";
    return msg;
  }

  const handleSubmit = (values) => {
    props.dispatch(changePasswordStart(values));
  };

  return (
    <>
      <div className="new-settings-sec new-change-password">
        <div className="new-settings-box">
          <SettingsSidebar />
          <div className="new-settings-main-wrapper">
            <div className="new-changes-password-box">
              <div className="settings-personal-info-card">
                <div className="settings-personal-info-header">
                  <h3>Change Password</h3>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.</p>
                </div>



                <div className="">
                  <Formik
                    innerRef={formikRef}
                    initialValues={{
                      old_password: '',
                      password: '',
                      password_confirmation: '',
                    }}
                    validationSchema={changePasswordSchema}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    {({ errors, touched, setFieldValue, resetForm }) => (
                      <FORM noValidate className="edit-profile-form">
                        <Row>
                          <Col xl={6}>
                            <div className="form-group">
                              <Form.Label>{t("old_password")}</Form.Label>
                              <div class="input-group">
                                <Field
                                  type={oldPasswordVisible ? "text" : "password"}
                                  name="old_password"
                                  placeholder={t("old_password_placeholder")}
                                  className={`no-padding form-control ${touched.old_password && errors.old_password ? "is-invalid" : ""}`}
                                  autoFocus={true}
                                />
                                <div class="input-group-append">
                                  <div
                                    onClick={() => setOldPasswordVisible(!oldPasswordVisible)}
                                    className="btn input-group-text"
                                    type="button">
                                    {oldPasswordVisible ?
                                      <i className="fas fa-eye-slash align-self-center"></i>
                                      : <i className="fas fa-eye align-self-center"></i>}
                                  </div>
                                </div>
                                <ErrorMessage
                                  component="div"
                                  name="old_password"
                                  className="invalid-feedback mt-3"
                                />
                              </div>
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              <Form.Label>{t("new_password")}</Form.Label>
                              <Field
                                type="password"
                                name="password"
                                placeholder={t("new_password_placeholder")}
                                className={`no-padding form-control ${touched.password && errors.password ? "is-invalid" : ""}`}
                                validate={validatePassword}
                              />
                              <ErrorMessage
                                component="div"
                                name="password"
                                className="invalid-feedback mt-3"
                              />
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="form-group">
                              {/* <label>
                                                                <h3>  {t("confirm_password")}</h3>
                                                            </label> */}
                              <Form.Label>{t("confirm_password")}</Form.Label>
                              <Field
                                type="password"
                                name="password_confirmation"
                                placeholder={t("confirm_password_placeholder")}
                                className={`no-padding form-control ${touched.password_confirmation && errors.password_confirmation ? "is-invalid" : ""}`}
                              />
                              <ErrorMessage
                                component="div"
                                name="password_confirmation"
                                className="invalid-feedback mt-3"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm={12} xs={12} md={12}>
                            <div className="settings-btn-sec">
                              <Button
                                className="settings-submit-btn"
                                type="submit"
                                disabled={props.changePassword.buttonDisable}>
                                {props.changePassword.loadingButtonContent != null
                                  ? props.changePassword.loadingButtonContent
                                  : t("change_password")}
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </FORM>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  changePassword: state.changePassword,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(ChangePassword));
