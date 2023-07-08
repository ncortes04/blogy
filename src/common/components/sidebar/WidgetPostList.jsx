import Link from "next/link";
import Image from "next/image";

const WidgetPostList = ({ popularPosts }) => {
  if (!popularPosts || popularPosts.length === 0) {
    return <p>No popular posts found.</p>;
  }

  return (
    <div className="axil-single-widget widget widget_postlist mb--30">
      <h5 className="widget-title">Popular on Blogar</h5>
      <div className="post-medium-block">
        {popularPosts.map((data) => (
          <div className="content-block post-medium mb--20" key={data.id}>
            {data.featureImg && (
              <div className="post-thumbnail">
                <Link href={`/viewpost?id=${data.id}`}>
                  <a>
                    <Image
                      src={data.featureImg}
                      alt={data.name}
                      height={100}
                      width={100}
                      priority={true}
                    />
                  </a>
                </Link>
              </div>
            )}
            <div className="post-content">
              <h6 className="title">
                <Link href={`/viewpost?id=${data.id}`}>
                  <a>{data.name}</a>
                </Link>
              </h6>
              <div className="post-meta">
                <ul className="post-meta-list">
                  <li>{data.created_at}</li>
                  <li>{data.post_views}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetPostList;


