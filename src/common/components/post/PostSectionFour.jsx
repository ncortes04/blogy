import AddBanner from "../ad-banner/AddBanner";
import SidebarOne from "../sidebar/SidebarOne";
import PostLayoutTwo from "./layout/PostLayoutTwo";

const PostSectionFour = ({ popular, postData, adBanner }) => {
  return (
    <div className="axil-post-list-area post-listview-visible-color axil-section-gap bg-color-white">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-xl-8">
            <PostLayoutTwo dataPost={postData} show="5" />
          </div>
          <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
            <SidebarOne dataPost={postData} popular={popular} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSectionFour;
