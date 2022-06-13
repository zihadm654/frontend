import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import configuration from "react-global-configuration";
import SocialButton from "../helper/SocialButton";
import { translate, t } from "react-multi-lang";
import { connect } from "react-redux";
import {
  forgotPasswordStart,
  userLoginStart,
  userRegisterStart,
  usernameValidationStart,
  referralValidationStart,
} from "../../store/actions/UserAction";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import {
  isAndroid,
  isIOS,
  isWindows,
  isMacOs,
  mobileModel,
  browserName,
  osName,
  mobileVendor,
  browserVersion
} from "react-device-detect";
import { getFcmToken, onMessageListener } from '../../firebase';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ConnectedFocusError } from 'focus-formik-error';
import "./LandingPage.css"
// import logo from "/assets/images/logo/Logo PNG.png"

const LandingPageIndex = (props) => {
  const [show, setShow] = useState("login");
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [isvalidUserName, setIsValidUserName] = useState(false)

  const [isTokenFound, setTokenFound] = useState(false);

  const [signupInputData, setSignupInputData] = useState();

  const [additionalDetails, setAdditionalDetails] = useState({
    device_type: "",
    device_model: "",
    browser_type: browserName,
    device_token: "",
  })
  const [referralCode, setReferralCode] = useState("");

  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);

  useEffect(() => {
    const referral = '';
    if (configuration.get("configData.is_referral_enabled") == 1) {
      const query = new URLSearchParams(props.location.search);
      const referral = query.get("referral");

      if (referral) {
        setReferralCode(referral);
        setShow("signup");
      }
    }

    if (isAndroid == true) {
      setAdditionalDetails({
        ...additionalDetails,
        device_type: "android",
        device_model: mobileModel,
      });
    } else if (isIOS == true) {
      setAdditionalDetails({
        ...additionalDetails,
        device_type: "ios",
        device_model: mobileModel,
      });
    } else {
      setAdditionalDetails({
        ...additionalDetails,
        device_type: "web",
        device_model: browserName + ' ' + browserVersion,
      });
    }
  }, []);

  const [validationError, setValidationError] = useState("NO");


  useEffect(() => {
    let data;
    async function tokenFunc() {
      data = await getFcmToken(setTokenFound);
      setAdditionalDetails({
        ...additionalDetails,
        device_token: data
      })
      return data;
    }
    tokenFunc();
  }, [setTokenFound]);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required *"),
    password: Yup.string()
      .required("Password is required *")
      .matches(
        /^(?=.*[a-zA-Z0-9])(?=.{6,})/,
        "Must Contain 6 Characters"
      ),
  });

  const handleLogin = (values) => {
    let newValues = { ...values, ...additionalDetails };
    props.dispatch(userLoginStart(newValues));
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required *"),
    username: Yup.string()
      .required("Username is required *"),
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required *"),
    password: Yup.string()
      .required("Password is required *")
      .matches(
        /^(?=.*[a-zA-Z0-9])(?=.{6,})/,
        "Must Contain 6 Characters"
      ),
  });

  const handleSignup = (values) => {
    let newValues = {
      ...values,
      ...additionalDetails,
      referral_code: referralCode,
    };
    props.dispatch(userRegisterStart(newValues));
  };

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address format")
      .required("Email is required *")
  });

  const handleForgotPassword = (values) => {
    props.dispatch(forgotPasswordStart(values));
  };

  const handleFacebookLogin = (user) => {
    console.log("handleFacebookLogin", user._profile);
    props.dispatch(
      userRegisterStart({
        name: user._profile.name,
        first_name: user._profile.firstName ? user._profile.firstName : "",
        last_name: user._profile.lastName ? user._profile.lastName : "",
        email: user._profile.email ? user._profile.email : "",
        social_unique_id: user._profile.id,
        picture: user._profile.profilePicURL,
        login_by: "facebook",
        device_token: additionalDetails.device_token,
      })
    );
  };

  const handleGoogleLogin = (user) => {
    console.log("handleGoogleLogin", user._profile);
    props.dispatch(
      userRegisterStart({
        name: user._profile.name,
        email: user._profile.email,
        first_name: user._profile.firstName ? user._profile.firstName : "",
        last_name: user._profile.lastName ? user._profile.lastName : "",
        social_unique_id: user._profile.id,
        picture: user._profile.profilePicURL,
        login_by: "google",
        device_token: additionalDetails.device_token,
      })
    );
  };

  const handleUsernameValidation = (username) => {
    if (username && username.length > 3) {
      if (username.replace(" ", "") === username) {
        if (username !== userName) {
          setUserName(username);
          setIsValidUserName(true);
          props.dispatch(usernameValidationStart({ username: username }));
          return "";
        }
      }
      else {
        setIsValidUserName(false);
        return "No white space allowed";
      }
    } else {
      setIsValidUserName(false);
      return "Must Contain 4 Characters";
    }
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const checkReferralCode = (event) => {
    event.preventDefault();

    if (referralCode) {
      props.dispatch(referralValidationStart({ referral_code: referralCode }));
    } else {
      const notificationMessage = getErrorNotificationMessage('Please enter the Referral code');
      props.dispatch(createNotification(notificationMessage));
    }
  };

  return (
    <>
      <div className="login-section">
        <Container className="login__container">
          <Row>
            <Col
              lg={6}
              xl={6}
              md={12}
              sm={12}
              xs={12}
              className="hidden-xs iphone-slide-area resp-btm-lg flex-49"
            >
              {/* <div className="dm-width">
                <div className="dm-device">
                  <div className="device">
                    <div className="screen">
                      <div className="slider">
                        <div className="slider__item slider__item--1">
                          <img
                            src={
                              window.location.origin +
                              "/assets/images/login-slider-1.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="slider__item slider__item--2">
                          {" "}
                          <img
                            src={
                              window.location.origin +
                              "/assets/images/login-slider-2.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="slider__item slider__item--3"></div>
                        <div className="slider__item slider__item--4"></div>
                        <div className="slider__item slider__item--5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="auth-img-left-sec">
                <Image
                  src={
                    window.location.origin +
                    "/assets/images/shapes/pattern-lines.svg"
                  }
                  alt=""
                  className="pattern"
                />
                <div className="content">
                  <Image
                    src={show === "login" ?
                      window.location.origin + "/assets/images/illustrations/chat.png" :
                      show === "forgotpassword" ? window.location.origin + "/assets/images/illustrations/lock.png" : window.location.origin + "/assets/images/illustrations/rocket-dark.png"
                    }
                    alt="login"
                    className="auth-left-img"
                  />
                  <div className="text__content">
                    <h2>{show === "login" ? "Attention is the new currency" : show === "forgotpassword" ? "Be Protective with password" : "Your journey starts here"}</h2>
                    <h5>{show === "login" ? "The more effortless the writing looks, the more effort the writer actully put into the process." : show === "forgotpassword" ? "Just as it takes a company to sustain a product, it takes a community to sustain a protocol" : "Just as it takes a company to sustain a product, it takes a community to stustain a protocol."}</h5>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} xl={6} md={12} sm={12} xs={12}>
              <div className="sign-in form-section">
                <Link to="#" aria-current="page" className="sign-in-logo">
                  <Image
                    // src={configuration.get("configData.site_logo")}
                    src="/assets/images/logo/Logo PNG.png"
                    width="237"
                    alt="logo"
                  />
                </Link>
                <p className="login-tagline">
                  {configuration.get("configData.tag_name")}
                </p>
                <div className="forms-fields">
                  {configuration.get("configData.FB_CLIENT_ID") ? (
                    <SocialButton
                      provider="facebook"
                      appId={configuration.get("configData.FB_CLIENT_ID")}
                      onLoginSuccess={handleFacebookLogin}
                      onLoginFailure={handleSocialLoginFailure}
                      className="social-button"
                      id="facebook-connect"
                    >
                      <span>
                        {t("signup")} / {t("login_with_facebook")}
                      </span>
                    </SocialButton>
                  ) : (
                    ""
                  )}

                  {configuration.get("configData.GOOGLE_CLIENT_ID") ? (
                    <SocialButton
                      provider="google"
                      key={"google"}
                      appId={configuration.get("configData.GOOGLE_CLIENT_ID")}
                      onLoginSuccess={handleGoogleLogin}
                      onLoginFailure={handleSocialLoginFailure}
                      className="social-button"
                      id="google-connect"
                    >
                      <span>
                        {t("signup")} / {t("login_with_google")}
                      </span>
                    </SocialButton>
                  ) : (
                    ""
                  )}
                  {/* <Link to="#" className="social-button" id="twitter-connect">
                    <span>Sign Up / Login with Twitter</span>
                  </Link>
                  <Link to="#" className="social-button" id="google-connect">
                    <span>Sign Up / Login with Google</span>
                  </Link> */}

                  {configuration.get("configData.GOOGLE_CLIENT_ID") ||
                    configuration.get("configData.FB_CLIENT_ID") ? (
                    <span className="or-line">
                      <span>or</span>
                    </span>
                  ) : (
                    <span classsName="login-or-hide"></span>
                  )}
                  <div id="main">
                    <div id="first">
                      {show === "login" ? (
                        <Formik
                          initialValues={{
                            email: configuration.get("configData.demo_user_email"),
                            password: configuration.get("configData.demo_user_password")
                          }}
                          validationSchema={loginSchema}
                          onSubmit={(values) => handleLogin(values)}>

                          {({ touched, errors, isSubmitting, setFieldValue }) => (
                            <Form noValidate>
                              {/* <ConnectedFocusError /> */}
                              <div class="form-group">
                                <Field
                                  type="email"
                                  name="email"
                                  placeholder="E-mail Address"
                                  className="form-control"
                                />
                                <ErrorMessage component={"div"} name="email" className='text-danger text-right' />
                              </div>
                              <div className="form-group">
                                <div class="input-group">
                                  <Field
                                    type={loginPasswordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="form-control"
                                  />
                                  <div class="input-group-append">
                                    <button
                                      onClick={() => setLoginPasswordVisible(!loginPasswordVisible)}
                                      class="btn password-eye"
                                      type="button">
                                      {loginPasswordVisible ?
                                        <i className="fas fa-eye-slash align-self-center"></i>
                                        : <i className="fas fa-eye align-self-center"></i>}
                                    </button>
                                  </div>
                                </div>
                                <ErrorMessage component={"div"} name="password" className='text-danger text-right' />
                              </div>

                              <div className="forget-password">
                                <p id="one">
                                  <Link
                                    to="#"
                                    type="button"
                                    className="forgot-link"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      setShow("forgotpassword");
                                      window.scrollTo({ top: 0, behavior: "smooth", });
                                    }}
                                  >
                                    {" "}
                                    {t("forgot_password")}{" "}
                                  </Link>
                                </p>
                              </div>

                              <Button
                                type="submit"
                                className="btn gradient-btn gradientcolor"
                                disabled={props.login.buttonDisable}
                              >
                                {props.login.loadingButtonContent !== null
                                  ? props.login.loadingButtonContent
                                  : "Login"}
                              </Button>

                              <p id="two">{t("do_not_have_an_account")}</p>
                              <p>
                                <Link
                                  className="signup"
                                  to="#"
                                  id="signup"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setShow("signup");
                                    window.scrollTo({ top: 0, behavior: "smooth", });
                                  }}
                                >
                                  {" "}
                                  {t("signup_for")}{" "}
                                  {/* {configuration.get("configData.site_name")} */}
                                  FACTZZ
                                </Link>
                              </p>
                            </Form>
                          )}
                        </Formik>
                      ) : null}
                      {show === "signup" ? (
                        <Formik
                          initialValues={{
                            name: "",
                            username: "",
                            email: "",
                            password: "",
                          }}
                          validationSchema={registerSchema}
                          onSubmit={(values) => handleSignup(values)}>

                          {({ touched, errors, isSubmitting, setFieldValue }) => (
                            <Form noValidate>
                              {/* <ConnectedFocusError /> */}
                              <div class="form-group">
                                <Field
                                  type="text"
                                  name="name"
                                  placeholder="Name"
                                  className="form-control"
                                  autocomplete="off" />
                                <ErrorMessage component={"div"} name="name" className='text-danger text-right' />
                              </div>

                              <div class="form-group">
                                <Field
                                  type="text"
                                  name="username"
                                  placeholder="User Name"
                                  className="form-control"
                                  validate={handleUsernameValidation}
                                  autocomplete="off"
                                />
                                <ErrorMessage component={"div"} name="username" className='text-danger text-right' />
                                {props.validation.isInValid && isvalidUserName ? (
                                  <div class="text-danger text-right">
                                    {t("username_already_taken")}
                                  </div>
                                ) : (
                                  ""
                                )}
                                {props.validation.isValid && isvalidUserName ? (
                                  <div class="text-success text-right">
                                    {t("looks_good")}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>

                              <div class="form-group">
                                <Field
                                  type="email"
                                  name="email"
                                  placeholder="E-mail Address"
                                  className="form-control mb-3"
                                  autocomplete="off" />
                                <ErrorMessage component={"div"} name="email" className='text-danger text-right' />
                              </div>

                              <div className="form-group">
                                <div class="input-group">
                                  <Field
                                    type={loginPasswordVisible ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    className="form-control mb-3"
                                    autocomplete="off"
                                  />
                                  <div class="input-group-append">
                                    <button
                                      onClick={() => setLoginPasswordVisible(!loginPasswordVisible)}
                                      class="btn password-eye"
                                      type="button">
                                      {loginPasswordVisible ?
                                        <i className="fas fa-eye-slash align-self-center"></i>
                                        : <i className="fas fa-eye align-self-center"></i>}
                                    </button>
                                  </div>
                                </div>
                                <ErrorMessage component={"div"} name="password" className='text-danger text-right' />
                              </div>

                              {configuration.get("configData.is_referral_enabled") == 1 ? (
                                <>
                                  <div class="form-group">
                                    <Field
                                      type="text"
                                      name="referral_code"
                                      placeholder="Referral Code(Optional)"
                                      value={referralCode}
                                      className="form-control mb-3"
                                      onChange={e => setReferralCode(e.target.value)} />
                                    <ErrorMessage component={"div"} name="referral_code" className='text-danger text-right' />
                                    <div className="check-referral-link">
                                      <a
                                        className="text-primary"
                                        href="#"
                                        onClick={checkReferralCode}
                                      >
                                        {t("check_referral_code_valid")}
                                      </a>
                                    </div>
                                  </div>
                                </>) : null}
                              <div className="round">
                                <p className="terms text-center">
                                  {t("signing_up_confirmation")}{" "}
                                  <br></br>
                                  <Link to={`/page/terms`} target="_blank">
                                    {t("terms_of_service")}
                                  </Link>{" "}
                                  {t("and")}{" "}
                                  <Link to={`/page/privacy`} target="_blank">
                                    {t("privacy_policy")}
                                  </Link>
                                  .
                                </p>
                              </div>

                              <Button
                                type="submit"
                                className="btn gradient-btn gradientcolor"
                                disabled={props.signup.buttonDisable}
                              >
                                {props.signup.loadingButtonContent !== null
                                  ? props.signup.loadingButtonContent
                                  : "Sign Up"}
                              </Button>

                              <p id="two">{t("already_have_an_account")}</p>
                              <p>
                                <Link
                                  className="signup"
                                  href="#"
                                  id="signin"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setShow("login");
                                    window.scrollTo({ top: 0, behavior: "smooth", });
                                  }}
                                >
                                  {" "}
                                  {t("login_for")}{" "}
                                  {/* {configuration.get("configData.site_name")} */}
                                  FACTZZ
                                </Link>
                              </p>
                            </Form>
                          )}
                        </Formik>
                      ) : null}
                      {show === "forgotpassword" ? (
                        <Formik
                          initialValues={{
                            email: ""
                          }}
                          validationSchema={forgotPasswordSchema}
                          onSubmit={(values) => handleForgotPassword(values)}>

                          {({ touched, errors, isSubmitting, setFieldValue }) => (
                            <Form noValidate>
                              {/* <ConnectedFocusError /> */}
                              <div class="form-group">
                                <Field
                                  type="email"
                                  name="email"
                                  placeholder="E-mail Address"
                                  className="form-control"
                                />
                                <ErrorMessage component={"div"} name="email" className='text-danger text-right' />
                              </div>
                              <Button
                                type="submit"
                                className="btn gradient-btn gradientcolor"
                                disabled={props.forgotPassword.buttonDisable}
                              >
                                {props.forgotPassword.loadingButtonContent !==
                                  null
                                  ? props.forgotPassword.loadingButtonContent
                                  : "Request Reset Link"}
                              </Button>

                              <p id="two">{t("already_have_an_account")}</p>
                              <p>
                                <Link
                                  className="signup"
                                  to="#"
                                  id="signin"
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setShow("login");
                                    window.scrollTo({ top: 0, behavior: "smooth", });
                                  }}
                                >
                                  {" "}
                                  {t("login_for")}{" "}
                                  {/* {configuration.get("configData.site_name")} */}
                                  FACTZZ
                                </Link>
                              </p>
                            </Form>
                          )}
                        </Formik>
                      ) : null}
                    </div>
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
  login: state.users.loginInputData,
  signup: state.users.registerInputData,
  forgotPassword: state.users.forgotPasswordInputData,
  validation: state.users.validationInputData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LandingPageIndex));