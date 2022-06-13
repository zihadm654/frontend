import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../NoDataFound/NoDataFound";
import "../Ecom/Ecom.css";
import SingleDisplayCard from "../Ecom/Product/SingleDisplayCard";

const ModelProfileStoreSec = (props) => {

  return (
    <div
      role="tabpanel"
      className={
        props.activeSec === "store"
          ? "tab-pane fade in active"
          : "tab-pane fade"
      }
      id="Section4"
    >
      <div className="ecom-featured-box ecom-features-box-1">
      {props.products && props.products.loading ? (
        t('loading')
      ) : props.products.data.user_products && props.products.data.user_products.length > 0 ? (
        props.products.data.user_products.map((product) =>
        <SingleDisplayCard product={product} type="userProfile" otherUserUniquId={props.otherUserUniquId}></SingleDisplayCard>
        )
      ) : (
        <NoDataFound />
      )}
      {props.noMoreData !== true ? (
        <>{props.isFetching && "Fetching more list items..."}</>
      ) : (
        t("no_more_data")
      )}
      </div>
    </div>
  );
};

const mapStateToPros = (state) => ({
  comments: state.comment.comments,
  chat: state.chat,
  userDetails: state.otherUser.userDetails,
  userPosts: state.otherUser.userPosts,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(translate(ModelProfileStoreSec));
