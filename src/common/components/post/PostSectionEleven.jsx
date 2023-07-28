import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { SectionTitleOne } from "../../elements/sectionTitle/SectionTitle";
import PostLayoutTwo from "./layout/PostLayoutTwo";
import WidgetCategory from "../sidebar/WidgetCategory";
import WidgetVideoPost from "../sidebar/WidgetVideoPost";
import AddBanner from "../ad-banner/AddBanner";

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

const defaultActiveCat = filters[0].cate;

const PostSectionEleven = ({ postData }) => {
  const [activeNav, setActiveNav] = useState(defaultActiveCat);
  const [tabPostData, setTabPostData] = useState(postData);

  const handleChange = (e) => {
    let filterText = e.target.textContent;
    setActiveNav(filterText);

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

  return (
    <div className="axil-post-grid-area axil-section-gapTop bg-color-grey">
      <div className="container">
        <SectionTitleOne title="Reviews" />
        <div className="row">
          <div className="col-lg-12">
            <Tab.Container id="axilTab" defaultActiveKey={true}>
              <Nav className="axil-tab-button nav nav-tabs mt--20">
                {filters.map((data) => (
                  <div className="nav-item">
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

              <Tab.Content>
                <Tab.Pane eventKey={true}>
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="row">
                        {tabPostData.slice(0, 2).map((data) => (
                          <div className="col-lg-6" key={data.id}>
                            <div className="featured-post mt--30">
                              <div className="content-block">
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
                                <div className="post-thumbnail">
                                  <Link href={`/viewpost?id=${data.id}`}>
                                    <a>
                                      <Image
                                        src={data.bannerImg}
                                        alt={data.title}
                                        height={338}
                                        width={600}
                                        priority={true}
                                      />
                                      <div className="review-count">
                                        <span>8.1</span>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-lg-8 col-xl-8 mt--30">
                      {tabPostData.length > 0 ? (
                        <PostLayoutTwo
                          dataPost={tabPostData}
                          postStart="2"
                          show="6"
                          bgColor="with-bg-solid"
                        />
                      ) : (
                        <p>No posts found.</p>
                      )}
                    </div>
                    <div className="col-lg-4 col-xl-4 mt--30 mt_md--40 mt_sm--40">
                      <div className="sidebar-inner">
                        <WidgetCategory catData={postData} />
                        <WidgetVideoPost postData={postData} />
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

export default PostSectionEleven;
