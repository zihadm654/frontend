import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Container, Row, Col, Image} from "react-bootstrap";
import BookmarkNav from "./BookmarkNav";
import { connect } from "react-redux";
import { fetchBookmarksAudioStart } from "../../store/actions/BookmarkAction";
import PostDisplayCard from "../helper/PostDisplayCard";
import BookmarkNoDataFound from "../NoDataFound/BookmarkNoDataFound";
import BookmarkLoader from "../Loader/BookmarkLoader";
import useInfiniteScroll from "../helper/useInfiniteScroll";
import { translate, t } from "react-multi-lang";

const BookmarkAudio = (props) => {
  useEffect(() => {
    props.dispatch(
      fetchBookmarksAudioStart({
        type: "audio",
        skip: props.bookmarkAudio.skip,
      })
    );
  }, []);

  const [isFetching, setIsFetching] = useInfiniteScroll(fetchBookMarkAudioData);

  const [noMoreData, setNoMoreData] = useState(false);

  function fetchBookMarkAudioData() {
    setTimeout(() => {
      if (props.bookmarkAudio.length !== 0) {
        props.dispatch(
          fetchBookmarksAudioStart({
            type: "audio",
            skip: props.bookmarkAudio.skip,
          })
        );
        setIsFetching(false);
      } else {
        setNoMoreData(true);
      }
    }, 3000);
  }

  return (
    <div className="edit-profile book-photo">
      <Container>
        <Row>
          <BookmarkNav />
          <Col sm={12} xs={12} md={8}>
            <div className="profile-post-area">
              <div className="bookmarkes-list bookmarks-right-side">
                <div className="pull-left">
                  <h3>{t("audios")}</h3>
                </div>
              </div>
            </div>
            {props.bookmarkAudio.loading ? (
              <BookmarkLoader />
            ) : props.bookmarkAudio.data.posts.length > 0 ? (
              props.bookmarkAudio.data.posts.map((post) => (
                <PostDisplayCard post={post} key={post.post_id} />
              ))
            ) : (
              <BookmarkNoDataFound />
            )}
          </Col>
        </Row>
        {noMoreData !== true ? (
          <>{isFetching && "Fetching more list items..."}</>
        ) : (
          "No More Data"
        )}
      </Container>
    </div>
  );
};

const mapStateToPros = (state) => ({
  bookmarkAudio: state.bookmark.bookmarkAudio,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(BookmarkAudio));
