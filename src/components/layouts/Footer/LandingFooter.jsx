import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Media,
} from "react-bootstrap";
import "./LatestFooter.css";
import { Link } from "react-router-dom";
import configuration from "react-global-configuration";
import { translate, t } from "react-multi-lang";
import {
  setTranslations,
  setDefaultLanguage,
  setLanguage,
  getLanguage,
} from "react-multi-lang";

const LandingFooter = (props) => {
  const handleChangeLang = ({ currentTarget: input }) => {
    console.log(input.value);
    setLanguage(input.value);
    localStorage.setItem("lang", input.value);
    // window.location.reload();
  };

  return (
    <>
      <div className="latest-footer-sec landing-footer-sec">
        <footer className="footer-section latest-footer-box">
          <Container>
            {configuration.get("configData.contact_address") || configuration.get("configData.contact_email") || configuration.get("configData.contact_mobile") ?
              <div className="footer-cta pt-5 pb-5">
                <Row className="justify-content-center">
                  {configuration.get("configData.contact_address") ? (
                    <Col xl={4} md={4} sm={6} xs={6} className="mb-30">
                      <div className="single-cta resp-mrg-btn-xs">
                        <i className="fas fa-map-marker-alt"></i>
                        <div className="cta-text">
                          <h4>Find us</h4>
                          <span>
                            {configuration.get("configData.contact_address")}
                          </span>
                        </div>
                      </div>
                    </Col>
                  ) : (
                    ""
                  )}
                  {configuration.get("configData.contact_mobile") ? (
                    <Col xl={4} md={4} sm={6} xs={6} className="mb-30">
                      <div className="single-cta footer-aligin-center resp-mrg-btn-xs">
                        <i className="fas fa-phone"></i>
                        <div className="cta-text">
                          <h4>Call us</h4>
                          <span>
                            {configuration.get("configData.contact_mobile")}
                          </span>
                        </div>
                      </div>
                    </Col>
                  ) : (
                    ""
                  )}
                  {configuration.get("configData.contact_email") ? (
                    <Col xl={4} md={4} sm={6} xs={6} className="mb-30">
                      <div className="single-cta footer-aligin-last">
                        <i className="far fa-envelope-open"></i>
                        <div className="cta-text">
                          <h4>Mail us</h4>
                          <span>
                            {configuration.get("configData.contact_email")}
                          </span>
                        </div>
                      </div>
                    </Col>
                  ) : (
                    ""
                  )}
                </Row>
              </div>
              : ""}
            <div className="footer-content pt-5 pb-5">
              <Row>
                <Col xl={4} lg={3} md={5} sm={5} xs={6} className="mb-30 footer-center">
                  <div className="footer-widget logo-container">
                    <div className="footer-logo">
                      <Link to="#">
                        <Image
                          className="footer-logo"
                          // src={configuration.get("configData.site_logo")}
                          src="/assets/images/logo/Logo PNG.png"
                        />
                      </Link>
                    </div>
                  </div>
                </Col>
                <Col xl={4} lg={3} md={5} sm={5} xs={5} className="mb-30 footer-left">
                  <div className="footer-widget">
                    {/* <div className="footer-widget-heading">
                      <h3>{configuration.get("configData.site_name")}</h3>
                      <h3>Factzz</h3>
                    </div> */}
                    <ul className="list-unstyled">
                      {configuration
                        .get("configData.footer_pages1")
                        .map((static_page, index) => (
                          <Media
                            as="li"
                            key={"sp-" + static_page.static_page_unique_id}
                          >
                            <Link
                              to={`/page/${static_page.static_page_unique_id}`}
                              key={static_page.static_page_unique_id}
                            >
                              {static_page.title}
                            </Link>
                          </Media>
                        ))}
                      {configuration
                        .get("configData.footer_pages2")
                        .map((static_page, index) => (
                          <Media
                            as="li"
                            key={"sp-" + static_page.static_page_unique_id}
                          >
                            <Link
                              to={`/page/${static_page.static_page_unique_id}`}
                              key={static_page.static_page_unique_id}
                            >
                              {static_page.title}
                            </Link>
                          </Media>
                        ))}
                    </ul>
                  </div>
                </Col>
                <Col xl={4} lg={4} md={6} sm={6} xs={6} className="footer-right">
                  <div className="footer-widget">
                    <div className="footer-social-icon">
                      <ul className="footer-social-link-sec list-unstyled social-media">
                        <div className="icons-container">

                          {configuration.get("configData.facebook_link") ?
                            <Media as="li">
                              <a
                                href={configuration.get("configData.facebook_link")}
                                target="_blank"
                              >
                                <i className="fab fa-facebook-f"></i>
                              </a>
                            </Media>
                            : ""}
                          {configuration.get("configData.twitter_link") ?
                            <Media as="li">
                              <a
                                href={configuration.get("configData.twitter_link")}
                                target="_blank"
                              >
                                <i className="fab fa-twitter"></i>
                              </a>
                            </Media>
                            : ""}
                          {configuration.get("configData.instagram_link") ?
                            <Media as="li">
                              <a
                                href={configuration.get("configData.instagram_link")}
                                target="_blank"
                              >
                                <i className="fab fa-instagram"></i>
                              </a>
                            </Media>
                            : ""}
                          {configuration.get("configData.linkedin_link") ?

                            <Media as="li">
                              <a
                                href={configuration.get("configData.linkedin_link")}
                                target="_blank"
                              >
                                <i className="fab fa-linkedin-in"></i>
                              </a>
                            </Media>
                            : ""}
                          {configuration.get("configData.pinterest_link") ?

                            <Media as="li">
                              <a
                                href={configuration.get("configData.pinterest_link")}
                                target="_blank"
                              >
                                <i className="fab fa-pinterest"></i>
                              </a>
                            </Media>
                            : ""}
                          {configuration.get("configData.youtube_link") ?

                            <Media as="li">
                              <a
                                href={configuration.get("configData.youtube_link")}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="fab fa-youtube"></i>
                              </a>
                            </Media>
                            : ""}
                          {configuration.get("configData.snapchat_link") ?

                            <Media as="li">
                              <a
                                href={configuration.get("configData.snapchat_link")}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="fab fa-snapchat"></i>
                              </a>
                            </Media>
                            : ""}
                        </div>
                        {configuration.get("configData.is_multilanguage_enabled") == 1 ? (

                          <div className="select-lang-drop-down">
                            <select className="form-control mw-200"
                              name="lang"
                              onChange={handleChangeLang}
                              defaultValue={localStorage.getItem("lang")}
                            >
                              <option
                                value="en"
                              // selected={
                              //     localStorage.getItem("lang") == "en" ? true : false
                              // }
                              >
                                {t("english")}
                              </option>
                              <option
                                value="es"
                              // selected={
                              //     localStorage.getItem("lang") == "es" ? true : false
                              // }
                              >
                                {t("spanish")}
                              </option>
                            </select>
                          </div>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <div className="copyright-area">
            <Container>
              <Row>
                <Col xl={12} lg={12} className="text-center">
                  <div className="copyright-text">
                    <p>{configuration.get("configData.copyright_content")}</p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingFooter;
