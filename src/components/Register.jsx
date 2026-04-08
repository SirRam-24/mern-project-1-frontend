import React from 'react'
import '../styles/Reg.css'
import Nav from './Nav'


const Register = () => {
  return (
    <>
      <Nav session={false}/>
      <div className="reg-wrap">
        <div className="reg-card">
          <div className="reg-accent" />
          <div className="reg-accent2" />

        
          <div className="reg-logo">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L17 6V14L10 18L3 14V6L10 2Z" fill="white" opacity="0.9" />
              <circle cx="10" cy="10" r="3" fill="#534AB7" />
            </svg>
          </div>

          <h1 className="reg-title">Create account</h1>
          <p className="reg-sub">Join us — it only takes a minute.</p>

          
          

         
          <div className="divider">
            <div className="divider-line" />
            <span>or continue with email</span>
            <div className="divider-line" />
          </div>

          {/* Fields */}
          <div className="field-group">
            <div className="field">
              <label className="field-label">Username</label>
              <div className="field-inner">
                <span className="field-icon">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="7.5" cy="5" r="3" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1 13c0-3.31 2.91-6 6.5-6s6.5 2.69 6.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
                <input type="text" placeholder="johndoe" />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Email</label>
              <div className="field-inner">
                <span className="field-icon">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <rect x="1" y="3" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1 5l6.5 4.5L14 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
                <input type="email" placeholder="john@email.com" />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Password</label>
              <div className="field-inner">
                <span className="field-icon">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <rect x="3" y="6.5" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 6.5V4.5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </span>
                <input type="password" placeholder="Min. 8 characters" />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button className="reg-btn">
           
            Create account
          </button>

          <p className="reg-footer">
            Already have an account? <a href="#">Sign in</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Register