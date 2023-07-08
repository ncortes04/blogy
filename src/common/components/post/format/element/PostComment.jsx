import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PostComment = ({ comments }) => {


  return (
    <div className="axil-comment-area">

      <div className="axil-comment-area">
        <ul className="comment-list">
          {comments.length === 0 ? (
            <li>No comments.</li>
          ) : (
            comments.map((comment) => (
              <li className="comment" key={comment.id}>
                <div className="comment-body">
                  <div className="single-comment">
                    <div className="comment-img">
                      <Image
                        src={comment.user.img}
                        alt={comment.user.name}
                        height={60}
                        width={60}
                      />
                    </div>
                    <div className="comment-inner">
                      <h6 className="commenter">
                        <Link href={`/author?id=${comment.user.id}`}>
                          <a className="hover-flip-item-wrapper">
                            <span className="hover-flip-item">
                              <span data-text={comment.user.name}>
                                {comment.user.name}
                              </span>
                            </span>
                          </a>
                        </Link>
                      </h6>
                      <div className="comment-meta">
                        <div className="time-spent">{comment.created_at}</div>
                        <div className="reply-edit">
                          <div className="reply">
                            <a
                              className="comment-reply-link hover-flip-item-wrapper"
                              href="#"
                            >
                              <span className="hover-flip-item">
                                <span data-text="Reply">Reply</span>
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="comment-text">
                        <p className="b2">{comment.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      {/* End Comment Area */}
    </div>
  );
};

export default PostComment;
