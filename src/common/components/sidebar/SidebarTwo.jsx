import WidgetCategory from "./WidgetCategory";
import WidgetInstagramPost from "./WidgetInstagramPost";
import WidgetNewsletter from "./WidgetNewsletter";
import WidgetPostList from "./WidgetPostList";
import WidgetSearch from "./WidgetSearch";
import WidgetSocialShare from "./WidgetSocialShare";
import WidgetTags from "./WidgetTags";

const SidebarTwo = ({ popular, dataPost, tagData }) => {
  return (
    <div className="sidebar-inner">
      <WidgetCategory catData={dataPost} />
      <WidgetSearch />
      <WidgetPostList popularPosts={popular} />
      <WidgetNewsletter />
      <WidgetSocialShare />
      <WidgetInstagramPost />
      {/* <WidgetTags postTag={tagData}/> */}
    </div>
  );
};

export default SidebarTwo;
