import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <footer 
      className="text-white py-5 mt-5" 
      style={{ 
        background: 'linear-gradient(90deg, var(--secondary-teal) 0%, var(--primary-teal-dark) 50%, var(--primary-teal) 100%)',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        <div className="row">
          {/* Brand Section */}
          <div className="col-12 col-lg-4 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-3">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  backgroundColor: 'var(--primary-teal-light)',
                  color: 'var(--primary-teal-dark)'
                }}
              >
                <span className="fw-bold fs-4">M</span>
              </div>
              <h4 className="fw-bold mb-0">MindMingle</h4>
            </div>
            <p className="mb-4 fw-bold" style={{ color: '#ffffff', opacity: 0.9 }}>
              Your personal companion for mindfulness, mood management, and peer support. 
              Building healthier habits through awareness and community.
            </p>
            <div className="d-flex gap-3">
              <a 
                href="#" 
                className="text-white text-decoration-none"
                style={{ fontSize: '1.5rem' }}
                title="Facebook"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a 
                href="#" 
                className="text-white text-decoration-none"
                style={{ fontSize: '1.5rem' }}
                title="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="#" 
                className="text-white text-decoration-none"
                style={{ fontSize: '1.5rem' }}
                title="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="#" 
                className="text-white text-decoration-none"
                style={{ fontSize: '1.5rem' }}
                title="LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-6 col-md-4 col-lg-3 mb-4 mb-md-0">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ 
              color: '#ffffff', 
              fontSize: '1.1rem',
              letterSpacing: '1px',
              borderBottom: '2px solid rgba(255,255,255,0.3)',
              paddingBottom: '8px',
              display: 'inline-block'
            }}>Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link 
                  to="/" 
                  className="text-decoration-none fw-bold" 
                  style={{ 
                    color: '#ffffff', 
                    opacity: 0.9,
                    transition: 'all 0.3s ease',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '0.9';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/exercises" 
                  className="text-decoration-none fw-bold" 
                  style={{ 
                    color: '#ffffff', 
                    opacity: 0.9,
                    transition: 'all 0.3s ease',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '0.9';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  Exercises
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/mood-tracker" 
                  className="text-decoration-none fw-bold" 
                  style={{ 
                    color: '#ffffff', 
                    opacity: 0.9,
                    transition: 'all 0.3s ease',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '0.9';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  Mood Tracker
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  to="/anonymous-support" 
                  className="text-decoration-none fw-bold" 
                  style={{ 
                    color: '#ffffff', 
                    opacity: 0.9,
                    transition: 'all 0.3s ease',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.opacity = '1';
                    e.target.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.opacity = '0.9';
                    e.target.style.transform = 'translateX(0)';
                  }}
                >
                  Peer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-12 col-md-8 col-lg-5">
            <h6 className="fw-bold mb-3 text-uppercase" style={{ 
              color: '#ffffff', 
              fontSize: '1.1rem',
              letterSpacing: '1px',
              borderBottom: '2px solid rgba(255,255,255,0.3)',
              paddingBottom: '8px',
              display: 'inline-block'
            }}>Support & Contact</h6>
            <div className="mb-3">
              <div 
                className="d-flex align-items-center mb-2" 
                style={{ 
                  transition: 'all 0.3s ease',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <i className="fas fa-envelope me-2" style={{ color: '#ffffff' }}></i>
                <span className="fw-bold" style={{ color: '#ffffff', opacity: 0.9 }}>
                  support@mindmingle.com
                </span>
              </div>
              <div 
                className="d-flex align-items-center mb-2" 
                style={{ 
                  transition: 'all 0.3s ease',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <i className="fas fa-phone me-2" style={{ color: '#ffffff' }}></i>
                <span className="fw-bold" style={{ color: '#ffffff', opacity: 0.9 }}>
                  +1 (555) 123-4567
                </span>
              </div>
              <div 
                className="d-flex align-items-center" 
                style={{ 
                  transition: 'all 0.3s ease',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <i className="fas fa-map-marker-alt me-2" style={{ color: '#ffffff' }}></i>
                <span className="fw-bold" style={{ color: '#ffffff', opacity: 0.9 }}>
                  San Francisco, CA
                </span>
              </div>
            </div>
            <div className="mt-4">
              <h6 className="fw-bold mb-2 text-uppercase" style={{ 
                color: '#ffffff', 
                fontSize: '1rem',
                letterSpacing: '1px',
                borderBottom: '2px solid rgba(255,255,255,0.3)',
                paddingBottom: '6px',
                display: 'inline-block'
              }}>Newsletter</h6>
              <p className="small mb-3 fw-bold" style={{ color: '#ffffff', opacity: 0.9 }}>
                Get mindfulness tips and updates delivered to your inbox.
              </p>
              <div className="input-group">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                  style={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'white'
                  }}
                />
                <button 
                  className="btn" 
                  style={{ 
                    backgroundColor: 'var(--primary-teal-light)', 
                    color: 'var(--primary-teal-dark)',
                    border: 'none'
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className="my-4" style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
        <div className="row align-items-center">
          <div className="col-12 col-md-6">
            <p className="mb-0 fw-bold" style={{ color: '#ffffff', opacity: 0.9 }}>
              © 2024 MindMingle. All rights reserved.
            </p>
          </div>
          <div className="col-12 col-md-6 text-md-end mt-2 mt-md-0">
            <div className="d-flex flex-wrap justify-content-md-end gap-3">
              <button 
                className="btn btn-link text-decoration-none small p-0 border-0 bg-transparent fw-bold" 
                style={{ 
                  color: '#ffffff', 
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}
                onClick={() => setShowPrivacyModal(true)}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '1';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '0.9';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Privacy Policy
              </button>
              <button 
                className="btn btn-link text-decoration-none small p-0 border-0 bg-transparent fw-bold" 
                style={{ 
                  color: '#ffffff', 
                  opacity: 0.9,
                  transition: 'all 0.3s ease',
                  padding: '4px 8px',
                  borderRadius: '4px'
                }}
                onClick={() => setShowTermsModal(true)}
                onMouseEnter={(e) => {
                  e.target.style.opacity = '1';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.opacity = '0.9';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      <Modal 
        show={showPrivacyModal} 
        onHide={() => setShowPrivacyModal(false)} 
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>🔒 Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <div className="privacy-content">
            <h6 className="fw-bold mb-3">Last Updated: December 2024</h6>
            
            <h6 className="fw-bold mb-2">1. Information We Collect</h6>
            <p className="mb-3">
              We collect information you provide directly to us, such as when you create an account, 
              use our mood tracking features, or participate in our peer support community. This may include:
            </p>
            <ul className="mb-3">
              <li>Account information (email, username)</li>
              <li>Mood entries and wellness data</li>
              <li>Exercise preferences and progress</li>
              <li>Anonymous chat interactions</li>
            </ul>

            <h6 className="fw-bold mb-2">2. How We Use Your Information</h6>
            <p className="mb-3">
              We use the information we collect to:
            </p>
            <ul className="mb-3">
              <li>Provide and improve our mindfulness services</li>
              <li>Personalize your experience</li>
              <li>Enable anonymous peer support features</li>
              <li>Send you reminders and wellness tips</li>
              <li>Analyze usage patterns to enhance our platform</li>
            </ul>

            <h6 className="fw-bold mb-2">3. Data Security</h6>
            <p className="mb-3">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. All data is encrypted in 
              transit and at rest.
            </p>

            <h6 className="fw-bold mb-2">4. Your Rights</h6>
            <p className="mb-3">
              You have the right to access, update, or delete your personal information. You can also 
              opt out of certain communications and data processing activities.
            </p>

            <h6 className="fw-bold mb-2">5. Contact Us</h6>
            <p className="mb-0">
              If you have any questions about this Privacy Policy, please contact us at 
              <strong> privacy@mindmingle.com</strong>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrivacyModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Terms of Service Modal */}
      <Modal 
        show={showTermsModal} 
        onHide={() => setShowTermsModal(false)} 
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>📋 Terms of Service</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <div className="terms-content">
            <h6 className="fw-bold mb-3">Last Updated: December 2024</h6>
            
            <h6 className="fw-bold mb-2">1. Acceptance of Terms</h6>
            <p className="mb-3">
              By accessing and using MindMingle, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please do not 
              use this service.
            </p>

            <h6 className="fw-bold mb-2">2. Use License</h6>
            <p className="mb-3">
              Permission is granted to temporarily use MindMingle for personal, non-commercial 
              transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="mb-3">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>

            <h6 className="fw-bold mb-2">3. User Responsibilities</h6>
            <p className="mb-3">
              As a user of MindMingle, you agree to:
            </p>
            <ul className="mb-3">
              <li>Provide accurate and truthful information</li>
              <li>Use the service in a respectful and appropriate manner</li>
              <li>Not share harmful or inappropriate content in peer support</li>
              <li>Respect the privacy and anonymity of other users</li>
            </ul>

            <h6 className="fw-bold mb-2">4. Disclaimer</h6>
            <p className="mb-3">
              The materials on MindMingle are provided on an 'as is' basis. MindMingle makes no 
              warranties, expressed or implied, and hereby disclaims and negates all other warranties 
              including without limitation, implied warranties or conditions of merchantability, 
              fitness for a particular purpose, or non-infringement of intellectual property or 
              other violation of rights.
            </p>

            <h6 className="fw-bold mb-2">5. Limitations</h6>
            <p className="mb-3">
              In no event shall MindMingle or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on MindMingle.
            </p>

            <h6 className="fw-bold mb-2">6. Contact Information</h6>
            <p className="mb-0">
              If you have any questions about these Terms of Service, please contact us at 
              <strong> legal@mindmingle.com</strong>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTermsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
};

export default Footer;
