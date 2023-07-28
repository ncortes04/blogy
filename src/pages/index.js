import InstagramOne from "../common/components/instagram/InstagramOne";
import HeadTitle from "../common/elements/head/HeadTitle";
import PostSectionNine from "../common/components/post/PostSectionNine";
import CategoryListSlide from "../common/components/category/CategoryListSlide";
import PostSectionThree from "../common/components/post/PostSectionThree";
import PostSectionFour from "../common/components/post/PostSectionFour";
import PostSectionTen from "../common/components/post/PostSectionTen";
import PostSectionEleven from "../common/components/post/PostSectionEleven";
import { useState, useEffect } from "react";
import HeaderOne from "../common/elements/header/HeaderOne";
import { all } from "axios";
import FooterTwo from "../common/elements/footer/FooterTwo";

const TechBlog = ({ allPosts, popularPosts }) => {
  return (
    <>
      <HeadTitle pageTitle="Tech Blog" />
      <HeaderOne postData={allPosts} />
      <PostSectionNine postData={allPosts} />
      <CategoryListSlide />
      <PostSectionTen postData={allPosts} />
      {/* <PostSectionThree postData={allPosts} heading="Featured Video" /> */}
      <PostSectionFour postData={allPosts} popular={popularPosts} />
      <PostSectionEleven postData={allPosts} />
      <InstagramOne parentClass="bg-color-grey" />
      <FooterTwo />
    </>
  );
};

export default TechBlog;

export async function getServerSideProps(context) {
  try {
    const response = await fetch("http://localhost:3000/api/posts/getAllPosts");
    const allPosts = await response.json();
    const popular = await fetch("http://localhost:3000/api/posts/getAnalytics");
    const data = await popular.json();
    return {
      props: {
        allPosts,
        popularPosts: data,
      },
    };
  } catch (error) {
    console.error(error);

    // Return an empty post object if there was an error
    return {
      props: {
        post: {},
      },
    };
  }
}
