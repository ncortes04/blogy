import React,{useState} from "react";

import { useRouter } from "next/router";

const CommentForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState("");
  const handleChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("id_token");
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/addComment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ description: formData, id: id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const commentData = await response.json();
      // Handle the commentData as needed
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };
  return (
    <div className="comment-respond">
      <h4 className="title">Post a comment</h4>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row row--10">
          <div className="col-12">
            <div className="form-group">
              <label htmlFor="message">Leave a Reply</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <p className="comment-form-cookies-consent">
              <input
                id="wp-comment-cookies-consent"
                name="wp-comment-cookies-consent"
                type="checkbox"
              />
              <label htmlFor="wp-comment-cookies-consent">
                Save my name, email, and website in this browser for the next
                time I comment.
              </label>
            </p>
          </div>
          <div className="col-lg-12">
            <div className="form-submit cerchio">
              <input
                name="submit"
                type="submit"
                id="submit"
                className="axil-button button-rounded"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
