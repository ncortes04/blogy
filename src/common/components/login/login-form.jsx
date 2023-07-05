import { useState } from "react";
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from "axios";
import authservice from "../../utils/authservice";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        JSON.stringify(formData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const { token } = response.data;
  
      // Set id_token in local storage
      authservice.setToken(token);
  
      // Redirect to the home page
      window.location.href = '/home';
    } catch (error) {
      console.error(error.message);
    }
  };
  
  
  return (
    <div className="login-parent-form">
      <div className="login-form">
        <div className="comment-respond">
          <h4 className="title">Login or Sign up</h4>
          <form onSubmit={handleSubmit}>
            <p className="comment-notes">
              <span id="email-notes">Your information is safe and secure</span>
            </p>
            <div className="col login-input-cont">
              <div>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="website">Your Password</label>
                  <div className="password-input-wrapper">
                    <input
                      id="website"
                      type={showPassword ? "text" : "password"}
                      className="password-input"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="toggle-password-button"
                      onClick={toggleShowPassword}
                    >
                    </button>
                  </div>
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
                    Save my name, email, and website in this browser for the
                    next time I comment.
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
      </div>
      {/* End Comment Respond  */}
    </div>
  );
};

export default LoginForm;
