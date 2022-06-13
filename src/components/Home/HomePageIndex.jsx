import React, { useState, useEffect } from "react";
import HomePageSuggesstion from "./HomePageSuggesstion";
import { Container, Col, Row } from "react-bootstrap";
import {
  fetchHomePostsStart,
} from "../../store/actions/HomeAction";
import { connect } from "react-redux";
import {
  fetchCommentsStart,
  saveCommentStart,
} from "../../store/actions/CommentsAction";
import { saveBookmarkStart } from "../../store/actions/BookmarkAction";
import PostDisplayCard from "../helper/PostDisplayCard";
import NoDataFound from "../NoDataFound/NoDataFound";
import useInfiniteScroll from "../helper/useInfiniteScroll";
import HomeLoader from "../Loader/HomeLoader";
import HomeCategoryList from "../Categories/HomeCategoryList";
import VerifiedBadgeNoShadow from "../Handlers/VerifiedBadgeNoShadow";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import AdSense from "react-adsense";
import HomePageTrendingUsers from "./HomePageTrendingUsers";
import StorySlider from "./StorySlider";

const HomePageIndex = (props) => {
  useEffect(() => {
    props.dispatch(fetchHomePostsStart());
  }, []);

  const fetchHomeData = () => {
    setTimeout(() => {
      if (props.posts.length !== 0) {
        props.dispatch(fetchHomePostsStart());
        setIsFetching(false);
      } else {
        setNoMoreData(true);
      }
    }, 3000);
  };

  // useEffect(() => {
  //   const installGoogleAds = () => {
  //     const elem = document.createElement("script");
  //     elem.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  //     elem.async = true;
  //     elem.defer = true;
  //     document.body.insertBefore(elem, document.body.firstChild);
  //   };
  //   installGoogleAds();
  // }, []);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchHomeData);

  const [noMoreData, setNoMoreData] = useState(false);

  const [sendTip, setSendTip] = useState(false);

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const [commentInputData, setCommentInputData] = useState({});

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    props.dispatch(saveCommentStart(commentInputData));
  };

  const [isVisible, setIsVisible] = React.useState(true);

  const showCommentSection = (event, post_id) => {
    setCommentInputData({ post_id: post_id });
    setIsVisible(true);
    props.dispatch(fetchCommentsStart({ post_id: post_id }));
  };

  const handleLike = (event) => {
    event.preventDefault();
  };

  const handleBookmark = (event, post) => {
    event.preventDefault();
    props.dispatch(saveBookmarkStart({ post_id: post.post_id }));
  };

  const closeCommentSection = (event) => {
    setIsVisible(false);
  };

  return (
    <>
      <div className="home-screen home-sec">

        <Container>
          {/* Story Start */}
          <StorySlider />
          {/* Story end */}

          {/* categories list start */}
          <HomeCategoryList />
          <hr></hr>
          {/* categories list start */}

          <div className="padding-top-xl">
            <Row className="resp-col-reverse">
              <Col xl={8} md={12} className="custom-padding">
                {/* <Container>
                <Row>
                  <div id="stories" className="storiesWrapper"></div>
                </Row>
              </Container> */}
                {props.posts.loading ? (
                  <HomeLoader />
                ) : props.posts.data.posts.length > 0 ? (
                  props.posts.data.posts.map((post, index) => (
                    <PostDisplayCard post={post} key={index} index={index} />
                  ))
                ) : (
                  <NoDataFound />
                )}
                {props.posts.loading ? (
                  ''
                ) : props.posts.data.posts.length > 0 ? (
                  noMoreData !== true ? (
                    <>{isFetching && "Fetching more list items..."}</>
                  ) : (
                    t("no_more_data")
                  )
                ) : ''}
              </Col>

              <Col xl={4} md={12} className="resp-mrg-btn-xs">
                <HomePageSuggesstion />

                <HomePageTrendingUsers />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {configuration.get("configData.is_ads_enabled") ? (
        <AdSense.Google
          client={configuration.get("configData.footer_ad")}
          slot="1686195266"
          style={{ display: "block" }}
          format="auto"
          responsive="true"
        />
      ) : (
        ""
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  posts: state.home.homePost,
  searchUser: state.home.searchUser,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(HomePageIndex));
