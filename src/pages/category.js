import InstagramOne from "../common/components/instagram/InstagramOne";
import { useState, useEffect } from "react";
import PostLayoutTwo from "../common/components/post/layout/PostLayoutTwo";
import BreadcrumbOne from "../common/elements/breadcrumb/breadcrumbOne";
import FooterOne from "../common/elements/footer/FooterOne";
import HeadTitle from "../common/elements/head/HeadTitle";
import HeaderOne from "../common/elements/header/HeaderOne";
import SidebarOne from "../common/components/sidebar/SidebarOne";

const PostCategory = ({ popularPosts, postData, allPosts, filter }) => {
  return (
    <>
      <HeadTitle pageTitle="Category Archive" />
      <HeaderOne postData={allPosts} />
      <BreadcrumbOne title={filter} />
      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
              <PostLayoutTwo dataPost={allPosts} show="5" />
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              <SidebarOne popular={popularPosts} dataPost={allPosts} />
            </div>
          </div>
        </div>
      </div>
      <InstagramOne parentClass="bg-color-grey" />
      <FooterOne />
    </>
  );
};

export default PostCategory;

export async function getServerSideProps({ query }) {
  try {
    const filter = query.fil || ""; // Get the filter value from params, defaulting to an empty string if not provided
    const response = await fetch("http://localhost:3000/api/posts/getAllPosts");
    const allPosts = await response.json();
    const popular = await fetch("http://localhost:3000/api/posts/getAnalytics");
    const data = await popular.json();

    // Filter the posts based on the filter value
    const filteredPosts = allPosts.filter((post) => post.category === filter);
    return {
      props: {
        allPosts: filteredPosts,
        filter,
        popularPosts: data,
      },
    };
  } catch (error) {
    console.error(error);

    // Return an empty post object if there was an error
    return {
      props: {
        allPosts: {},
      },
    };
  }
}
