
 

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import API from "../services/api";


 

const Exercises = () => {

  const [exercises, setExercises] = useState([]);

  const [filteredExercises, setFilteredExercises] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('all');


 

  const categories = ['all', 'breathing', 'meditation', 'movement'];


 

  useEffect(() => {

    fetchExercises();

  }, []);


 

  useEffect(() => {

    filterExercises();

  }, [exercises, searchTerm, selectedCategory]);


 

  const fetchExercises = async () => {

    try {

      setLoading(true);

      const response = await API.get('/api/exercises');

      setExercises(response.data);

      setError('');

    } catch (err) {

      setError('Failed to fetch exercises. Please try again.');

      console.error('Error fetching exercises:', err);

    } finally {

      setLoading(false);

    }

  };


 

  const filterExercises = () => {

    let filtered = exercises;


 

    // Filter by category

    if (selectedCategory !== 'all') {

      filtered = filtered.filter(exercise => exercise.category === selectedCategory);

    }


 

    // Filter by search term

    if (searchTerm) {

      filtered = filtered.filter(exercise =>

        exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||

        exercise.description.toLowerCase().includes(searchTerm.toLowerCase())

      );

    }


 

    setFilteredExercises(filtered);

  };


 

  const getCategoryIcon = (category) => {

    const icons = {

      breathing: '🫁',

      meditation: '🧘‍♀️',

      movement: '🚶‍♀️'

    };

    return icons[category] || '🧠';

  };


 

  const getCategoryColor = (category) => {

    const colors = {

      breathing: 'primary',

      meditation: 'success',

      movement: 'warning'

    };

    return colors[category] || 'secondary';

  };


 

  if (loading) {

    return (

      <div className="bg-light d-flex align-items-center justify-content-center" style={{minHeight: 'calc(100vh - 80px)', paddingTop: '80px'}}>

        <div className="text-center">

          <div className="spinner-border text-primary" role="status">

            <span className="visually-hidden">Loading...</span>

          </div>

          <p className="mt-3">Loading mindfulness exercises...</p>

        </div>

      </div>

    );

  }


 

  if (error) {

    return (

      <div className="bg-light d-flex align-items-center justify-content-center" style={{minHeight: 'calc(100vh - 80px)', paddingTop: '80px'}}>

        <div className="text-center">

          <div className="alert alert-danger" role="alert">

            {error}

          </div>

          <button className="btn btn-primary" onClick={fetchExercises}>

            Try Again

          </button>

        </div>

      </div>

    );

  }


 

  return (

    <div className="bg-light py-5" style={{minHeight: 'calc(100vh - 80px)', paddingTop: '80px'}}>

      <div className="container">

        {/* Header */}

        <div className="text-center mb-5">

          <h1 className="display-4 fw-bold text-primary mb-3">

            Mindfulness Exercises

          </h1>

          <p className="lead text-muted">

            Discover powerful exercises to reduce stress and cultivate inner peace

          </p>

        </div>


 

        {/* Search and Filter */}

        <div className="row mb-4">

          <div className="col-12 col-md-6 mb-3">

            <input

              type="text"

              className="form-control"

              placeholder="Search exercises..."

              value={searchTerm}

              onChange={(e) => setSearchTerm(e.target.value)}

            />

          </div>

          <div className="col-12 col-md-6 mb-3">

            <select

              className="form-select"

              value={selectedCategory}

              onChange={(e) => setSelectedCategory(e.target.value)}

            >

              {categories.map(category => (

                <option key={category} value={category}>

                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}

                </option>

              ))}

            </select>

          </div>

        </div>


 

        {/* Results Count */}

        <div className="mb-4">

          <p className="text-muted">

            Showing {filteredExercises.length} of {exercises.length} exercises

          </p>

        </div>


 

        {/* Exercises Grid */}

        {filteredExercises.length === 0 ? (

          <div className="text-center py-5">

            <div className="display-1 text-muted mb-3">🔍</div>

            <h3>No exercises found</h3>

            <p className="text-muted">

              Try adjusting your search terms or category filter

            </p>

          </div>

        ) : (

          <div className="row">

            {filteredExercises.map((exercise,index) => (

              <div key={exercise.id ||index} className="col-12 col-sm-6 col-lg-4 mb-4">

                <div className="card h-100">

                  <img

                    src={exercise.image}

                    className="card-img-top"

                    alt={exercise.title}

                    style={{ height: '200px', objectFit: 'cover' }}

                  />

                  <div className="card-body">

                    <div className="d-flex align-items-center mb-3">

                      <div className="display-6 me-3">

                        {getCategoryIcon(exercise.category)}

                      </div>

                      <div>

                        <span className={`badge bg-${getCategoryColor(exercise.category)}`}>

                          {exercise.category}

                        </span>

                        <div className="text-muted small">

                          {exercise.duration}

                        </div>

                      </div>

                    </div>

                   

                    <h5 className="card-title">

                      {exercise.title}

                    </h5>

                   

                    <p className="card-text text-muted mb-4">

                      {exercise.description}

                    </p>

                   

                    <Link

                      to={`/exercises/${exercise._id}`}

                      className="btn btn-outline-primary w-100"

                    >

                      Start Exercise

                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

};


 

export default Exercises;




 