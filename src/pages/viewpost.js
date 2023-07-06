import HeadTitle from '../common/elements/head/HeadTitle';
import HeaderOne from '../common/elements/header/HeaderOne';
import FooterOne from '../common/elements/footer/FooterOne';
import PostFormatStandard from '../common/components/post/format/PostFormatStandard';
import InstagramOne from '../common/components/instagram/InstagramOne';

const PostDetails = ({ post }) => {
    console.log(post)

	return (
		<>
			{/* <HeaderOne postData={allPosts} pClass="header-light header-sticky header-with-shadow"/> */}
			<HeadTitle pageTitle={post.name} />
			<PostFormatStandard postData={post}/>
			<InstagramOne parentClass="bg-color-extra03"/>
			<FooterOne />
		</>
	);
}

export default PostDetails;

export async function getServerSideProps(context) {
    // Extract the post ID from the URL params
    const { id } = context.query;
    try {
      // Make an API request to fetch the post data using the ID
      const response = await fetch(`http://localhost:3000/api/getPost?id=${id}`);
      const post = await response.json();
      // Pass the post data as props to the component
      return {
        props: {
          post,
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
  
