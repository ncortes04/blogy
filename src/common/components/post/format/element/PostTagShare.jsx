import React from "react";
import Link from "next/link";
import { slugify } from "../../../../utils";

const PostTagShare = ({ postCat, socialLinks }) => {
  return (
    <>
      <div className="tagcloud">
        <Link href={`/category?fil=${postCat}}`} key={postCat}>
            <a>{postCat}</a>
        </Link>
      </div>
      <div className="social-share-block">
        <div className="post-like">
          <link href="#" />
          <a>
            <i className="fal fa-thumbs-up" />
            <span>2.2k Like</span>
          </a>
        </div>
        <ul className="social-icon icon-rounded-transparent md-size">
          {socialLinks.map((social) => {
            return (
              <li key={social.url}>
                <a href={social.url}>
                  <i className={social.icon} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default PostTagShare;
