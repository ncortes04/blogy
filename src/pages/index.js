import InstagramOne from "../common/components/instagram/InstagramOne";
import FooterThree from "../common/elements/footer/FooterThree";
import HeaderThree from "../common/elements/header/HeaderThree";
import HeadTitle from "../common/elements/head/HeadTitle";
import PostSectionNine from '../common/components/post/PostSectionNine';
import CategoryListSlide from '../common/components/category/CategoryListSlide';
import PostSectionThree from '../common/components/post/PostSectionThree';
import PostSectionFour from '../common/components/post/PostSectionFour';
import PostSectionTen from '../common/components/post/PostSectionTen';
import PostSectionEleven from '../common/components/post/PostSectionEleven';

const TechBlog = ({allPosts}) => {
  const techPost = allPosts.filter(post => post.category === "technology");
  
    return ( 
        <>
        <HeadTitle pageTitle="Tech Blog"/>
        <HeaderThree postData={allPosts}/>
        <PostSectionNine postData={allPosts}/>
        <CategoryListSlide />
        <PostSectionTen postData={allPosts} />
        {/* <PostSectionThree postData={videoPost} heading="Featured Video"/> */}
        <PostSectionFour postData={techPost} adBanner={true}/>
        <PostSectionEleven postData={allPosts}/>
        <InstagramOne parentClass="bg-color-grey"/>
        <FooterThree />
        </>
     );
}
 
export default TechBlog;  


export async function getServerSideProps(context) {
  try {
    const response = await fetch("http://localhost:3000/api/posts/getAllPosts");
    const allPosts = await response.json();
    return {
      props: {
        allPosts,
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
