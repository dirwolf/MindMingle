
 

import React from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';


 

const ProtectedRoute = ({ children }) => {

  const { user, loading } = useAuth();

  console.log("Protected",user,"loading",loading);


 

  if (loading) {

    return (

      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>

        <div className="text-center">

          <div className="spinner-border text-primary" role="status">

            <span className="visually-hidden">Loading...</span>

          </div>

          <p className="mt-3">Loading...</p>

        </div>

      </div>

    );

  }


 

  if (!user) {

    return <Navigate to="/login" replace />;

  }


 

  return children;

};


 

export default ProtectedRoute;


 