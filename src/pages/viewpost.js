import HeadTitle from "../common/elements/head/HeadTitle";
import HeaderOne from "../common/elements/header/HeaderOne";
import FooterOne from "../common/elements/footer/FooterOne";
import PostFormatStandard from "../common/components/post/format/PostFormatStandard";
import InstagramOne from "../common/components/instagram/InstagramOne";
import { useEffect } from "react";

const PostDetails = ({ post, allPosts, popular }) => {
  return (
    <>
      <HeaderOne
        postData={allPosts}
        pClass="header-light header-sticky header-with-shadow"
      />
      <HeadTitle pageTitle={post.name} />
      <PostFormatStandard postData={post} popular={popular} />
      <InstagramOne parentClass="bg-color-extra03" />
      <FooterOne />
    </>
  );
};

export default PostDetails;

export async function getServerSideProps(context) {
  try {
    const { id } = context.query;

    let post = {};
    let allPosts = [];
    const popular = await fetch("http://localhost:3000/api/posts/getAnalytics");
    const data = await popular.json();

    if (id) {
      const response = await fetch(
        `http://localhost:3000/api/getPost?id=${id}`
      );
      post = await response.json();
    }

    const allPostsResponse = await fetch(
      "http://localhost:3000/api/posts/getAllPosts"
    );
    allPosts = await allPostsResponse.json();

    return {
      props: {
        post,
        popular: data,
        allPosts,
      },
    };
  } catch (error) {
    console.error(error);

    return {
      props: {
        post: {},
        allPosts: [],
      },
    };
  }
}
