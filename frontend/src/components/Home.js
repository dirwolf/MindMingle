import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Hero Section */}
      <div
        className="py-5"
        style={{
          backgroundColor: '#ffffff',
        }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-12 col-md-8 col-lg-6 text-center">
              <h1 className="display-4 fw-bold mb-4" style={{ color: '#333333' }}>
                Welcome to <span style={{ color: 'var(--primary-teal-dark)' }}>MindMingle</span>
              </h1>
              <p className="lead mb-4" style={{ color: '#666666' }}>
                Your personal companion for mindfulness, mood management, and peer
                support. Discover exercises that reduce stress and nurture inner peace.
              </p>
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                <Link
                  to="/register"
                  className="btn btn-lg px-4 shadow-sm"
                  style={{ 
                  background: 'linear-gradient(90deg, var(--secondary-teal) 0%, var(--primary-teal-dark) 50%, var(--primary-teal) 100%)',
                    
                    color: '#ffffff',
                    border: 'none'
                  }}
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="btn btn-outline-primary btn-lg px-4"
                  style={{ 
                    borderColor: 'var(--primary-teal-dark)', 
                    color: 'var(--primary-teal-dark)'
                  }}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
            <h2 className="text-center mb-5 fw-bold" style={{ color: '#333333' }}>
            Why Choose MindMingle?
          </h2>
            <p className="text-center mb-5 lead" style={{ color: '#666666' }}>
              Discover powerful tools designed to transform your mental well-being
            </p>
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-4 mb-4">
              <div
                className="card h-100 shadow-lg border-0 rounded-4"
                style={{
                  background: 'linear-gradient(90deg, var(--secondary-teal) 0%, var(--primary-teal-dark) 50%, var(--primary-teal) 100%)',
                 
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                }}
              >
                <div className="card-body text-center p-4">
                  <div className="display-4 mb-3" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🧘</div>
                    <h5 className="card-title fw-bold" style={{ color: '#ffffff' }}>
                    Mindfulness Exercises
                  </h5>
                    <p className="card-text" style={{ color: '#ffffff' }}>
                    Access calming exercises designed to reduce stress and enhance
                    emotional well-being.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 mb-4">
              <div
                className="card h-100 shadow-lg border-0 rounded-4"
                style={{
                  background: 'linear-gradient(90deg, var(--secondary-teal) 0%, var(--primary-teal-dark) 50%, var(--primary-teal) 100%)',
                 
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                }}
              >
                <div className="card-body text-center p-4">
                  <div className="display-4 mb-3" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>📊</div>
                  <h5 className="card-title fw-bold" style={{ color: '#ffffff' }}>
                    Mood Tracking
                  </h5>
                  <p className="card-text" style={{ color: '#ffffff' }}>
                    Track your emotions daily and visualize trends with intuitive
                    mood graphs.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-4 mb-4">
              <div
                className="card h-100 shadow-lg border-0 rounded-4"
                style={{
                  background: 'linear-gradient(90deg, var(--secondary-teal) 0%, var(--primary-teal-dark) 50%, var(--primary-teal) 100%)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.075)';
                }}
              >
                <div className="card-body text-center p-4">
                  <div className="display-4 mb-3" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>🤝</div>
                  <h5 className="card-title fw-bold" style={{ color: '#ffffff' }}>
                    Peer Support
                  </h5>
                  <p className="card-text" style={{ color: '#ffffff' }}>
                    Connect anonymously with others, share experiences, and receive
                    encouragement from the community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <h2 className="fw-bold mb-5" style={{ color: '#333333' }}>
                Trusted by Thousands Worldwide
              </h2>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <div className="text-center">
                <div className="display-4 fw-bold mb-2" style={{ color: 'var(--primary-teal-dark)' }}>
                  15,000+
                </div>
                <div className="h6 text-muted">Active Users</div>
                <div className="small text-success">↗ 25% this month</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center">
                <div className="display-4 fw-bold mb-2" style={{ color: 'var(--secondary-teal)' }}>
                  2.5M+
                </div>
                <div className="h6 text-muted">Mood Entries</div>
                <div className="small text-success">↗ 40% this month</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center">
                <div className="display-4 fw-bold mb-2" style={{ color: 'var(--primary-teal)' }}>
                  89%
                </div>
                <div className="h6 text-muted">Success Rate</div>
                <div className="small text-success">↗ 12% this month</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center">
                <div className="display-4 fw-bold mb-2" style={{ color: 'var(--primary-teal-dark)' }}>
                  50+
                </div>
                <div className="h6 text-muted">Countries</div>
                <div className="small text-success">↗ 3 new this month</div>
              </div>
            </div>
          </div>
          
          {/* Testimonial Cards */}
          <div className="row mt-5">
            <div className="col-12">
              <h3 className="text-center fw-bold mb-4" style={{ color: '#333333' }}>
                What Our Community Says
              </h3>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <span className="text-warning">⭐⭐⭐⭐⭐</span>
                  </div>
                  <p className="card-text fst-italic">
                    "MindMingle helped me understand my emotions better. The mood tracking feature is incredible!"
                  </p>
                  <div className="mt-3">
                    <strong style={{ color: 'var(--primary-teal-dark)' }}>Sarah M.</strong>
                    <div className="small text-muted">User since 2023</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <span className="text-warning">⭐⭐⭐⭐⭐</span>
                  </div>
                  <p className="card-text fst-italic">
                    "The peer support community is amazing. I've made real connections and found hope."
                  </p>
                  <div className="mt-3">
                    <strong style={{ color: 'var(--primary-teal-dark)' }}>Alex K.</strong>
                    <div className="small text-muted">User since 2022</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <span className="text-warning">⭐⭐⭐⭐⭐</span>
                  </div>
                  <p className="card-text fst-italic">
                    "The mindfulness exercises are perfect for my daily routine. Highly recommend!"
                  </p>
                  <div className="mt-3">
                    <strong style={{ color: 'var(--primary-teal-dark)' }}>Maria L.</strong>
                    <div className="small text-muted">User since 2024</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="py-5" style={{background: 'linear-gradient(90deg, var(--secondary-teal) 0%, var(--primary-teal-dark) 50%, var(--primary-teal) 100%)',
 }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <h2 className="text-white fw-bold mb-4">
                Why 15,000+ People Choose MindMingle
              </h2>
              <div className="row text-white">
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="text-white fw-bold">✓</span>
                      </div>
                    </div>
                    <div>
                      <div className="fw-bold">Free Forever</div>
                      <small className="text-light">No hidden costs</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="text-white fw-bold">✓</span>
                      </div>
                    </div>
                    <div>
                      <div className="fw-bold">Privacy First</div>
                      <small className="text-light">Anonymous & secure</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="text-white fw-bold">✓</span>
                      </div>
                    </div>
                    <div>
                      <div className="fw-bold">Instant Access</div>
                      <small className="text-light">Start immediately</small>
                    </div>
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <div className="bg-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="text-white fw-bold">✓</span>
                      </div>
                    </div>
                    <div>
                      <div className="fw-bold">Expert Backed</div>
                      <small className="text-light">Therapist approved</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 text-center mt-4 mt-lg-0">
              <div className="bg-white rounded-4 p-4 shadow-lg">
                <h4 className="text-dark fw-bold mb-3">Start Your Journey Today</h4>
                <p className="text-muted mb-4">Join thousands who have transformed their mental well-being</p>
                <div className="d-grid gap-2">
          <Link
            to="/register"
                    className="btn btn-lg fw-bold"
                     style={{ 
                  background: 'linear-gradient(90deg, var(--secondary-teal) 0%, var(--primary-teal-dark) 50%, var(--primary-teal) 100%)',
                       
                       color: '#FFFFFF',
                       border: 'none',
                       borderRadius: '12px'
                     }}
                  >
                    Create Free Account
          </Link>
                  <small className="text-muted">No credit card required • Takes 30 seconds</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}

      <Footer />
    </div>
  );
};

export default Home;
