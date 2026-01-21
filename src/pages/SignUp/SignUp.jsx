import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';
import api from '../../services/api';
import SignupImg from "../../assets/signup.jpg"
import GoogleImg from "../../assets/google.svg"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './SignUp.scss';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    password: '',
    dob: '',
    agree: false,
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fname.trim()) newErrors.fname = 'First name is required';
    if (!formData.lname.trim()) newErrors.lname = 'Last name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const dob = new Date(formData.dob);
      const today = new Date();
      if (dob >= today) {
        newErrors.dob = 'Date of birth must be in the past';
      }
    }

    if (!formData.terms) {
      newErrors.terms = 'You must accept the Terms of Service';
    }

    if (!formData.agree) {
      newErrors.agree = 'You must accept the Privacy Policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setIsSubmitting(true);  
    try {
      // Hash the password using SHA-256
      const hashedPassword = CryptoJS.SHA256(formData.password).toString(CryptoJS.enc.Hex);

      const payload = {
        firstname: formData.fname.trim(),
        lastname: formData.lname.trim(),
        email: formData.email.trim(),
        encryptpassword: hashedPassword,
        mobile: formData.mobile,
        dob: formData.dob,
      };

      const response = await api.post('/register.php', payload);
      if (response.status === 200) {
        toast.success('Registration successful!');
        // Reset form
        setFormData({
          fname: '',
          lname: '',
          email: '',
          mobile: '',
          password: '',
          dob: '',
          agree: false,
          terms: false,
        });
        setErrors({});
        navigate('/home');
      } else {
        throw new Error(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_left">
        <h2>Welcome To Atologist Infotech</h2>
        <p className="subtitle">Create your account</p>

        <button className="google_btn">
          <img src={GoogleImg} alt='google button image'/>
        </button>
        <div className="divider">OR</div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="field">
            <label htmlFor="fname">First Name</label>
            <input
              id="fname"
              type="text"
              name="fname"
              placeholder="Enter your first name"
              value={formData.fname}
              onChange={handleChange}
            />
            {errors.fname && <p className="error">{errors.fname}</p>}
          </div>

          <div className="field">
            <label htmlFor="lname">Last Name</label>
            <input
              id="lname"
              type="text"
              name="lname"
              placeholder="Enter your last name"
              value={formData.lname}
              onChange={handleChange}
            />
            {errors.lname && <p className="error">{errors.lname}</p>}
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
            {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="field">
          <label htmlFor="mobile">Mobile</label>
          <input
            id="mobile"
            type="tel"
            name="mobile"
            placeholder="Enter your mobile number"
            value={formData.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <p className="error">{errors.mobile}</p>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <div className="password_field">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="password_toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="field">
          <label htmlFor="dob">DOB</label>
          <input
            id="dob"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <p className="error">{errors.dob}</p>}
        </div>

        <div>
          <p> I agree to</p>
         
           <div className='check_row'>
            <label className="checkbox">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />Terms of Service
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                required
              />
              Privacy Policy
            </label>
           </div>
        </div>

        <button 
          type="submit" 
          className="submit_btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      </div>

      <div className="signup_right">
        <img
          src={SignupImg}
          alt="Signup Illustration"
        />
      </div>

         <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
    </div>
  );
};

export default SignUp;
