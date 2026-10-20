import React, { useState } from 'react';
import style from "./Register-Form.module.css";
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../Services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { FaSpinner } from 'react-icons/fa';
import { useEmail } from '../../Context/email_context';
import SignUpNav from '../../components/Register-Navbar/SignUp-Nav';
import SignUpFooter from '../../components/Register-Footer/SignUp-Footer';

function Register() {
  const { email: defaultEmail } = useEmail();
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: defaultEmail,
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({});
    setAuthError(null)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password should be between 6 and 60 characters.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
          username: formData.username,
          email: formData.email,
        });
        navigate('/expackage-info');
      } catch (error) {
        console.error("Error creating user:", error.message);
        setAuthError(error.code === 'auth/email-already-in-use' ? "Email already registered" : `Failed to create an account: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <SignUpNav />
      <div className={style.register_form}>
        <div className={style.register_form_container}>
          <span>STEP 1 OF 3</span>
          <h1>Create an account to start your membership</h1>
          <p>Just a few more steps and you're done! <br /> We hate paperwork, too.</p>
          <form onSubmit={handleSubmit}>
            <input
              className={style.input}
              style={errors.username ? { borderColor: '#ba312f' } : null}
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              value={formData.username}
            />
            {errors.username && <span className={style.errorText}>{errors.username}</span>}
            <input
              className={style.input}
              style={errors.email ? { borderColor: '#ba312f' } : null}
              type="email"
              name='email'
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && <span className={style.errorText}>{errors.email}</span>}
            <input
              className={style.input}
              style={errors.password ? { borderColor: '#ba312f' } : null}
              type="password"
              name="password"
              placeholder="Add a password"
              onChange={handleChange}
              value={formData.password}
            />
            {errors.password && <span className={style.errorText}>{errors.password}</span>}
            <div className={style.checkboxContainer}>
              <input
                className={style.checkbox}
                type="checkbox"
                id="checkbox"
                name="checkbox"
              />
              <label htmlFor="checkbox">Please do not email me Netflix special offers.</label>
            </div>
            {authError && <span className={style.errorText}>{authError}</span>}
            <button type="submit" disabled={loading}>
              {loading ? <FaSpinner className={style.spinner} /> : 'Next'}
            </button>
          </form>
        </div>
      </div>
      <SignUpFooter />
    </div>
  );
}

export default Register;
