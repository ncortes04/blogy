import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "../../lib/api";
import InstagramOne from "../common/components/instagram/InstagramOne";
import FooterOne from "../common/elements/footer/FooterOne";
import HeaderOne from "../common/elements/header/HeaderOne";
import HeadTitle from "../common/elements/head/HeadTitle";
import SidebarOne from "../common/components/sidebar/SidebarOne";
import authservice from "../common/utils/authservice";
import MarkdownEditor from "../common/elements/posts/MarkdownEditor";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import { BiMessageSquareAdd } from 'react-icons/bi';

const LoadingBar = () => {
  return (
    <NextNprogress
      color="#29D"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
    />
  );
};

const AuthorArchive = ({ token, allPosts }) => {
  const [myData, setMyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addPost, setAddPost] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    bio: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      // Access the token from localStorage or any other client-side storage
      // Send a POST request with the user ID in the request body and bearer token in the Authorization header
      token = localStorage.getItem("id_token");
      try {
        const response = await fetch("http://localhost:3000/api/me", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await response.json();
        setMyData(userData.foundUser);
        setFormData({
          name: userData.foundUser.name,
          designation: userData.foundUser.designation,
          bio: userData.foundUser.bio,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    token = localStorage.getItem("id_token");

    try {
      const response = await fetch(`/api/editProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the response data
        setMyData(data.user);
        setIsEditing(false);
      } else {
        // Handle error response
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return (
      <>
        <HeadTitle pageTitle="Author Archive" />
        <HeaderOne postData={allPosts} />
        <LoadingBar />
      </>
    );
  }

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
                      {isEditing ? (
                        <div className="input-wrapper">
                          <label htmlFor="name" className="edit-label">
                            Edit Name:
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <div className="name-spacer">
                          <h1 className="title">{myData.name}</h1>
                          <FaPencilAlt
                            onClick={handleEdit}
                            className="edit-icon"
                          />
                        </div>
                      )}
                      <span className="b3 subtitle">
                        {isEditing ? (
                          <div className="input-wrapper">
                            <label htmlFor="designation" className="edit-label">
                              Edit Designation:
                            </label>
                            <input
                              type="text"
                              id="designation"
                              name="designation"
                              value={formData.designation}
                              onChange={handleInputChange}
                            />
                          </div>
                        ) : (
                          myData.designation
                        )}
                      </span>
                    </div>
                    <div className="content">
                      {isEditing ? (
                        <div className="input-wrapper">
                          <label htmlFor="bio" className="edit-label">
                            Edit Bio:
                          </label>
                          <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleInputChange}
                          />
                        </div>
                      ) : (
                        <p className="b1 description">{myData.bio}</p>
                      )}
                      {isEditing ? (
                        <>
                          <FaCheck
                            onClick={handleSubmit}
                            className="edit-icon"
                          />
                          <FaTimes
                            onClick={handleCancel}
                            className="edit-icon"
                          />
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="axil-post-list-area axil-section-gap ">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-xl-8">
            <div className="page-title">
                <div className="name-spacer">
                  <h2 className="title">My Articles</h2>
                  {!addPost ? 
                  <button className="message-btn hover" onClick={() => setAddPost(true)}>
                    <BiMessageSquareAdd style={{ fontSize: '5rem' }}/>
                  </button>
                  : <button className="message-btn" onClick={() => setAddPost(false)}>
                      <FaTimes style={{ fontSize: '5rem' }}/>
                    </button>
                  }
                 
                </div>
                {addPost ? <MarkdownEditor /> : null}
              </div>
              {/* {myData.post.length > 0 ? (
                <PostLayoutTwo dataPost={authorData} show="5" />
              ) : (
                <div>No posts</div>
              )} */}
            </div>
            <div className="col-lg-4 col-xl-4 mt_md--40 mt_sm--40">
              <SidebarOne dataPost={allPosts} />
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
    let token = "";

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
