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

const LatestFooter = (props) => {
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
                    <Col xl={6} md={4} sm={6} xs={6} className="mb-30">
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
                    <Col xl={6} md={4} sm={6} xs={6} className="mb-30">
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
                    <Col xl={6} md={4} sm={6} xs={6} className="mb-30">
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
                <Col xl={6} lg={6} md={6} sm={12} xs={6} className="mb-30 footer-center">
                  <div className="footer-widget footer-container">
                    <div className="footer-content">
                      <p>© 2022, made with by <span>Factzz</span> for a better web.</p>
                    </div>
                  </div>
                </Col>
                <Col xl={6} lg={6} md={6} sm={12} xs={6} className="mb-30 footer-left">
                  <div className="footer-widget">
                    <ul className="list-unstyled social-links">
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
              </Row>
            </div>
          </Container>
        </footer>
      </div >
    </>
  );
};

export default LatestFooter;
