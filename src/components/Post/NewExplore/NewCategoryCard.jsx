import React, { useState, useEffect } from "react";
import { Modal, Container, Row, Col, Button, Form, Image, Media, Nav, Tab, InputGroup, FormControl } from "react-bootstrap";
import "./NewExplore.css";
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import { fetchCategoryListingStart } from "../../../store/actions/UserCategoryAction";
import InfiniteScroll from "react-infinite-scroll-component";

const NewCategoryCard = (props) => {

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    let data = {
      skip: 0,
      take: take,
    }
    if (selectedCategory) {
      data = {
        ...data,
        category_id: selectedCategory,
      }
    }
    props.dispatch(fetchCategoryListingStart(data));
    setSkip(skip + take);
  }, [selectedCategory]);

  const fetchMoreCategoryExplore = () => {
    let data = {
      skip: skip,
      take: take,
      append: true,
    }
    if (selectedCategory) {
      data = {
        ...data,
        category_id: selectedCategory,
      }
    }
    props.dispatch(fetchCategoryListingStart(data));
    setSkip(skip + take);
  }

  const options = {
    margin: 10,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 2,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 5,

      }
    },
  };

  return (
    <>
      <div className="new-category-sec">
        <div className="new-category-box">
          {!props.categoryList.loading && props.categoryList.data.length > 0 &&
            <OwlCarousel className='owl-theme new-category-slider' nav {...options}>
              {props.categoryList.data.map((category, i) =>
                <div
                  className={`new-category-card ${selectedCategory === category.category_id ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCategory(category.category_id);
                  }}>
                  <div className="new-category-img-sec">
                    <Image
                      className="new-category-img"
                      src={category.picture}
                    />
                  </div>
                  <div className="new-category-info">
                    <h4>{category.name}</h4>
                  </div>
                </div>
              )}

            </OwlCarousel>
          }
        </div>
        <div className="new-category-list-card-sec">
          {!props.categoryListing.loading && props.categoryListing.data.categories &&

            <InfiniteScroll
              dataLength={props.categoryListing.data.categories.length}
              next={fetchMoreCategoryExplore}
              hasMore={skip < props.categoryListing.data.total}
              loader={<h4>Loading...</h4>}
              style={{ height: "auto", overflow: "hidden" }}
            >
              <div className="new-category-list-box">
                {props.categoryListing.data.categories.map((content, i) =>
                  <>
                    {content.type ?
                      <Link to={`/post/${content.post_unique_id}`}>
                        <div className="new-category-list-card">
                          <div className="new-category-list-img-sec">
                            {content.postFiles.file_type === "image" ?
                              <Image
                                className="new-category-img"
                                src={content.postFiles.post_file}
                              />
                              :
                              <Image
                                className="new-category-img"
                                src={content.postFiles.preview_file ?
                                  content.postFiles.preview_file :
                                  window.location.origin +
                                  "/assets/images/no_image.jpg"}
                              />
                            }
                          </div>
                          <div className="new-category-icon-sec">
                            {content.postFiles.file_type === "video" &&
                              <Image className="new-category-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-explore/video-icon.png"
                                }
                              />
                            }
                            {content.postFiles.file_type === "audio" &&
                              <Image className="new-category-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-explore/audio-icon.png"
                                }
                              />
                            }
                          </div>
                        </div>
                      </Link>
                      : <Link to="#">
                        <div className="new-category-list-user-box">
                          <div className="new-category-list-user-card">
                            <Link to={`/${content["0"].user_unique_id}`}>
                              <div className="new-category-list-user-cover-bg">
                                <Image
                                  className="new-category-list-user-cover-img first-user"
                                  src={content["0"].cover}
                                />
                                <div className="new-category-list-user-info">
                                  <div className="new-category-list-user-profile-sec">
                                    <Image
                                      className="new-category-list-user-profile-img"
                                      src={content["0"].picture !== "null" ? content["0"].picture :
                                        window.location.origin +
                                        "/assets/images/placeholder.jpeg"}
                                    />
                                    <h4>{content["0"].name}
                                      <span>
                                        <Image
                                          className="new-settings-verified-icon"
                                          src={
                                            window.location.origin + "/assets/images/new-home/verified-icon.png"
                                          }
                                        />
                                      </span>
                                    </h4>
                                  </div>
                                  {/* <div className="new-category-list-follow-btn-sec">
                                <Button className="new-follow-btn">
                                  <i className="fas fa-plus"></i> Follow
                                </Button>
                              </div> */}
                                </div>
                              </div>
                            </Link>
                            <Link to={`/${content["1"].user_unique_id}`}>
                              <div className="new-category-list-user-cover-bg-1">
                                <Image
                                  className="new-category-list-user-cover-img second-user"
                                  src={content["1"].cover}
                                />
                                <div className="new-category-list-user-info">
                                  <div className="new-category-list-user-profile-sec">
                                    <Image
                                      className="new-category-list-user-profile-img"
                                      src={content["1"].picture !== "null" ? content["1"].picture :
                                        window.location.origin +
                                        "/assets/images/placeholder.jpeg"}
                                    />
                                    <h4>{content["1"].name}
                                      <span>
                                        <Image
                                          className="new-settings-verified-icon"
                                          src={
                                            window.location.origin + "/assets/images/new-home/verified-icon.png"
                                          }
                                        />
                                      </span>
                                    </h4>
                                  </div>
                                  {/* <div className="new-category-list-follow-btn-sec">
                                <Button className="new-follow-btn">
                                  <i className="fas fa-plus"></i> Follow
                                </Button>
                              </div> */}
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Link>
                    }
                  </>
                )}

              </div>
            </InfiniteScroll>
          }
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  categoryList: state.userCategory.categoryList,
  categoryListing: state.userCategory.categoryListing,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(NewCategoryCard));
