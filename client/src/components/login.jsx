import React from 'react';
import './login.css'; 

const LoginPage = () => {
  const styles = {
    input: {
      transition: 'border-color 0.3s ease',
    },
    button: {
      transition: 'background-color 0.3s ease',
    },
    link: {
      color: 'black',
      textDecoration: 'none',
      fontSize: '14px',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <div className="container-fluid p-0 height-main">
      <div className="row h-100 g-0">
        {/* Header for small screens */}
        <div className="col-12 d-lg-none bg-dark text-white" style={{ height: '70px' }}>
          <div className="d-flex align-items-center justify-content-center" style={{ height: '70px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-1">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="fw-bold fs-6">AnonyChat</span>
          </div>
        </div>

        {/* Left side with chat app design */}
        <div className="col-lg-6 bg-dark d-none d-lg-flex align-items-center justify-content-center position-relative">
          <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <div className="position-absolute text-white fw-bold fs-4 text-center">
            AnonyChat
          </div>
        </div>

        {/* Right side with login form */}
        <div className="col-lg-6 bg-white d-flex align-items-center justify-content-center">
          <div className="w-100 p-4 border  rounded-3 shadow mx-3 mx-sm-auto" style={{ maxWidth: '420px' }}>
            <h2 className="text-center mb-4 fw-bold text-dark fs-4">Sign in</h2>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Private Token"
                  style={styles.input}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control form-control-sm"
                  placeholder="Password"
                  style={styles.input}
                  required
                />
              </div>
              <div className="d-flex justify-content-between mb-3">
                <a 
                  href="/forgot-password" 
                  className="text-decoration-none text-dark"
                  style={styles.link}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Forgot password?
                </a>
                <a 
                  href="/register" 
                  className="text-decoration-none text-dark"
                  style={styles.link}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Register
                </a>
              </div>
              <button 
                type="submit" 
                className="btn btn-dark btn-sm w-100 text-lowercase"
                style={styles.button}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#333'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'black'}
              >
                sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
