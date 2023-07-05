import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllPosts } from '../../lib/api';
import InstagramOne from '../common/components/instagram/InstagramOne';
import FooterOne from '../common/elements/footer/FooterOne';
import HeaderOne from '../common/elements/header/HeaderOne';
import HeadTitle from "../common/elements/head/HeadTitle";
import authservice from "../common/utils/authservice";

const AuthorArchive = ({ token, allPosts }) => {
  // Check if user data exists
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Access the token from localStorage or any other client-side storage
      token = localStorage.getItem("id_token");
      // Send a POST request with the user ID in the request body and bearer token in the Authorization header
      try {
        const response = await fetch("http://localhost:3000/api/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        console.log(userData)
        setMyData(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(myData)
  return (
    <>
      <HeadTitle pageTitle="Author Archive" />
      <HeaderOne postData={allPosts} />
      <div className="axil-author-area axil-author-banner bg-color-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-author">
                <div className="media">
                  <div className="thumbnail">
                    <Link href="#">
                      <a>
                        <Image
                          src={"/images/posts/author/author-b5.webp"}
                          alt={"asdada"}
                          height={105}
                          width={105}
                          priority={true}
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="media-body">
                    <div className="author-info">
                      <h1 className="title">{myData.name}</h1>
                      <span className="b3 subtitle">
                        {myData.designation}
                      </span>
                    </div>
                    <div className="content">
                      <p className="b1 description">
                        {myData.bio}
                      </p>
                      <ul className="social-share-transparent size-md">
                        {authorData[0].author_social.map((social) => (
                          <li key={social.url}>
                            <a href={social.url}>
                              <i className={social.icon} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="axil-post-list-area axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-title">
                <h2 className="title mb--40">Articles By This Author</h2>
              </div>
            </div>
            <div className="col-lg-8 col-xl-8">
              {/* <PostLayoutTwo dataPost={authorData} show="5"/> */}
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              {/* <SidebarOne dataPost={allPosts} /> */}
            </div>
          </div>
        </div>
      </div>
      <InstagramOne parentClass="bg-color-grey" />
      <FooterOne />
    </>
  );
};

export default AuthorArchive;
export async function getServerSideProps(context) {
    try {
        let token = '';

      // Fetch all posts
      const allPosts = getAllPosts(["title", "featureImg", "slug", "cate"]);
  
      return {
        props: {
        token,
          allPosts,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {
            token,
            allPosts: [],
        },
      };
    }
  }
  

  