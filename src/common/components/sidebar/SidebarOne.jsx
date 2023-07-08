import WidgetCategory from "./WidgetCategory";
import WidgetInstagramPost from "./WidgetInstagramPost";
import WidgetPostList from "./WidgetPostList";
import WidgetSearch from "./WidgetSearch";
import WidgetSocialShare from "./WidgetSocialShare";

const SidebarOne = ({ col, popular, dataPost, isMyPage}) => {
  return (
    <div className="sidebar-inner">
      {isMyPage ? null : null}
      <WidgetCategory catData={dataPost}/>
      <WidgetSearch />
      <WidgetPostList popularPosts={popular}/>
      <WidgetSocialShare />
      <WidgetInstagramPost />
    </div>
  );
};

export default SidebarOne;
