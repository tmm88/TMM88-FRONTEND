import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateInput = (value) => {
    return value.length >= 4 && value.length <= 8;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isUsernameValid = validateInput(username);
    const isPasswordValid = validateInput(password);

    setUsernameError(!isUsernameValid);
    setPasswordError(!isPasswordValid);

    if (isUsernameValid && isPasswordValid) {
      setIsSubmitting(true);
      setTimeout(() => {
        alert('Login successful!');
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const handleInputChange = (setter, setError) => (e) => {
    const value = e.target.value;
    setter(value);
    setError(!validateInput(value));
  };

  return (
    <>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            padding: 20px;
          }

          .login-container {
            background: rgba(255, 255, 255, 0.9);
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 450px;
            padding: 40px;
            transition: transform 0.3s ease;
          }

          .login-container:hover {
            transform: translateY(-5px);
          }

          .logo {
            text-align: center;
            margin-bottom: 30px;
          }

          .logo-icon {
            font-size: 42px;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .logo h1 {
            margin-top: 10px;
            color: #333;
            font-weight: 600;
            font-size: 28px;
          }

          .input-group {
            margin-bottom: 25px;
            position: relative;
          }

          .input-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: #555;
            font-size: 14px;
          }

          .input {
            width: 100%;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
          }

          .input:focus {
            border-color: #6e8efb;
            box-shadow: 0 0 0 3px rgba(110, 142, 251, 0.2);
            outline: none;
          }

          .input.error {
            border-color: #ff4757;
          }

          .error-message {
            color: #ff4757;
            font-size: 12px;
            margin-top: 5px;
          }

          .password-wrapper {
            position: relative;
          }

          .password-toggle {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #777;
            cursor: pointer;
          }

          .password-toggle:hover {
            color: #333;
          }

          .remember-forgot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            font-size: 14px;
          }

          .remember {
            display: flex;
            align-items: center;
          }

          .remember input {
            margin-right: 8px;
            accent-color: #6e8efb;
          }

          .forgot-link {
            color: #6e8efb;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s;
          }

          .forgot-link:hover {
            color: #a777e3;
            text-decoration: underline;
          }

          .login-button {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #6e8efb, #a777e3);
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(110, 142, 251, 0.4);
          }

          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(110, 142, 251, 0.5);
          }

          .login-button:active:not(:disabled) {
            transform: translateY(0);
          }

          .login-button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .signup-link {
            text-align: center;
            margin-top: 25px;
            font-size: 14px;
            color: #555;
          }

          .signup-link a {
            color: #6e8efb;
            text-decoration: none;
            font-weight: 500;
          }

          .signup-link a:hover {
            text-decoration: underline;
          }

          @media (max-width: 480px) {
            .login-container {
              padding: 25px;
            }

            .remember-forgot {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
            }
          }
        `}
      </style>
      <div className="body">
        <div className="login-container">
          <div className="logo">
            <FontAwesomeIcon icon={faUserLock} className="logo-icon" />
            <h1>Account Login</h1>
          </div>

          <form onSubmit={handleSubmit} id="loginForm">
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleInputChange(setUsername, setUsernameError)}
                placeholder="Enter your username"
                className={`input ${usernameError ? 'error' : ''}`}
                required
              />
              {usernameError && <div className="error-message">Username must be 4-8 characters long</div>}
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handleInputChange(setPassword, setPasswordError)}
                  placeholder="Enter your password"
                  className={`input ${passwordError ? 'error' : ''}`}
                  required
                />
                <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
              {passwordError && <div className="error-message">Password must be 4-8 characters long</div>}
            </div>

            <div className="remember-forgot">
              <div className="remember">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-link">Forgot your password?</a>
            </div>

            <button type="submit" className="login-button" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>

            <div className="signup-link">
              Don't have an account? <a href="#">Sign up</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<LoginForm />);