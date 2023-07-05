import markdownToHtml from '../../../lib/markdownToHtml';
import { getPostBySlug, getAllPosts } from '../../../lib/api';
import HeadTitle from '../../common/elements/head/HeadTitle';
import HeaderOne from '../../common/elements/header/HeaderOne';
import FooterOne from '../../common/elements/footer/FooterOne';
import PostFormatStandard from '../../common/components/post/format/PostFormatStandard';
import InstagramOne from '../../common/components/instagram/InstagramOne';

const PostDetails = ({ post, allPosts }) => {

	
	
	return (
		<>
			<HeaderOne postData={allPosts} pClass="header-light header-sticky header-with-shadow"/>
			<HeadTitle pageTitle={post.title} />
			<PostFormatStandard postData={post} allData={allPosts}/>
			<InstagramOne parentClass="bg-color-extra03"/>
			<FooterOne />
		</>
	);
}

export default PostDetails;

export async function getStaticProps({ params }) {

	const post = getPostBySlug(params.slug, [
		'title',
		'featureImg',
		'postFormat',
		'gallery',
		'videoLink',
		'audio',
		'date',
		'slug',
		'cate',
		'author_name',
		'author_img',
		'author_designation',
		'author_bio',
		'author_social',
		'post_views',
		'content',
		'tags'
	])
	console.log(post.content)
	const content = await markdownToHtml(post.content || '')

	const allPosts = getAllPosts([
		'id',
		'title',
		'featureImg',
		'postFormat',
		'featured',
		'date',
		'slug',
		'cate',
		'cate_img',
		'author_img',
		'author_name',
		'post_views',
		'read_time',
		'author_social',
	  ])
	

	return {
		props: {
			post: {
				...post,
				content,
			},
			allPosts
		},
	}
}


export async function getStaticPaths() {
	const posts = getAllPosts(['slug'])
	
	const paths = posts.map(post => ({
		params: {
			slug: post.slug
		}
	}))
	return {
		paths,
		fallback: false,
	}
}
