import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";

const filters = [
  {
    id: 1,
    cate: "Design",
  },
  {
    id: 2,
    cate: "Travel",
  },
  {
    id: 3,
    cate: "SEO",
  },
  {
    id: 4,
    cate: "Research",
  },
];

const PostSectionTen = ({ postData }) => {
  const [tabPostData, setTabPostData] = useState(postData);

  const handleChange = (e) => {
    let filterText = e.target.textContent;

    let tempData = [];

    for (let i = 0; i < postData.length; i++) {
      const element = postData[i];
      let categories = element.category;

      if (categories.includes(filterText)) {
        tempData.push(element);
      }
    }

    setTabPostData(tempData);
  };

  const firstPost = postData[0];

  return (
    <div className="axil-post-grid-area axil-section-gap bg-color-white">
      <div className="container">
        <SectionTitleOne title="Top Stories" />
        <div className="row">
          <div className="col-lg-12">
            <Tab.Container id="axilTab" defaultActiveKey={true}>
              <Nav className="axil-tab-button nav nav-tabs mt--20">
                {filters.map((data) => (
                  <div className="nav-item" key={data.id}>
                    <button
                      className="filter-button"
                      onClick={handleChange}
                      eventKey={data.cate}
                    >
                      {data.cate}
                    </button>
                  </div>
                ))}
              </Nav>
              <Tab.Content className="grid-tab-content mt--10">
                <Tab.Pane className="single-post-grid" eventKey={true}>
                  <div className="row mt--40">
                    <div className="col-xl-5 col-lg-6 col-md-12 col-12">
                      {tabPostData.length ? (
                        <div>
                          {tabPostData.slice(0, 4).map((data) => (
                            <div
                              className="content-block post-medium post-medium-border border-thin"
                              key={data.id}
                            >
                              <div className="post-thumbnail">
                                <Link href={`/viewpost?id=${data.id}`}>
                                  <a>
                                    <Image
                                      src={data.iconImg}
                                      alt={data.title}
                                      height={100}
                                      width={100}
                                      priority={true}
                                    />
                                  </a>
                                </Link>
                              </div>
                              <div className="post-content">
                                <div className="post-cat">
                                  <div className="post-cat-list">
                                    <Link href={`/category/${data.category}`}>
                                      <a className="hover-flip-item-wrapper">
                                        <span className="hover-flip-item">
                                          <span data-text={data.category}>
                                            {data.category}
                                          </span>
                                        </span>
                                      </a>
                                    </Link>
                                  </div>
                                </div>
                                <h4 className="title">
                                  <Link href={`/viewpost?id=${data.id}`}>
                                    <a>{data.name}</a>
                                  </Link>
                                </h4>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <h2>No Posts</h2>
                      )}
                    </div>
                    <div className="col-xl-7 col-lg-6 col-md-12 col-12 mt_md--40 mt_sm--40">
                      <div className="content-block content-block post-grid post-grid-transparent">
                        {firstPost ? (
                          <div className="post-thumbnail">
                            <Link href={`/viewpost?id=${firstPost.id}`}>
                              <a>
                                <Image
                                  src={firstPost.bannerImg}
                                  alt={firstPost.name}
                                  height={660}
                                  width={705}
                                  priority={true}
                                />
                              </a>
                            </Link>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="post-grid-content">
                          <div className="post-content">
                            <div className="post-cat">
                              <div className="post-cat-list">
                                {firstPost && (
                                  <Link
                                    href={`/category?fil=${firstPost.category}`}
                                  >
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
                                <Link href={`/viewpost?id=${firstPost.id}`}>
                                  <a>{firstPost.name}</a>
                                </Link>
                              </h3>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionTen;
