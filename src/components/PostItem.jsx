import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import "../index.css";
import {
  AiOutlineRead,
  AiOutlineStar,
  AiOutlineCheck,
  AiOutlineFileImage,
} from "react-icons/ai";

export const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className="main">
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <Link to={`/${post._id}`} className="link-item">
      <div className="post-item">
        <div className="post-header">
          <h3 className="post-title">
            <AiOutlineStar size={25} style={{ marginRight: "15px" }} />
            {post.model}
          </h3>
          <Moment
            date={post.createdAt}
            format="D MMM YYYY"
            className="post-data"
          />
        </div>
        <ul className="post-block">
          <li className="post-url">
            <AiOutlineCheck
              className={"url-img"}
              size={25}
              style={{ marginLeft: "5px", marginRight: "15px" }}
            />
            {post.urlOff}
          </li>
          <li className="post-url">
            <AiOutlineRead
              className={"url-img"}
              size={25}
              style={{ marginLeft: "5px", marginRight: "15px" }}
            />
            {post.urlBook}
          </li>
          <li className="post-url">
            <AiOutlineFileImage
              className={"url-img"}
              size={25}
              style={{ marginLeft: "5px", marginRight: "15px" }}
            />
            {post.imgUrl}
          </li>
          <li className="post-text">{post.info}</li>
        </ul>
      </div>
    </Link>
  );
};
