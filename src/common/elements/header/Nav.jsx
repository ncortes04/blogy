import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../utils";

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

const Nav = ({ posts }) => {
  const [tabPostData, setTabPostData] = useState(posts);

  const handleChange = (e) => {
    let filterText = e.target.textContent;

    let tempData = [];

    for (let i = 0; i < posts.length; i++) {
      const element = posts[i];
      let categories = element.category;

      if (categories.includes(filterText)) {
        tempData.push(element);
      }
    }

    setTabPostData(tempData);
  };

  return (
    <ul className="mainmenu">
      <li className="menu-item-has-children">
        <a href="/">Home</a>
      </li>

      <li className="menu-item-has-children megamenu-wrapper">
        <Link href="#">
          <a>Mega Menu</a>
        </Link>
        <ul className="megamenu-sub-menu">
          <li className="megamenu-item">
            {/* Start Verticle Nav  */}
            <div className="axil-vertical-nav">
              <ul className="vertical-nav-menu">
                {filters.map((data) => (
                  <li className={`vertical-nav-item `} key={data.id}>
                    <a
                      className="hover-flip-item-wrapper"
                      href="#"
                      onMouseOver={handleChange}
                    >
                      <span className="hover-flip-item">
                        <span data-text={data.cate}>{data.cate}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Start Verticle Nav  */}
            {/* Start Verticle Menu  */}
            <div className="axil-vertical-nav-content">
              {/* Start One Item  */}
              <div className="axil-vertical-inner tab-content">
                <div className="axil-vertical-single">
                  <div className="row">
                    {tabPostData.slice(0, 4).map((data) => (
                      <div className="col-lg-3" key={data.id}>
                        <div className="content-block image-rounded">
                          <div className="post-thumbnail mb--20">
                            <Link href={`/viewpost?id=${data.id}`}>
                              <a>
                                <Image
                                  src={data.featureImg}
                                  alt={data.title}
                                  height={130}
                                  width={200}
                                  priority={true}
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="post-content">
                            <div className="post-cat">
                              <div className="post-cat-list">
                                <Link href={`/category?fil=${data.category}`}>
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
                            <h5 className="title">
                              <Link href={`/viewpost?id=${data.id}`}>
                                <a>{data.name}</a>
                              </Link>
                            </h5>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* End One Item  */}
            </div>
            {/* End Verticle Menu  */}
          </li>
        </ul>
      </li>
      <li className="menu-item-has-children">
        <Link href="/post-list">
          <a>Post List</a>
        </Link>
      </li>
      <li className="menu-item-has-children">
        <Link href="/contact">
          <a>Contact</a>
        </Link>
      </li>
      <li className="menu-item-has-children">
        <Link href="/about">
          <a>About</a>
        </Link>
      </li>
    </ul>
  );
};

export default Nav;
