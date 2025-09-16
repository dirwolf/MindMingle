import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';


 

const Login = () => {

  const [formData, setFormData] = useState({

    email: '',

    password: ''

  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { login } = useAuth();


 

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


 

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError('');


 

    const result = await login(formData.email, formData.password);


 

    if (result.success) {

      navigate('/dashboard');

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

                  <h2 className="fw-bold text-primary">Welcome Back</h2>

                  <p className="text-muted">Sign in to your MindMingle account</p>

                </div>


 

                {error && (

                  <div className="alert alert-danger" role="alert">

                    {error}

                  </div>

                )}


 

                <form onSubmit={handleSubmit}>

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

                  <div className="mb-4">

                    <label htmlFor="password" className="form-label">Password</label>

                    <input

                      type="password"

                      className="form-control"

                      id="password"

                      name="password"

                      value={formData.password}

                      onChange={handleChange}

                      required

                    />

                  </div>


 

                  <button

                    type="submit"

                    className="btn btn-primary w-100 mb-3"

                    disabled={loading}

                  >

                    {loading ? 'Signing In...' : 'Sign In'}

                  </button>

                </form>


 

                <div className="text-center">

                  <p className="mb-0">

                    Don't have an account?{' '}

                    <Link to="/register" className="text-primary fw-bold">

                      Sign up here

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



 

export default Login;




 