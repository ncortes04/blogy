import { useState } from 'react';
import PostMetaOne from './element/PostMetaOne';
import PostAuthor from './element/PostAuthor';
import SidebarTwo from '../../sidebar/SidebarTwo';
import PostMetaTwo from './element/PostMetaTwo';
import PostComment from './element/PostComment';
import PostTagShare from './element/PostTagShare';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import CommentForm from './element/CommentForm';

const PostFormatStandard = ({ postData, allData }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);

  const toggleCommentForm = () => {
    setShowCommentForm(!showCommentForm);
  };

  const socialLinks = [
    {
      icon: 'fab fa-facebook-f',
      url: postData.user.facebook || 'https://facebook.com/',
    },
    {
      icon: 'fab fa-twitter',
      url: postData.user.twitter || 'https://twitter.com',
    },
    {
      icon: 'fab fa-instagram',
      url: postData.user.instagram || 'https://instagram.com',
    },
    {
      icon: 'fab fa-linkedin',
      url: postData.user.instagram || 'https://linkedin.com',
    },
  ];

  return (
    <>
      {postData.bannerImg ? <PostMetaOne socialLinks={socialLinks} metaData={postData} /> : ''}

      <div className="post-single-wrapper axil-section-gap bg-color-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {postData.bannerImg ? (
                ''
              ) : (
                <PostMetaTwo metaData={postData} socialLinks={socialLinks} />
              )}
              <div className="axil-post-details">
                <h2 className="post-heading">{postData.name}</h2>
                <ReactMarkdown>{postData.description}</ReactMarkdown>
                <PostTagShare
                  postCat={postData.category}
                  postTags={postData}
                  socialLinks={socialLinks}
                />
                <PostAuthor user={postData.user} socialLinks={socialLinks} />
                <div className="axil-total-comment-post">
                  <div className="title">
                    <h4 className="mb--0">
                      {postData.comment.length === 0
                        ? 'No comments'
                        : `${postData.comment.length} Comments`}
                    </h4>
                  </div>
                  <div className="add-comment-button cerchio">
                    <div>
                      <button
                        className="axil-button button-rounded"
                        onClick={toggleCommentForm}
                      >
                        <span>Add Your Comment</span>
                      </button>
                    </div>
                  </div>
                </div>
                {showCommentForm && <CommentForm />}
                <PostComment comments={postData.comment} />
              </div>
            </div>
            <div className="col-lg-4"><SidebarTwo dataPost={allData} tagData={postData}/></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostFormatStandard;
