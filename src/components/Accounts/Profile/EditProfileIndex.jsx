import React, { useState, useEffect, useRef } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media, Nav, Tab, InputGroup, FormControl, FormLabel } from "react-bootstrap";
import "./NewSettings.css";
import { Link } from "react-router-dom";
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { fetchUserDetailsStart } from "../../../store/actions/UserAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import Map, { GoogleApiWrapper, Marker } from "google-maps-react";
import { apiConstants } from "../../Constant/constants";
import { Formik, Form as FORM, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    updateUserDetailsStart
} from '../../../store/actions/UserAction';
import configuration from "react-global-configuration";


const personalInfoSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, 'Too Short!')
        .required('Username is required'),
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
});

const urlValidation = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;

const socialInfoSchema = Yup.object().shape({
    twitter_link: Yup.string().matches(urlValidation, 'URL is not valid'),
    instagram_link: Yup.string().matches(urlValidation, 'URL is not valid'),
    youtube_link: Yup.string().matches(urlValidation, 'URL is not valid'),
    amazon_wishlist: Yup.string().matches(urlValidation, 'URL is not valid'),
    pinterest_link: Yup.string().matches(urlValidation, 'URL is not valid'),
    linkedin_link: Yup.string().matches(urlValidation, 'URL is not valid'),
    snapchat_link: Yup.string().matches(urlValidation, 'URL is not valid'),
    twitch_link: Yup.string().matches(urlValidation, 'URL is not valid'),
    website: Yup.string().matches(urlValidation, 'URL is not valid'),
});

