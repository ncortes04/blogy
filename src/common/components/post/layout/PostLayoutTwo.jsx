import Link from "next/link";
import Image from "next/image";
import { slugify } from "../../../utils";
const PostLayoutTwo = ({ dataPost, user, postStart, show, bgColor }) => {
  if (!dataPost || dataPost.length === 0) {
    return <p>No posts found.</p>;
  }
  return (
    <>
      {dataPost.map((data) => (
        <div className={`content-block post-list-view axil-control mt--30`}>
          {data.featureImg ? (
            <div className="post-thumbnail">
              <Link href={`/viewpost?id=${data.id}`}>
                <a>
                  <Image
                    src={"/images/posts/thumbnail-08.webp"}
                    alt={data.title}
                    height={250}
                    width={295}
                    priority={true}
                  />
                </a>
              </Link>
            </div>
          ) : (
            <div className="post-thumbnail">
              <Link href={`/viewpost?id=${data.id}`}>
                <a>
                  <Image
                    src={"/images/posts/thumbnail-08.webp"}
                    alt={data.title}
                    height={250}
                    width={295}
                    priority={true}
                  />
                </a>
              </Link>
            </div>
          )}
          <div className="post-content">
            <div className="post-cat">
              <div className="post-cat-list">
                <Link href={`/category}`}>
                  <a className="hover-flip-item-wrapper">
                    <span className="hover-flip-item">
                      <span data-text={data.category}>{data.category}</span>
                    </span>
                  </a>
                </Link>
              </div>
            </div>
            <h4 className="title">
              <Link href={`/viewpost?id=${data.id}`}>
                <a>{data.name}</a>
              </Link>
            </h4>
            <p className="data-brief">{data.brief}</p>

            <div className="post-meta-wrapper">
              <div className="post-meta">
                <div className="content">
                  <h6 className="post-author-name">
                    <Link
                      href={
                        user
                          ? `/viewprofile?id=${user.id}`
                          : `/viewprofile?id=${data.user.id}`
                      }
                    >
                      <a className="hover-flip-item-wrapper">
                        <span className="hover-flip-item">
                          {user ? (
                            <span data-text={user.name}>{user.name}</span>
                          ) : (
                            <span data-text={data.user.name}>
                              {data.user.name}
                            </span>
                          )}
                        </span>
                      </a>
                    </Link>
                  </h6>
                  <ul className="post-meta-list">
                    <li>{data.created_at}</li>
                    <li>{data.read_time}</li>
                  </ul>
                </div>
              </div>
              <ul className="social-share-transparent justify-content-end">
                {/* {data.author_social.map((social) => (
                  <li key={social.url}>
                    <a href={social.url}>
                      <i className={social.icon} />
                    </a>
                  </li>
                ))} */}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PostLayoutTwo;
