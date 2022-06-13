import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Row, Col } from "react-bootstrap";
import { changePasswordStart } from "../../../store/actions/UserAction";
import { translate, t } from "react-multi-lang";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';

const OldChangePasswordCard = (props) => {
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
      <div
        role="tabpanel"
        className={
          props.activeSec === "change-password-card"
            ? "tab-pane fade in active"
            : "tab-pane fade"
        }
        id="Section3"
      >
        <div className="change-password-sec">
          <div className="card-header bg-transparent">
            <h4>{t("change_password")}</h4>
          </div>
          <div className="card-body">
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
              {({ errors, touched, setFieldValue , resetForm }) => (
                <Form noValidate>
                  <div className="form-group">
                    <label><h3>{t("old_password")}</h3></label>
                    <Field
                      type="password"
                      name="old_password"
                      placeholder={t("old_password_placeholder")}
                      className={`no-padding form-control ${touched.old_password && errors.old_password ? "is-invalid" : ""}`}
                    />
                    <ErrorMessage
                      component="div"
                      name="old_password"
                      className="invalid-feedback mt-3"
                    />
                  </div>
                  <div className="form-group">
                    <label><h3>{t("new_password")}</h3></label>
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
                  <div className="form-group">
                    <label>
                      <h3> {t("confirm_password")} </h3>
                    </label>
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
                  <Row className="mt-5">
                    <Col sm={12} xs={12} md={6} className="mx-auto">
                      <Button
                        className="btn gradient-btn gradientcolor"
                        type="submit"
                        disabled={props.changePassword.buttonDisable}>
                        {props.changePassword.loadingButtonContent != null
                          ? props.changePassword.loadingButtonContent
                          : t("change_password")}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
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

export default connect(mapStateToPros, mapDispatchToProps)(translate(OldChangePasswordCard));
