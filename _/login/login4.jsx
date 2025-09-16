import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');

  const usernameRegex = /^[a-zA-Z0-9_.-]{4,16}$/;
  const passwordRegex = /^(?=.*[0-9]).{8,20}$/;

  const validateInput = (value, regex, min, max) => {
    const trimmedValue = value.trim();
    return trimmedValue.length >= min && trimmedValue.length <= max && regex.test(trimmedValue);
  };

  const handleInputChange = (setter, setError, regex, min, max) => (e) => {
    const value = e.target.value;
    setter(value);
    setError(!validateInput(value, regex, min, max));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isUsernameValid = validateInput(username, usernameRegex, 4, 16);
    const isPasswordValid = validateInput(password, passwordRegex, 8, 20);

    setUsernameError(!isUsernameValid);
    setPasswordError(!isPasswordValid);

    if (!isUsernameValid || !isPasswordValid) {
      setStatusMessage('Please correct the errors above.');
      setStatusType('error');
      return;
    }

    setIsSubmitting(true);
    setStatusMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setStatusMessage('Login successful! Redirecting...');
      setStatusType('success');
      setUsername('');
      setPassword('');
      setRememberMe(false);
    } catch (error) {
      setStatusMessage('Login failed. Please check your credentials.');
      setStatusType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>
        {`
          :root {
            --bg-color-start: #0a0a0a;
            --bg-color-end: #1a1a1a;
            --card-bg: rgba(255, 255, 255, 0.08);
            --card-border: rgba(255, 255, 255, 0.15);
            --accent-color: #6a82fb;
            --secondary-accent: #2e6097;
            --text-color: #f0f0f0;
            --label-color: #b0b0b0;
            --input-bg: rgba(255, 255, 255, 0.05);
            --input-border: rgba(255, 255, 255, 0.2);
            --error-color: #ff6b6b;
            --shadow-primary: 0 10px 30px rgba(0, 0, 0, 0.4);
            --shadow-secondary: 0 20px 60px rgba(0, 0, 0, 0.6);
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
          }

          .body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, var(--bg-color-start), var(--bg-color-end));
            color: var(--text-color);
            padding: 20px;
          }

          .login-container {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            box-shadow: var(--shadow-primary);
            width: 100%;
            max-width: 450px;
            padding: 40px;
            transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
            animation: fadeIn 0.8s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .login-container:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-secondary);
          }

          .logo {
            text-align: center;
            margin-bottom: 35px;
          }

          .logo-icon {
            font-size: 56px;
            color: var(--accent-color);
            text-shadow: 0 0 15px rgba(106, 130, 251, 0.6);
            transition: all 0.3s ease;
          }

          .logo-icon:hover {
            color: var(--secondary-accent);
            text-shadow: 0 0 20px rgba(46, 96, 151, 0.8);
          }

          .logo h1 {
            margin-top: 15px;
            font-weight: 700;
            font-size: 2.2rem;
            letter-spacing: 1px;
            background: linear-gradient(45deg, var(--accent-color), var(--secondary-accent));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          .input-group {
            margin-bottom: 25px;
            position: relative;
          }

          .input-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--label-color);
            font-size: 14px;
            transition: color 0.3s ease;
          }

          .input {
            width: 100%;
            padding: 15px 45px 15px 15px;
            background-color: var(--input-bg);
            border: 1px solid var(--input-border);
            border-radius: 10px;
            font-size: 15px;
            color: var(--text-color);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            outline: none;
          }

          .input:focus {
            border-color: var(--accent-color);
            box-shadow: 0 0 0 3px rgba(106, 130, 251, 0.25);
          }

          .input::placeholder {
            color: #777;
          }

          .input.error {
            border-color: var(--error-color);
            box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.25);
            animation: shake 0.3s ease-in-out;
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
          }

          .error-message {
            color: var(--error-color);
            font-size: 12px;
            margin-top: 8px;
            opacity: 0;
            max-height: 0;
            overflow: hidden;
            transition: opacity 0.3s ease, max-height 0.3s ease;
          }

          .has-error .error-message {
            opacity: 1;
            max-height: 50px;
          }

          .password-wrapper {
            position: relative;
          }

          .password-toggle {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(18px);
            background: none;
            border: none;
            color: var(--label-color);
            cursor: pointer;
            font-size: 16px;
            transition: color 0.2s ease;
            padding: 5px;
          }

          .password-toggle:hover {
            color: var(--accent-color);
          }

          .remember-forgot {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            font-size: 14px;
            color: var(--label-color);
          }

          .remember {
            display: flex;
            align-items: center;
          }

          .remember input {
            accent-color: var(--accent-color);
            margin-right: 8px;
          }

          .forgot-link {
            color: var(--accent-color);
            text-decoration: none;
            font-weight: 600;
            transition: color 0.2s;
          }

          .forgot-link:hover {
            color: var(--secondary-accent);
            text-decoration: underline;
          }

          .login-button {
            width: 100%;
            padding: 16px;
            background: linear-gradient(90deg, var(--accent-color), var(--secondary-accent));
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 1rem;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(106, 130, 251, 0.4);
          }

          .login-button:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(106, 130, 251, 0.6);
          }

          .login-button:disabled {
            background: #333;
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
          }

          .signup-link {
            text-align: center;
            margin-top: 25px;
            font-size: 14px;
            color: var(--label-color);
          }

          .signup-link a {
            color: var(--accent-color);
            text-decoration: none;
            font-weight: 600;
          }

          .signup-link a:hover {
            text-decoration: underline;
            color: var(--secondary-accent);
          }

          .status-message {
            text-align: center;
            margin-top: 20px;
            font-size: 16px;
            font-weight: 600;
            height: 20px;
            visibility: hidden;
            opacity: 0;
            transition: opacity 0.3s ease, color 0.3s ease;
          }

          .status-message.success {
            color: #4CAF50;
            visibility: visible;
            opacity: 1;
          }

          .status-message.error {
            color: var(--error-color);
            visibility: visible;
            opacity: 1;
          }

          @media (max-width: 480px) {
            .login-container {
              padding: 30px;
            }
            .logo h1 {
              font-size: 1.8rem;
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
            <FontAwesomeIcon icon={faUserCircle} className="logo-icon" />
            <h1>Login</h1>
          </div>

          <form onSubmit={handleSubmit} id="loginForm">
            <div className={`input-group ${usernameError ? 'has-error' : ''}`}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                autoComplete="username"
                value={username}
                onChange={handleInputChange(setUsername, setUsernameError, usernameRegex, 4, 16)}
                className={`input ${usernameError ? 'error' : ''}`}
              />
              <div id="username-error" className="error-message" aria-live="polite">
                Username must be 4-16 characters long.
              </div>
            </div>

            <div className={`input-group ${passwordError ? 'has-error' : ''}`}>
              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handleInputChange(setPassword, setPasswordError, passwordRegex, 8, 20)}
                  className={`input ${passwordError ? 'error' : ''}`}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
              <div id="password-error" className="error-message" aria-live="polite">
                Password must be 8-20 characters long and contain a number.
              </div>
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

            <div className={`status-message ${statusType}`}>
              {statusMessage}
            </div>

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