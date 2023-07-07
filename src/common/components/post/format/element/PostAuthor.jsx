import React from "react";
import Link from "next/link";
import Image from "next/image";

const PostAuthor = ({ user, socialLinks }) => {


  return (
    <div className="about-author">
      <div className="media">
        <div className="thumbnail">
          <Link href="#">
            <a>
              <Image
                src={user.img}
                alt={user.name}
                height={105}
                width={105}
              />
            </a>
          </Link>
        </div>
        <div className="media-body">
          <div className="author-info">
            <h5 className="title">
              <Link href="#">
                <a className="hover-flip-item-wrapper">
                  <span className="hover-flip-item">
                    <span data-text={user.name}>{user.name}</span>
                  </span>
                </a>
              </Link>
            </h5>
            <span className="b3 subtitle">{user.designation}</span>
          </div>
          <div className="content">
            <p className="b1 description">{user.bio}</p>
            <ul className="social-share-transparent size-md">
              {socialLinks.map((social) => (
                <li key={social.url}>
                  <a href={social.url}>
                    <i className={social.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAuthor;
