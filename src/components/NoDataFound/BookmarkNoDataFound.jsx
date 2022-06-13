import React from "react";
import { Row, Col} from "react-bootstrap";
import { translate, t } from "react-multi-lang";

const BookmarkNoDataFound = () => {
  return (
    <>
      <div className="bookmark-no-data-found-sec">
        <Row>
          <Col sm="12" md="12">
            <span> <i className="material-icons icon-bookmark">bookmark_border</i></span>
            <p className="desc">{t("no_bookmarks_yet")}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default translate(BookmarkNoDataFound);
