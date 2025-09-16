
 

// import React from 'react';

// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';

// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import './App.css';


 

// // Context

// import { AuthProvider, useAuth } from './context/AuthContext';


 

// // Components

// import Navbar from './components/NavBar';

// import Home from './components/Home';

// import Login from './components/Login';

// import Register from './components/Register';

// import ProtectedRoute from './components/ProtectedRoute';

// import Exercises from './components/Exercises';

// import ExerciseDetail from './components/ExerciseDetail';

// import Dashboard from './components/Dashboard';

// import MoodTracker from './components/MoodTracker';

// import MoodHistory from './components/MoodHistory';


 

// // App Routes Component

// function AppRoutes()  {

//   const { user } = useAuth();


 

//   return (

//     <Routes>

//       <Route path="/" element={<Home />} />

//       <Route path="/register" element={user ? <Navigate to="/dashboard" replace /> : <Register />} />

//       <Route path="/login" element={user?<Navigate to="/dashboard" replace/>: <Login />} />

//       <Route path="/dashboard" element={

//         <ProtectedRoute>

//           <Dashboard />

//         </ProtectedRoute>

//       } />

//       <Route path="/exercises" element={

//         <ProtectedRoute>

//           <Exercises/>

//         </ProtectedRoute>


 

//       }/>

//             <Route path="/exercises/:id" element={

//         <ProtectedRoute>

//           <ExerciseDetail/>

//         </ProtectedRoute>


 

//       }/>

//             <Route path="/mood-tracker" element={

//         <ProtectedRoute>

//           <MoodTracker/>

//         </ProtectedRoute>


 

//       }/>

//             <Route path="/mood-history" element={

//         <ProtectedRoute>

//           <MoodHistory/>

//         </ProtectedRoute>


 

//       }/>






 

//     </Routes>

//   );

// };


 

// function App() {

//   return (

//     <AuthProvider>

//       <Router>

//         <div className="App">

//           <Navbar />

//           <main className="container-fluid p-0">

//             <AppRoutes />

//           </main>

//         </div>

//       </Router>

//     </AuthProvider>

//   );

// }


 

// export default App;

import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';



 

// Context

import { AuthProvider, useAuth } from './context/AuthContext';

import { AnonymousProvider } from './context/AnonymousContext';



 

// Components

import Navbar from './components/NavBar';

import Home from './components/Home';

import Login from './components/Login';

import Register from './components/Register';

import Exercises from './components/Exercises';

import ExerciseDetail from './components/ExerciseDetail';

import Dashboard from './components/Dashboard';

import MoodTracker from './components/MoodTracker';

import MoodHistory from './components/MoodHistory';

import AnonymousSupport from './components/AnonymousSupport';

import Goals from "./components/Setgoals";


 

// Protected Route Component


 

function ProtectedRoute({ children }) {

  const { isAuthenticated, loading } = useAuth();

  if (loading) {

    return (

      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 80px)' }}>

        <div className="spinner-border text-primary" role="status">

          <span className="visually-hidden">Loading...</span>

        </div>

      </div>

    );

  }


 

  if (!isAuthenticated) {

    return <Navigate to="/login" replace />;

  }

  return children;

}


 

// App Routes Component


 

const AppRoutes = () => {


 

  const { isAuthenticated } = useAuth();


 

  return (

    <Routes>

      <Route

        path="/"

        element={

          (() => {
            console.log('Home route check - isAuthenticated:', isAuthenticated);
            return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />
          })()

        }

      />


 

      <Route

        path="/login"

        element={

          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />

        }

      />


 

      <Route path="/register" element={<Register />} />


 

      <Route

        path="/exercises"

        element={

          <ProtectedRoute>

            <Exercises />

          </ProtectedRoute>

        }

      />


 

      <Route

        path="/exercises/:id"

        element={

          <ProtectedRoute>

            <ExerciseDetail />

          </ProtectedRoute>

        }

      />


 

      <Route

        path="/dashboard"

        element={

          <ProtectedRoute>

            <Dashboard />

          </ProtectedRoute>

        }

      />


 

      <Route

        path="/mood-tracker"

        element={

          <ProtectedRoute>

            <MoodTracker />

          </ProtectedRoute>

        }

      />


 

      <Route

        path="/mood-history"

        element={

          <ProtectedRoute>

            <MoodHistory />

          </ProtectedRoute>

        }

      />


 

      <Route

        path="/anonymous-support"

        element={

          <ProtectedRoute>

            <AnonymousSupport />

          </ProtectedRoute>

        }

      />

      <Route

      path="/goals"

      element={

        <ProtectedRoute>

          <Goals/>

        </ProtectedRoute>

      }/>

    </Routes>

   

  );

};



 

function App() {

  return (

    <AuthProvider>

      <AnonymousProvider>

        <Router>

          <div className="App">

            <Navbar />

            <main className="container-fluid p-0">

              <AppRoutes />

            </main>

          </div>

        </Router>

      </AnonymousProvider>

    </AuthProvider>

  );

}


 

export default App;