const EditProfileIndex = (props) => {
    const { profile, profileInputData } = props;

    const personnelRef = useRef();
    const additionalRef = useRef();
    const monetizationRef = useRef();
    const socialRef = useRef();

    const [address, setAddress] = useState("");

    const [subscription, setSubscription] = useState({
        monthly_amount: '',
        yearly_amount: '',
        video_call_amount: '',
        audio_call_amount: '',
    });

    const [subscriptionError, setSubscriptionError] = useState({
        monthly_amount: '',
        yearly_amount: '',
        video_call_amount: '',
        audio_call_amount: '',
    });

    let autocomplete;

    const renderAutoComplete = () => {

        const { google } = props;
        if (!google) {
            console.log("asdfsadfasdfno");
            return;
        }

        autocomplete = new google.maps.places.Autocomplete(autocomplete, {
            types: ["geocode"]
        });

        autocomplete.setFields(["address_component", "geometry", "name"]);

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            console.log("Place", place);
            if (!place.geometry) return;
            let full_address = "";
            place.address_components.map(
                (address) =>
                (full_address =
                    full_address == ""
                        ? address.long_name
                        : full_address + "," + address.long_name)
            );

            personnelRef.current.setFieldValue("address", full_address);
            personnelRef.current.setFieldValue("latitude", place.geometry.location.lat());
            personnelRef.current.setFieldValue("longitude", place.geometry.location.lng());
            setAddress(full_address);
        });

    };


    useEffect(() => {
        if (profile.loading) {
            props.dispatch(fetchUserDetailsStart());
        }

    }, []);

    useEffect(() => {
        if (!profile.loading && profile.data) {
            // Basic Details
            personnelRef.current.setFieldValue("username", profile.data.username);
            personnelRef.current.setFieldValue("name", profile.data.name);
            personnelRef.current.setFieldValue("email", profile.data.email);
            personnelRef.current.setFieldValue("about", profile.data.about);
            personnelRef.current.setFieldValue("address", profile.data.address);
            personnelRef.current.setFieldValue("latitude", profile.data.latitude);
            personnelRef.current.setFieldValue("longitude", profile.data.longitude);
            setAddress(profile.data.address);

            // Additional Details
            additionalRef.current.setFieldValue("gender", profile.data.gender);
            additionalRef.current.setFieldValue("height", profile.data.height);
            additionalRef.current.setFieldValue("eyes_color", profile.data.eyes_color);
            additionalRef.current.setFieldValue("weight", profile.data.weight);
            additionalRef.current.setFieldValue("category_id", profile.data.category_id);

            //Subscription Details
            setSubscription({
                monthly_amount: profile.data.monthly_amount,
                yearly_amount: profile.data.yearly_amount,
                video_call_amount: profile.data.video_call_amount,
                audio_call_amount: profile.data.audio_call_amount,
            });

            //Social Details
            socialRef.current.setFieldValue("twitter_link", profile.data.twitter_link);
            socialRef.current.setFieldValue("instagram_link", profile.data.instagram_link);
            socialRef.current.setFieldValue("youtube_link", profile.data.youtube_link);
            socialRef.current.setFieldValue("amazon_wishlist", profile.data.amazon_wishlist);
            socialRef.current.setFieldValue("pinterest_link", profile.data.pinterest_link);
            socialRef.current.setFieldValue("linkedin_link", profile.data.linkedin_link);
            socialRef.current.setFieldValue("snapchat_link", profile.data.snapchat_link);
            socialRef.current.setFieldValue("twitch_link", profile.data.twitch_link);
            socialRef.current.setFieldValue("website", profile.data.website);
        }
    }, [profile]);

    const udateSubscriptionDetails = e => {
        e.preventDefault();
        if (validateSubscription()) {
            setSubscriptionError({
                monthly_amount: '',
                yearly_amount: '',
                video_call_amount: '',
                audio_call_amount: '',
            });
            props.dispatch(updateUserDetailsStart(subscription));
        }
    }

    const validateSubscription = () => {
        let status = true;
        const keys = ["monthly_amount", "yearly_amount", "video_call_amount", "audio_call_amount"];
        let newError = {};
        keys.map(key => {
            if (subscription[key] < 0) {
                status = false;
                newError = {
                    ...newError,
                    [key]: "Should not be less than 0"
                };
            } else if (subscription[key] > 1000) {
                status = false;
                newError = {
                    ...newError,
                    [key]: "Should not be greater than 1000"
                };
            }
        })
        setSubscriptionError(newError);
        return status;
    }

    return (
        <>
            <div className="new-edit-profile-tab">
                <Tab.Container id="left-tabs-example" defaultActiveKey="personal-info">
                    <Row>
                        <Col sm={12}>
                            <Nav variant="pills">
                                <Nav.Item>
                                    <Nav.Link eventKey="personal-info">
                                        <span>
                                            <Image
                                                className="edit-profile-tab-icon"
                                                src={
                                                    window.location.origin + "/assets/images/new-settings/personal-info.png"
                                                }
                                            />
                                        </span>
                                        <span className="resp-display-none">Personal Info</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="add-information">
                                        <span>
                                            <Image
                                                className="edit-profile-tab-icon"
                                                src={
                                                    window.location.origin + "/assets/images/new-settings/additional-info.png"
                                                }
                                            />
                                        </span>
                                        <span className="resp-display-none">Additional Information</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="subscription-plans">
                                        <span>
                                            <Image
                                                className="edit-profile-tab-icon"
                                                src={
                                                    window.location.origin + "/assets/images/new-settings/subscription-plans.png"
                                                }
                                            />
                                        </span>
                                        <span className="resp-display-none">Monetization</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="social-media-links">
                                        <span>
                                            <Image
                                                className="edit-profile-tab-icon"
                                                src={
                                                    window.location.origin + "/assets/images/new-settings/social-link.png"
                                                }
                                            />
                                        </span>
                                        <span className="resp-display-none">Social Media Links</span>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={12}>
                            <Tab.Content>
                                <Tab.Pane eventKey="personal-info">
                                    <div className="settings-personal-info-sec">
                                        <div className="settings-personal-info-card">
                                            <div className="settings-personal-info-header">
                                                <h3>{t("personal_info_heading")}</h3>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.</p>
                                            </div>
                                            <div className="settings-personal-info-body">
                                                <Formik
                                                    innerRef={personnelRef}
                                                    initialValues={{
                                                        username: '',
                                                        name: '',
                                                        email: '',
                                                        about: '',
                                                        address: '',
                                                        latitude: '',
                                                        longitude: '',
                                                    }}
                                                    validationSchema={personalInfoSchema}
                                                    onSubmit={values => {
                                                        props.dispatch(updateUserDetailsStart(values))
                                                    }}
                                                >
                                                    {({ values, errors, touched }) => (
                                                        <FORM className="edit-profile-form" noValidate>
                                                            <Row>
                                                                <Col md={6}>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("username")}</Form.Label>
                                                                        <Form.Text className="text-muted">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                        </Form.Text>
                                                                        <Field className="form-control" type="email" placeholder={t("username_placeholder")} name="username" autoFocus={true} />
                                                                        <ErrorMessage name="username" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("display_name")}</Form.Label>
                                                                        <Form.Text className="text-muted">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                        </Form.Text>
                                                                        <Field className="form-control" type="email" placeholder={t("display_name_placeholder")} name="name" />
                                                                        <ErrorMessage name="name" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                    {/* <Form.Group>
                                                                        <Form.Label>Choose Category</Form.Label>
                                                                        <Form.Text className="text-muted">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                        </Form.Text>
                                                                        <Form.Control
                                                                            as="select"
                                                                            className="mr-sm-2"
                                                                            id="inlineFormCustomSelect"
                                                                            custom
                                                                        >
                                                                            <option value="0">Celebrity</option>
                                                                            <option value="1">Actor</option>
                                                                            <option value="2">Businees</option>
                                                                            <option value="3">Corporate</option>
                                                                        </Form.Control>
                                                                    </Form.Group> */}
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("email_address")}</Form.Label>
                                                                        <Form.Text className="text-muted">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                        </Form.Text>
                                                                        <Field className="form-control" type="email" placeholder={t("email_address_placeholder")} name="email" />
                                                                        <ErrorMessage name="email" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("your_location")}</Form.Label>
                                                                        <Form.Text className="text-muted">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                        </Form.Text>
                                                                        <InputGroup>
                                                                            <FormControl
                                                                                className="form-control"
                                                                                placeholder={address ? address : t("your_location_placeholder")}
                                                                                aria-describedby="basic-addon2"
                                                                                name="address"
                                                                                // value={values.address}
                                                                                // onChange={e => personnelRef.current.setFieldValue("address", e.target.value)}
                                                                                onFocus={renderAutoComplete}
                                                                                ref={ref => (autocomplete = ref)}
                                                                            />
                                                                            <InputGroup.Text id="basic-addon2">
                                                                                <span>
                                                                                    <Image
                                                                                        className="map-maker-icon"
                                                                                        src={
                                                                                            window.location.origin + "/assets/images/new-settings/map-marker-icon.png"
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </InputGroup.Text>
                                                                        </InputGroup>
                                                                    </Form.Group>
                                                                    <Form.Group>
                                                                        <div className="map-sec">
                                                                            <Image
                                                                                className="map-maker-icon"
                                                                                src={
                                                                                    window.location.origin + "/assets/images/new-settings/map-img.png"
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={12}>
                                                                    <Form.Group controlId="exampleForm.ControlTextarea1" className="margin-btm-zero">
                                                                        <Form.Label>{t("about_me")}</Form.Label>
                                                                        <Form.Text className="text-muted">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                        </Form.Text>
                                                                        <Field className="form-control" as="textarea" rows={3} placeholder={t("about_me_placeholder")} name="about" />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={12}>
                                                                    <div className="settings-btn-sec">
                                                                        <Button
                                                                            type="submit"
                                                                            className="settings-submit-btn"
                                                                            disabled={profileInputData.buttonDisbled}
                                                                        >
                                                                            {profileInputData.loadingButtonContent ?
                                                                                profileInputData.loadingButtonContent :
                                                                                t("submit")
                                                                            }
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
                                </Tab.Pane>
                                <Tab.Pane eventKey="add-information">
                                    <div className="settings-personal-info-sec">
                                        <div className="settings-personal-info-card">
                                            <div className="settings-personal-info-header">
                                                <h3>{t("additional_info_heading")}</h3>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.</p>
                                            </div>
                                            <div className="settings-personal-info-body">
                                                <Formik
                                                    innerRef={additionalRef}
                                                    initialValues={{
                                                        gender: '',
                                                        height: '',
                                                        eyes_color: '',
                                                        weight: '',
                                                        category_id: '',
                                                    }}
                                                    onSubmit={values => {
                                                        props.dispatch(updateUserDetailsStart(values))
                                                    }}
                                                >
                                                    {({ values, errors, touched }) => (
                                                        <FORM className="edit-profile-form">
                                                            <Row>
                                                                <Col md={6}>
                                                                    <Form.Group>
                                                                        <Form.Label>{t("gender")}</Form.Label>
                                                                        <Form.Text className="text-muted">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                        </Form.Text>
                                                                        <Field
                                                                            className="form-control mr-sm-2"
                                                                            as="select"
                                                                            id="inlineFormCustomSelect"
                                                                            custom
                                                                            name="gender"
                                                                        >
                                                                            <option value="rather-not-select">{t("rather_not_select")}</option>
                                                                            <option value="male">{t("male")}</option>
                                                                            <option value="female">{t("female")}</option>
                                                                        </Field>
                                                                    </Form.Group>
                                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>{t("eyes_color")}</Form.Label>
                                                                        <Form.Text className="text-muted">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                        </Form.Text>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder={t("eye_color_placeholder")}
                                                                            name="eyes_color" />
                                                                    </Form.Group>
                                                                    <Form.Group>
                                                                        <Form.Label>{t("choose_category")}</Form.Label>
                                                                        <Form.Text className="text-muted">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                        </Form.Text>
                                                                        <Field
                                                                            className="form-control mr-sm-2"
                                                                            as="select"
                                                                            id="inlineFormCustomSelect"
                                                                            custom
                                                                            name="category_id"
                                                                        >
                                                                            {profile.data.categories && profile.data.categories.map((category, index) =>
                                                                                <option value={category.category_id} key={index}>{category.name}</option>
                                                                            )}
                                                                        </Field>
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>{t("height")}</Form.Label>
                                                                        <Form.Text className="text-muted">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                        </Form.Text>
                                                                        <Field
                                                                            className="form-control"
                                                                            type="text"
                                                                            placeholder={t("height_placeholder")}
                                                                            name="height" />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="exampleForm.ControlInput1">
                                                                        <Form.Label>{t("weight")}</Form.Label>
                                                                        <Form.Text className="text-muted">
                                                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                                        </Form.Text>
                                                                        <Field
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder={t("weight_placeholder")}
                                                                            name="weight" />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={12}>
                                                                    <div className="settings-btn-sec">
                                                                        <Button
                                                                            type="submit"
                                                                            className="settings-submit-btn"
                                                                            disabled={profileInputData.buttonDisbled}
                                                                        >
                                                                            {profileInputData.loadingButtonContent ?
                                                                                profileInputData.loadingButtonContent :
                                                                                t("submit")
                                                                            }
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
                                </Tab.Pane>
                                <Tab.Pane eventKey="subscription-plans">
                                    <div className="settings-personal-info-sec">
                                        <div className="settings-personal-info-card">
                                            <h3>{t("subscription_heading")}</h3>
                                            <div className="settings-personal-info-header">
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.</p>
                                            </div>
                                            <div className="settings-personal-info-body">
                                                <Form className="edit-profile-form" onSubmit={udateSubscriptionDetails}>
                                                    <div className="settings-subscription-box">
                                                        <div className="settings-subscription-card">
                                                            <div className="settings-subscription-amount-choose">
                                                                {configuration.get("configData.is_only_wallet_payment") == 1 ?
                                                                    <FormLabel>
                                                                        {t("subscription_token")} <span>{t("per_month")}</span>
                                                                    </FormLabel>
                                                                    :
                                                                    <FormLabel>
                                                                        {t("subscription_price")} <span>{t("per_month")}</span>{" "}
                                                                        ({configuration.get("configData.currency_code")})
                                                                    </FormLabel>
                                                                }
                                                                <InputRange
                                                                    maxValue={1000}
                                                                    minValue={0}
                                                                    value={subscription.monthly_amount}
                                                                    onChange={value =>
                                                                        setSubscription({
                                                                            ...subscription,
                                                                            monthly_amount: value
                                                                        })
                                                                    }
                                                                    disabled={
                                                                        localStorage.getItem("is_subscription_enabled") == 1
                                                                            ? false
                                                                            : true
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="settings-subscription-amount-display">
                                                                <div className="amount-display-btn">
                                                                    <input
                                                                        type='number'
                                                                        value={subscription.monthly_amount}
                                                                        onChange={e => setSubscription({
                                                                            ...subscription,
                                                                            monthly_amount: e.target.value,
                                                                        })}
                                                                        disabled={
                                                                            localStorage.getItem("is_subscription_enabled") == 1
                                                                                ? false
                                                                                : true
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="text-danger text-right">{subscriptionError.monthly_amount}</div>
                                                        </div>
                                                        <div className="settings-subscription-card">
                                                            <div className="settings-subscription-amount-choose">
                                                                {configuration.get("configData.is_only_wallet_payment") == 1 ?
                                                                    <FormLabel>
                                                                        {t("subscription_token")} <span>{t("per_year")}</span>
                                                                    </FormLabel>
                                                                    :
                                                                    <FormLabel>
                                                                        {t("subscription_price")} <span>{t("per_year")}</span>{" "}
                                                                        ({configuration.get("configData.currency_code")})
                                                                    </FormLabel>
                                                                }
                                                                <InputRange
                                                                    maxValue={1000}
                                                                    minValue={0}
                                                                    value={subscription.yearly_amount}
                                                                    onChange={value =>
                                                                        setSubscription({
                                                                            ...subscription,
                                                                            yearly_amount: value
                                                                        })
                                                                    }
                                                                    disabled={
                                                                        localStorage.getItem("is_subscription_enabled") == 1
                                                                            ? false
                                                                            : true
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="settings-subscription-amount-display">
                                                                <div className="amount-display-btn">
                                                                    <input
                                                                        type='number'
                                                                        value={subscription.yearly_amount}
                                                                        onChange={e => setSubscription({
                                                                            ...subscription,
                                                                            yearly_amount: e.target.value,
                                                                        })}
                                                                        disabled={
                                                                            localStorage.getItem("is_subscription_enabled") == 1
                                                                                ? false
                                                                                : true
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="text-danger text-right">{subscriptionError.yearly_amount}</div>
                                                        </div>
                                                    </div>
                                                    <div className="help-text-for-add-bank-account">
                                                        {localStorage.getItem("is_subscription_enabled") == 1 ? (
                                                            <p>
                                                                {t("you_can_change_the")}{" "}
                                                                <Link to={`/add-bank`}>
                                                                    {t("you_can_change_the_para1")}
                                                                </Link>{" "}
                                                                {t("you_can_change_the_para2")}.
                                                            </p>
                                                        ) : (
                                                            <p>
                                                                {t("you_can_change_the_para3")}{" "}
                                                                <Link to={`/add-bank`}>
                                                                    {t("you_can_change_the_para4")}
                                                                </Link>{" "}
                                                                {t("you_can_change_the_para5")}.
                                                            </p>
                                                        )}
                                                    </div>
                                                    {configuration.get("configData.is_one_to_one_call_enabled") == 1 &&
                                                        <div className="settings-subscription-video-audio-box">
                                                            <div className="settings-subscription-card">
                                                                <div className="settings-subscription-amount-choose">
                                                                    {configuration.get("configData.is_only_wallet_payment") == 1 ?
                                                                        <FormLabel>
                                                                            <span className="align-center">{t("video_call_token")}
                                                                                <Image
                                                                                    className="settings-subscription-amount-icon"
                                                                                    src={
                                                                                        window.location.origin + "/assets/images/new-settings/subscription-video.png"
                                                                                    }
                                                                                />
                                                                            </span>
                                                                        </FormLabel>
                                                                        :
                                                                        <FormLabel>
                                                                            <span className="align-center">{t("video_call_amount")}{" "}
                                                                                ({configuration.get("configData.currency_code")})
                                                                                <Image
                                                                                    className="settings-subscription-amount-icon"
                                                                                    src={
                                                                                        window.location.origin + "/assets/images/new-settings/subscription-video.png"
                                                                                    }
                                                                                />
                                                                            </span>

                                                                        </FormLabel>
                                                                    }
                                                                    <InputRange
                                                                        maxValue={1000}
                                                                        minValue={0}
                                                                        value={subscription.video_call_amount}
                                                                        onChange={value =>
                                                                            setSubscription({
                                                                                ...subscription,
                                                                                video_call_amount: value
                                                                            })
                                                                        }
                                                                        disabled={
                                                                            localStorage.getItem("is_subscription_enabled") == 1
                                                                                ? false
                                                                                : true
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="settings-subscription-amount-display">
                                                                    <div className="amount-display-btn">
                                                                        <input
                                                                            type='number'
                                                                            value={subscription.video_call_amount}
                                                                            onChange={e => setSubscription({
                                                                                ...subscription,
                                                                                video_call_amount: e.target.value,
                                                                            })}
                                                                            disabled={
                                                                                localStorage.getItem("is_subscription_enabled") == 1
                                                                                    ? false
                                                                                    : true
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="text-danger text-right">{subscriptionError.video_call_amount}</div>
                                                            </div>
                                                            <div className="help-note-for-audio-video-call-subscription">
                                                                <p><span>Note :</span> {t("video_call_amount_note")}</p>
                                                            </div>
                                                            <div className="settings-subscription-card">
                                                                <div className="settings-subscription-amount-choose">
                                                                    {configuration.get("configData.is_only_wallet_payment") == 1 ?
                                                                        <FormLabel>
                                                                            <span className="align-center">{t("audio_call_token")}
                                                                                <Image
                                                                                    className="settings-subscription-amount-icon"
                                                                                    src={
                                                                                        window.location.origin + "/assets/images/new-settings/subscription-audio.png"
                                                                                    }
                                                                                />
                                                                            </span>
                                                                        </FormLabel>
                                                                        :
                                                                        <FormLabel>
                                                                            <span className="align-center">{t("audio_call_amount")}{" "}
                                                                                ({configuration.get("configData.currency_code")})
                                                                                <Image
                                                                                    className="settings-subscription-amount-icon"
                                                                                    src={
                                                                                        window.location.origin + "/assets/images/new-settings/subscription-audio.png"
                                                                                    }
                                                                                />
                                                                            </span>

                                                                        </FormLabel>
                                                                    }
                                                                    <InputRange
                                                                        maxValue={1000}
                                                                        minValue={0}
                                                                        value={subscription.audio_call_amount}
                                                                        onChange={value =>
                                                                            setSubscription({
                                                                                ...subscription,
                                                                                audio_call_amount: value
                                                                            })
                                                                        }
                                                                        disabled={
                                                                            localStorage.getItem("is_subscription_enabled") == 1
                                                                                ? false
                                                                                : true
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="settings-subscription-amount-display">
                                                                    <div className="amount-display-btn">
                                                                        <input
                                                                            type='number'
                                                                            value={subscription.audio_call_amount}
                                                                            onChange={e => setSubscription({
                                                                                ...subscription,
                                                                                audio_call_amount: e.target.value,
                                                                            })}
                                                                            disabled={
                                                                                localStorage.getItem("is_subscription_enabled") == 1
                                                                                    ? false
                                                                                    : true
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="text-danger text-right">{subscriptionError.audio_call_amount}</div>
                                                            </div>
                                                            <div className="help-note-for-audio-video-call-subscription">
                                                                <p><span>Note :</span> {t("audio_call_amount_note")}</p>
                                                            </div>
                                                        </div>
                                                    }
                                                    <Row>
                                                        <Col md={12}>
                                                            <div className="settings-btn-sec">
                                                                <Button
                                                                    type="submit"
                                                                    className="settings-submit-btn"
                                                                    disabled={profileInputData.buttonDisbled}
                                                                >
                                                                    {profileInputData.loadingButtonContent ?
                                                                        profileInputData.loadingButtonContent :
                                                                        t("submit")
                                                                    }
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="social-media-links">
                                    <div className="settings-personal-info-sec">
                                        <div className="settings-personal-info-card">
                                            <div className="settings-personal-info-header">
                                                <h3>{t("social_link_heading")}</h3>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic.</p>
                                            </div>
                                            <div className="settings-personal-info-body">
                                                <Formik
                                                    innerRef={socialRef}
                                                    initialValues={{
                                                        twitter_link: '',
                                                        instagram_link: '',
                                                        youtube_link: '',
                                                        amazon_wishlist: '',
                                                        pinterest_link: '',
                                                        linkedin_link: '',
                                                        snapchat_link: '',
                                                        twitch_link: '',
                                                        website: '',
                                                    }}
                                                    validationSchema={socialInfoSchema}
                                                    onSubmit={values => {
                                                        props.dispatch(updateUserDetailsStart(values))
                                                    }}
                                                >
                                                    {({ values, errors, touched }) => (
                                                        <FORM className="edit-profile-form">
                                                            <Row>
                                                                <Col md={6}>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("twitter_link")} ({t("optional")})</Form.Label>
                                                                        <InputGroup>
                                                                            <Field
                                                                                className="form-control"
                                                                                placeholder={t("twitter_placeholder")}
                                                                                aria-describedby="basic-addon2"
                                                                                name="twitter_link"
                                                                            />
                                                                            <InputGroup.Text id="basic-addon2">
                                                                                <span>
                                                                                    <Image
                                                                                        className="soacial-link-icon"
                                                                                        src={
                                                                                            window.location.origin + "/assets/images/new-settings/social-icons/twitter.png"
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </InputGroup.Text>
                                                                        </InputGroup>
                                                                        <ErrorMessage name="twitter_link" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("youtube_link")} ({t("optional")})</Form.Label>
                                                                        <InputGroup>
                                                                            <Field
                                                                                className="form-control"
                                                                                placeholder={t("youtube_placeholder")}
                                                                                aria-describedby="basic-addon2"
                                                                                name="youtube_link"
                                                                            />
                                                                            <InputGroup.Text id="basic-addon2">
                                                                                <span>
                                                                                    <Image
                                                                                        className="soacial-link-icon"
                                                                                        src={
                                                                                            window.location.origin + "/assets/images/new-settings/social-icons/you-tube.png"
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </InputGroup.Text>
                                                                        </InputGroup>
                                                                        <ErrorMessage name="youtube_link" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("pinterest_link")} ({t("optional")})</Form.Label>
                                                                        <InputGroup>
                                                                            <Field
                                                                                className="form-control"
                                                                                placeholder={t("pinterest_placeholder")}
                                                                                aria-describedby="basic-addon2"
                                                                                name="pinterest_link"
                                                                            />
                                                                            <InputGroup.Text id="basic-addon2">
                                                                                <span>
                                                                                    <Image
                                                                                        className="soacial-link-icon"
                                                                                        src={
                                                                                            window.location.origin + "/assets/images/new-settings/social-icons/pintreset.png"
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </InputGroup.Text>
                                                                        </InputGroup>
                                                                        <ErrorMessage name="pinterest_link" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("snapchat_link")} ({t("optional")})</Form.Label>
                                                                        <InputGroup>
                                                                            <Field
                                                                                className="form-control"
                                                                                placeholder={t("snapchat_placeholder")}
                                                                                aria-describedby="basic-addon2"
                                                                                name="snapchat_link"
                                                                            />
                                                                            <InputGroup.Text id="basic-addon2">
                                                                                <span>
                                                                                    <Image
                                                                                        className="soacial-link-icon"
                                                                                        src={
                                                                                            window.location.origin + "/assets/images/new-settings/social-icons/snap-chat.png"
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </InputGroup.Text>
                                                                        </InputGroup>
                                                                        <ErrorMessage name="snapchat_link" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("website_url")} ({t("optional")})</Form.Label>
                                                                        <InputGroup>
                                                                            <Field
                                                                                className="form-control"
                                                                                placeholder={t("website_placeholder")}
                                                                                aria-describedby="basic-addon2"
                                                                                name="website"
                                                                            />
                                                                            <InputGroup.Text id="basic-addon2">
                                                                                <span>
                                                                                    <Image
                                                                                        className="soacial-link-icon"
                                                                                        src={
                                                                                            window.location.origin + "/assets/images/new-settings/social-icons/globe.png"
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </InputGroup.Text>
                                                                        </InputGroup>
                                                                        <ErrorMessage name="website" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col md={6}>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("instagaram_link")} ({t("optional")})</Form.Label>
                                                                        <InputGroup>
                                                                            <Field
                                                                                className="form-control"
                                                                                placeholder={t("instagram_placeholder")}
                                                                                aria-describedby="basic-addon2"
                                                                                name="instagram_link"
                                                                            />
                                                                            <InputGroup.Text id="basic-addon2">
                                                                                <span>
                                                                                    <Image
                                                                                        className="soacial-link-icon"
                                                                                        src={
                                                                                            window.location.origin + "/assets/images/new-settings/social-icons/instagram.png"
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </InputGroup.Text>
                                                                        </InputGroup>
                                                                        <ErrorMessage name="instagram_link" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("amazon_wishlist")} ({t("optional")})</Form.Label>
                                                                        <InputGroup>
                                                                            <Field
                                                                                className="form-control"
                                                                                placeholder={t("amazon_placeholder")}
                                                                                aria-describedby="basic-addon2"
                                                                                name="amazon_wishlist"
                                                                            />
                                                                            <InputGroup.Text id="basic-addon2">
                                                                                <span>
                                                                                    <Image
                                                                                        className="soacial-link-icon"
                                                                                        src={
                                                                                            window.location.origin + "/assets/images/new-settings/social-icons/amazon.png"
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </InputGroup.Text>
                                                                        </InputGroup>
                                                                        <ErrorMessage name="amazon_wishlist" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("linkedin_link")} ({t("optional")})</Form.Label>
                                                                        <InputGroup>
                                                                            <Field
                                                                                className="form-control"
                                                                                placeholder={t("linkedin_placeholder")}
                                                                                aria-describedby="basic-addon2"
                                                                                name="linkedin_link"
                                                                            />
                                                                            <InputGroup.Text id="basic-addon2">
                                                                                <span>
                                                                                    <Image
                                                                                        className="soacial-link-icon"
                                                                                        src={
                                                                                            window.location.origin + "/assets/images/new-settings/social-icons/linked-in.png"
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </InputGroup.Text>
                                                                        </InputGroup>
                                                                        <ErrorMessage name="linkedin_link" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                    <Form.Group controlId="formBasicEmail">
                                                                        <Form.Label>{t("twitch_link")} ({t("optional")})</Form.Label>
                                                                        <InputGroup>
                                                                            <Field
                                                                                className="form-control"
                                                                                placeholder={t("twitch_placeholder")}
                                                                                aria-describedby="basic-addon2"
                                                                                name="twitch_link"
                                                                            />
                                                                            <InputGroup.Text id="basic-addon2">
                                                                                <span>
                                                                                    <Image
                                                                                        className="soacial-link-icon"
                                                                                        src={
                                                                                            window.location.origin + "/assets/images/new-settings/social-icons/twitch.png"
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </InputGroup.Text>
                                                                        </InputGroup>
                                                                        <ErrorMessage name="twitch_link" component="div" className="text-danger text-right" />
                                                                    </Form.Group>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md={12}>
                                                                    <div className="settings-btn-sec">
                                                                        <Button
                                                                            type="submit"
                                                                            className="settings-submit-btn"
                                                                            disabled={profileInputData.buttonDisbled}
                                                                        >
                                                                            {profileInputData.loadingButtonContent ?
                                                                                profileInputData.loadingButtonContent :
                                                                                t("submit")
                                                                            }
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
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div >
        </>
    );
};

const mapStateToPros = (state) => ({
    profile: state.users.profile,
    profileInputData: state.users.profileInputData,
});

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

const connector = connect(mapStateToPros, mapDispatchToProps)(translate(EditProfileIndex));

export default GoogleApiWrapper({
    apiKey: apiConstants.google_api_key
})(connector);
