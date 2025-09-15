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
            background: linear-gradient(135deg, #0d0d0d, #1a1a1a);
            padding: 20px;
          }

          .login-container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
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
            background: linear-gradient(135deg, #ff0000, #b30000);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .logo h1 {
            margin-top: 10px;
            color: #111;
            font-weight: 700;
            font-size: 28px;
          }

          .input-group {
            margin-bottom: 25px;
            position: relative;
          }

          .input-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #222;
            font-size: 14px;
          }

          .input {
            width: 100%;
            padding: 15px;
            border: 2px solid #ccc;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
            background-color: #fff;
            color: #000;
          }

          .input:focus {
            border-color: #e60000;
            box-shadow: 0 0 0 3px rgba(230, 0, 0, 0.25);
            outline: none;
          }

          .input.error {
            border-color: #ff3333;
          }

          .error-message {
            color: #ff3333;
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
            color: #555;
            cursor: pointer;
          }

          .password-toggle:hover {
            color: #111;
          }

          .remember-forgot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            font-size: 14px;
            color: #222;
          }

          .remember {
            display: flex;
            align-items: center;
          }

          .remember input {
            margin-right: 8px;
            accent-color: #e60000;
          }

          .forgot-link {
            color: #e60000;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s;
          }

          .forgot-link:hover {
            color: #b30000;
            text-decoration: underline;
          }

          .login-button {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #ff0000, #990000);
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(230, 0, 0, 0.4);
          }

          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(230, 0, 0, 0.5);
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
            color: #333;
          }

          .signup-link a {
            color: #e60000;
            text-decoration: none;
            font-weight: 600;
          }

          .signup-link a:hover {
            text-decoration: underline;
            color: #b30000;
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