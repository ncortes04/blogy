import React from "react";
import Link from "next/link";
import Image from "next/image";

const PostSectionNine = ({ postData, bgColor }) => {
  if (!postData || postData.length === 0) {
    return null; // or render a fallback component or message
  }

  const firstPost = postData[0];

  return (
    <div className={`axil-tech-post-banner ${bgColor || "bg-color-grey"}`}>
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-md-12 col-12 mt--30">
            <div className="content-block post-grid post-grid-transparent">
              {firstPost && (
                <div className="post-thumbnail">
                  <Link href={`/viewpost?id=${firstPost.id}`}>
                    <a>
                      <Image
                        src={firstPost.bannerImg}
                        alt={firstPost.name}
                        height={600}
                        width={600}
                        priority={true}
                      />
                    </a>
                  </Link>
                </div>
              )}
              <div className="post-grid-content">
                <div className="post-content first-img">
                  <div className="post-cat">
                    <div className="post-cat-list">
                      {firstPost && (
                        <Link href={`/viewpost?fil=${firstPost.category}`}>
                          <a className="hover-flip-item-wrapper">
                            <span className="hover-flip-item">
                              <span data-text={firstPost.category}>
                                {firstPost.category}
                              </span>
                            </span>
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                  {firstPost && (
                    <h3 className="title">
                      <Link href={`/post/${firstPost.slug}`}>
                        <a>{firstPost.name}</a>
                      </Link>
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 col-md-6 col-12">
            <div className="row">
              {postData.slice(1, 5).map((data) => (
                <div
                  className="col-lg-6 col-md-6 col-sm-6 col-12 mt--30"
                  key={data.slug}
                >
                  <div className="content-block post-default image-rounded">
                    {data && (
                      <div className="post-thumbnail">
                        <Link href={`/viewpost?id=${data.id}`}>
                          <a>
                            <Image
                              src={data.featureImg}
                              alt={data.name}
                              height={190}
                              width={285}
                              priority={true}
                            />
                          </a>
                        </Link>
                      </div>
                    )}
                    <div className="post-content">
                      <div className="post-cat">
                        <div className="post-cat-list">
                          {data && (
                            <Link href={`/category?fil=${data.category}`}>
                              <a className="hover-flip-item-wrapper">
                                <span className="hover-flip-item">
                                  <span data-text={data.category}>
                                    {data.category}
                                  </span>
                                </span>
                              </a>
                            </Link>
                          )}
                        </div>
                      </div>
                      {data && (
                        <h5 className="title">
                          <Link href={`/post?id=${data.id}`}>
                            <a>{data.name}</a>
                          </Link>
                        </h5>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionNine;
