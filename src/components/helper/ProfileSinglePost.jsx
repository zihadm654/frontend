import React, { useState } from 'react';
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { searchUserPostStart } from '../../store/actions/OtherUserAction';
import { translate, t } from "react-multi-lang";
import NoDataFound from '../NoDataFound/NoDataFound';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import InfiniteScroll from "react-infinite-scroll-component";

const ProfileSinglePost = ({ post }) => {

    const [postFile, setPostFile] = useState(post.postFiles[0]);

    return (
        <>
            {postFile.file_type === "image" ? (
                //Image File
                post.payment_info.is_user_needs_pay == 1 ? (
                    //Locked Image
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-lock-post-card">
                            <div className="profile-lock-img-sec">
                                {/* <Image
                                                            className="profile-lock-img"
                                                            src={postFile.post_file}
                                                        /> */}
                                <LazyLoadImage
                                    className="profile-lock-img"
                                    src={postFile.post_file}
                                    effect="blur" />
                                <div className="profile-lock-icon-sec">
                                    <Image
                                        className="profile-lock-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-home/icon/lock-icon.png"
                                        }
                                    />
                                </div>
                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                ) : (
                    //Free Image
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-image-post-card">
                            <div className="profile-image-img-sec">
                                {/* <Image
                                                            className="profile-image-img"
                                                            src={postFile.post_file}
                                                        /> */}
                                <LazyLoadImage
                                    className="profile-image-img"
                                    src={postFile.post_file}
                                    effect="blur" />
                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                )
            ) : postFile.file_type === "video" ? (
                // Video Section
                post.payment_info.is_user_needs_pay == 1 ? (
                    //Locked Video
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-lock-post-card">
                            <div className="profile-lock-img-sec">
                                <LazyLoadImage
                                    className="profile-lock-img"
                                    src={postFile.preview_file
                                        ? postFile.preview_file
                                        : postFile.post_file}
                                    effect="blur"
                                />
                                <div className="profile-lock-icon-sec">
                                    <Image
                                        className="profile-lock-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-home/icon/lock-icon.png"
                                        }
                                    />
                                </div>
                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                ) : (
                    //Free Video
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-video-post-card">
                            <div className="profile-video-img-sec">
                                <LazyLoadImage
                                    className="profile-video-img"
                                    src={postFile.preview_file
                                        ? postFile.preview_file
                                        : postFile.post_file}
                                    effect="blur"
                                />
                                <div className="profile-video-icon-sec">
                                    <Image
                                        className="profile-video-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-home/icon/video-icon.png"
                                        }
                                    />
                                </div>
                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                )
            ) : postFile.file_type === "audio" ? (
                // Audio
                post.payment_info.is_user_needs_pay == 1 ? (
                    //Locked Audio
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-lock-post-card">
                            <div className="profile-lock-img-sec">
                                <LazyLoadImage
                                    className="profile-lock-img"
                                    src={postFile.preview_file
                                        ? postFile.preview_file
                                        : postFile.post_file}
                                    effect="blur"
                                />
                                <div className="profile-lock-icon-sec">
                                    <Image
                                        className="profile-lock-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-home/icon/lock-icon.png"
                                        }
                                    />
                                </div>
                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                ) : (
                    //Free Audio
                    <Link to={`/post/${post.post_unique_id}`}>
                        <div className="profile-audio-post-card">
                            <div className="profile-audio-img-sec">
                                <LazyLoadImage
                                    className="profile-audio-img"
                                    src={postFile.preview_file
                                        ? postFile.preview_file
                                        : postFile.post_file}
                                    effect="blur"
                                />
                                <div className="profile-audio-icon-sec">
                                    <Image
                                        className="profile-audio-icon"
                                        src={
                                            window.location.origin + "/assets/images/new-home/icon/audio-icon.png"
                                        }
                                    />
                                </div>
                                {post.postFiles.length > 1 &&
                                    <div className="multiple-icon-sec">
                                        <Image
                                            src={
                                                window.location.origin +
                                                "/assets/images/new-explore/multiple-img-post.png"
                                            }
                                            alt=""
                                            className="explore-icon-top-right"
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    </Link>
                )
            ) : ("")
            }
        </>
    );
}

const mapStateToPros = (state) => ({});

function mapDispatchToProps(dispatch) {
    return { dispatch };
}

export default connect(mapStateToPros, mapDispatchToProps)(ProfileSinglePost);

