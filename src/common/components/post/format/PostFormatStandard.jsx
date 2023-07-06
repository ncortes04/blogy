import PostMetaOne from "./element/PostMetaOne";
import PostAuthor from "./element/PostAuthor";
import SidebarTwo from "../../sidebar/SidebarTwo";
import PostMetaTwo from "./element/PostMetaTwo";
import PostComment from "./element/PostComment";
import PostTagShare from "./element/PostTagShare";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const PostFormatStandard = ({ postData, allData}) => {
  // const basePathLink = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BASEPATH ?? "" : "";
  
  // const postContent = postData.content.replaceAll('/images/', basePathLink + '/images/');
  return (
    <>
    {postData.featureImg ? <PostMetaOne metaData={postData} /> : ""}

      <div className="post-single-wrapper axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* {postData.featureImg ? "" : <PostMetaTwo metaData={postData} />} */}
              <div className="axil-post-details">
                <h2 className="post-heading">{postData.name}</h2>
                <ReactMarkdown>{postData.description}</ReactMarkdown>
                {/* <PostTagShare postTags={postData}/> */}
                <PostAuthor user={postData.user} />
                <PostComment />
              </div>
            </div>
            <div className="col-lg-4">
              {/* <SidebarTwo dataPost={allData} tagData={postData}/> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFormatStandard;
