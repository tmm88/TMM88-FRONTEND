import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }

          .body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #3a0ca3, #00b4d8);
            padding: 20px;
          }

          .login-container {
            background: rgba(255, 255, 255, 0.98);
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
            width: 100%;
            max-width: 430px;
            padding: 40px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .login-container:hover {
            transform: translateY(-6px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);
          }

          .logo {
            text-align: center;
            margin-bottom: 35px;
          }

          .logo-icon {
            font-size: 48px;
            background: linear-gradient(135deg, #00b4d8, #3a0ca3);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .logo h1 {
            margin-top: 12px;
            color: #222;
            font-weight: 700;
            font-size: 26px;
            letter-spacing: 1px;
          }

          .input-group {
            margin-bottom: 25px;
            position: relative;
          }

          .input-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
            font-size: 14px;
          }

          .input {
            width: 100%;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 10px;
            font-size: 15px;
            transition: all 0.3s ease;
            background-color: #fff;
            color: #000;
          }

          .input:focus {
            border-color: #3a0ca3;
            box-shadow: 0 0 0 3px rgba(58, 12, 163, 0.25);
            outline: none;
          }

          .input.error {
            border-color: #ff4d6d;
          }

          .error-message {
            color: #ff4d6d;
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
            color: #666;
            cursor: pointer;
          }

          .password-toggle:hover {
            color: #222;
          }

          .remember-forgot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            font-size: 14px;
            color: #444;
          }

          .remember {
            display: flex;
            align-items: center;
          }

          .remember input {
            margin-right: 8px;
            accent-color: #3a0ca3;
          }

          .forgot-link {
            color: #3a0ca3;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s;
          }

          .forgot-link:hover {
            color: #00b4d8;
            text-decoration: underline;
          }

          .login-button {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #3a0ca3, #00b4d8);
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(58, 12, 163, 0.3);
          }

          .login-button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(0, 180, 216, 0.4);
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
            color: #3a0ca3;
            text-decoration: none;
            font-weight: 600;
          }

          .signup-link a:hover {
            text-decoration: underline;
            color: #00b4d8;
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
            <FontAwesomeIcon icon={faUserShield} className="logo-icon" />
            <h1>Welcome Back</h1>
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
              <a href="#" className="forgot-link">Forgot password?</a>
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