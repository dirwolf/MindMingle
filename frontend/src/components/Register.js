
 

import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';



 

const Register = () => {

  const [formData, setFormData] = useState({

    username: '',

    email: '',

    password: '',

    confirmPassword: '',

    tags: []

  });


 

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const { register } = useAuth();

  const availableTags = ['stress', 'anxiety', 'depression', 'productivity', 'relationships', 'work', 'health', 'family', 'school', 'general'];



 

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


 

  const handleTagToggle = (tag) => {

    setFormData(prev => ({

      ...prev,

      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]

    }));

  };


 

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError('');

    setSuccess('');


 

    // Validate passwords match

    if (formData.password !== formData.confirmPassword) {

      setError('Passwords do not match');

      setLoading(false);

      return;

    }


 

    // Validate password length

    if (formData.password.length < 6) {

      setError('Password must be at least 6 characters long');

      setLoading(false);

      return;

    }


 

    const result = await register(formData.username, formData.email, formData.password, formData.tags);

    console.log("here is result from  backend register : ", result);

    if (result.success) {

         console.log("here is result from  backend register in frontend : ", result);

      setSuccess('Account created successfully! Redirecting to login...');

      // Redirect to login page after a short delay

      setTimeout(() => {

        navigate('/login');

      }, 1400);

    } else {

      setError(result.error);

    }


 

    setLoading(false);

  };


 

  return (

    <div className="bg-light py-5" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-12 col-md-6 col-lg-4">

            <div className="card shadow">

              <div className="card-body p-4">

                <div className="text-center mb-4">

                  <h2 className="fw-bold text-primary">Join MindMingle</h2>

                  <p className="text-muted">Create your account to get started</p>

                </div>


 

                {error && (

                  <div className="alert alert-danger" role="alert">

                    {error}

                  </div>

                )}


 

                {success && (

                  <div className="alert alert-success" role="alert">

                    {success}

                  </div>

                )}


 

                <form onSubmit={handleSubmit} style={{ opacity: success ? 0.6 : 1 }}>

                  <div className="mb-3">

                    <label htmlFor="username" className="form-label">Username</label>

                    <input

                      type="text"

                      className="form-control"

                      id="username"

                      name="username"

                      value={formData.username}

                      onChange={handleChange}

                      required

                    />

                  </div>


 

                  <div className="mb-3">

                    <label htmlFor="email" className="form-label">Email</label>

                    <input

                      type="email"

                      className="form-control"

                      id="email"

                      name="email"

                      value={formData.email}

                      onChange={handleChange}

                      required

                    />

                  </div>


 

                  <div className="mb-3">

                    <label htmlFor="password" className="form-label">Password</label>

                    <input

                      type="password"

                      className="form-control"

                      id="password"

                      name="password"

                      value={formData.password}

                      onChange={handleChange}

                      required

                      minLength="6"

                    />

                  </div>


 

                  <div className="mb-4">

                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>

                    <input

                      type="password"

                      className="form-control"

                      id="confirmPassword"

                      name="confirmPassword"

                      value={formData.confirmPassword}

                      onChange={handleChange}

                      required

                    />

                  </div>


 

                  <div className="mb-3">

                    <label className="form-label">Select topics you're comfortable discussing</label>

                    <div className="d-flex flex-wrap gap-2">

                      {availableTags.map(tag => (

                        <div key={tag} className="form-check me-3">

                          <input

                            className="form-check-input"

                            type="checkbox"

                            id={`tag-${tag}`}

                            checked={formData.tags.includes(tag)}

                            onChange={() => handleTagToggle(tag)}

                          />

                          <label className="form-check-label" htmlFor={`tag-${tag}`}>

                            {tag}

                          </label>

                        </div>

                      ))}

                    </div>

                  </div>


 

                  <button

                    type="submit"

                    className="btn btn-primary w-100 mb-3"

                    disabled={loading || success}

                  >

                    {loading ? 'Creating Account...' : success ? 'Account Created!' : 'Create Account'}

                  </button>

                </form>


 

                <div className="text-center">

                  <p className="mb-0">

                    Already have an account?{' '}

                    <Link to="/login" className="text-primary fw-bold">

                      Sign in here

                    </Link>

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );


 

};





 

export default Register; 





