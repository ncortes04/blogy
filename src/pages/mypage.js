import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NextNprogress from "nextjs-progressbar";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { getAllPosts } from "../../lib/api";
import InstagramOne from "../common/components/instagram/InstagramOne";
import FooterOne from "../common/elements/footer/FooterOne";
import HeaderOne from "../common/elements/header/HeaderOne";
import HeadTitle from "../common/elements/head/HeadTitle";
import PostLayoutTwo from "../common/components/post/layout/PostLayoutTwo";
import SidebarOne from "../common/components/sidebar/SidebarOne";
import authservice from "../common/utils/authservice";
import MarkdownEditor from "../common/elements/posts/MarkdownEditor";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";

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
  const [social, setSocial] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [dataFields, setDataFields] = useState({
    name: "",
    designation: "",
    bio: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the selected image
  };
  useEffect(() => {
    const fetchData = async () => {
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
        setDataFields({
          name: userData.foundUser.name,
          designation: userData.foundUser.designation,
          bio: userData.foundUser.bio,
          facebook: userData.foundUser.facebook || "",
          instagram: userData.foundUser.instagram || "",
          twitter: userData.foundUser.twitter || "",
          linkedin: userData.foundUser.linkedin || "",
        });

        const socialLinks = [
          {
            icon: "fab fa-facebook-f",
            url: userData.foundUser.facebook || "https://facebook.com/",
          },
          {
            icon: "fab fa-twitter",
            url: userData.foundUser.twitter || "https://twitter.com",
          },
          {
            icon: "fab fa-instagram",
            url: userData.foundUser.instagram || "https://instagram.com",
          },
          {
            icon: "fab fa-linkedin",
            url: user.instagram || "https://linkedin.com",
          },
        ];
        setSocial(socialLinks);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setDataFields({
      ...dataFields,
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
    setPreviewImage(null);
  };

  // ...

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("id_token");
    
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      Object.entries(dataFields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response = await fetch("/api/editProfile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 200) {
        const data = response.data;
        // Handle the response data
        setMyData(data.user);
        setIsEditing(false);
        handleSave();
      } else {
        // Handle error response
        console.error(response.data.message);
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
      <HeaderOne
        postData={allPosts}
        profileIcon={myData.img ? myData.img : ""}
      />
      <div className="axil-author-area axil-author-banner bg-color-grey">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about-author">
                <div className={isEditing ? "media isEdit" : "media"}>
                  <div className="thumbnail">
                    {isEditing ? (
                      <div className="img-edit">
                        <Link href="#">
                          <a>
                            
                            {previewImage ? (
                              <Image
                                src={previewImage}
                                alt={myData.name}
                                height={200}
                                width={200}
                                priority={true}
                              />
                            ) : (
                              <Image
                                src={myData.img ? myData.img : ""}
                                alt={myData.name}
                                height={200}
                                width={200}
                                priority={true}
                              />
                            )}
                          </a>
                        </Link>
                      </div>
                    ) : (
                      <Link href="#">
                        <a>
                          {previewImage ? (
                            <Image
                              src={previewImage}
                              alt={myData.name}
                              height={105}
                              width={105}
                              priority={true}
                            />
                          ) : (
                            <Image
                              src={myData.img ? myData.img : ""}
                              alt={myData.name}
                              height={105}
                              width={105}
                              priority={true}
                            />
                          )}
                        </a>
                      </Link>
                    )}

                    {isEditing ? (
                      <div className="file-upload">
                        <label>Upload Profile Image</label>{" "}
                        <input type="file" onChange={handleImageSelect} />
                      </div>
                    ) : (
                      ""
                    )}
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
                            value={dataFields.name}
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
                              value={dataFields.designation}
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
                            value={dataFields.bio}
                            onChange={handleInputChange}
                          />
                          <div className="social-links">
                            <div className="input-wrapper">
                              <label htmlFor="facebook" className="edit-label">
                                Facebook:
                              </label>
                              <input
                                type="text"
                                id="facebook"
                                name="facebook"
                                value={dataFields.facebook}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="input-wrapper">
                              <label htmlFor="instagram" className="edit-label">
                                Instagram:
                              </label>
                              <input
                                type="text"
                                id="instagram"
                                name="instagram"
                                value={dataFields.instagram}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="input-wrapper">
                              <label htmlFor="twitter" className="edit-label">
                                Twitter:
                              </label>
                              <input
                                type="text"
                                id="twitter"
                                name="twitter"
                                value={dataFields.twitter}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="input-wrapper">
                              <label htmlFor="linkedin" className="edit-label">
                                LinkedIn:
                              </label>
                              <input
                                type="text"
                                id="linkedin"
                                name="linkedin"
                                value={dataFields.linkedin}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="b1 description">{myData.bio}</p>
                          <ul className="social-share-transparent size-md">
                            {social.map((social) => (
                              <li key={social.url}>
                                <a href={social.url}>
                                  <i className={social.icon} />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </>
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
                  {!addPost ? (
                    <button
                      className="message-btn hover"
                      onClick={() => setAddPost(true)}
                    >
                      <BiMessageSquareAdd style={{ fontSize: "5rem" }} />
                    </button>
                  ) : (
                    <button
                      className="message-btn"
                      onClick={() => setAddPost(false)}
                    >
                      <FaTimes style={{ fontSize: "5rem" }} />
                    </button>
                  )}
                </div>
                {addPost ? <MarkdownEditor /> : null}
              </div>
                <PostLayoutTwo
                  user={{ name: myData.name, id: myData.id }}
                  dataPost={myData.post}
                  show="5"
                />
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
