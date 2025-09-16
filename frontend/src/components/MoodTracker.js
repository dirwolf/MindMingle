import React, { useState } from 'react';

import API from "../services/api";

import { useAuth } from '../context/AuthContext';


 

const MoodTracker = () => {

  const { user, token } = useAuth();

  const [formData, setFormData] = useState({

    mood: '',

    intensity: 5,

    notes: ''

  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState('');


 

  const moods = [

    { value: 'very-happy', label: 'Very Happy', emoji: '😄' },

    { value: 'happy', label: 'Happy', emoji: '😊' },

    { value: 'neutral', label: 'Neutral', emoji: '😐' },

    { value: 'sad', label: 'Sad', emoji: '😢' },

    { value: 'very-sad', label: 'Very Sad', emoji: '😭' },

    { value: 'anxious', label: 'Anxious', emoji: '😰' },

    { value: 'angry', label: 'Angry', emoji: '😠' },

    { value: 'calm', label: 'Calm', emoji: '😌' }

  ];


 

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


 

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setMessage('');


 

    try {

      await API.post('/api/moodentry', {

        userId: user.id,

        mood: formData.mood,

        intensity: parseInt(formData.intensity),

        notes: formData.notes,

        timestamp: new Date().toISOString(),

        createdAt: new Date().toISOString()

      });


 

      setMessage('Mood logged successfully!');

      setFormData({

        mood: '',

        intensity: 5,

        notes: ''

      });

      setTimeout(() => {

        setMessage("");

      }, 1500);


 

    } catch (error) {

      setMessage('Failed to log mood. Please try again.');

      console.error('Error logging mood:', error);

    } finally {

      setLoading(false);

    }

  };


 

  return (

    <div className="bg-light py-5" style={{minHeight: 'calc(100vh - 80px)', paddingTop: '80px'}}>

      <div className="container">

        <div className="row justify-content-center">

          <div className="col-12 col-md-8 col-lg-6">

            <div className="card shadow">

              <div className="card-body">

                <h2 className="fw-bold text-primary mb-4 text-center">Track Your Mood</h2>

                <p className="text-muted text-center mb-4">

                  How are you feeling right now? Log your mood to track patterns over time.

                </p>

               {message && (

                  <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>

                    {message}

                  </div>

                )}


 

                <form onSubmit={handleSubmit}>

                  <div className="mb-4">

                    <label className="form-label fw-bold">Select your mood:</label>

                    <div className="row">

                      {moods.map(mood => (

                        <div key={mood.value} className="col-6 col-sm-4 col-lg-3 mb-3">

                          <div className="form-check">

                            <input

                              className="form-check-input"

                              type="radio"

                              name="mood"

                              id={mood.value}

                              value={mood.value}

                              checked={formData.mood === mood.value}

                              onChange={handleChange}

                              required

                            />

                            <label className="form-check-label text-center" htmlFor={mood.value}>

                              <div className="fs-3 mb-1">{mood.emoji}</div>

                              <small>{mood.label}</small>

                            </label>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>


 

                  <div className="mb-4">

                    <label htmlFor="intensity" className="form-label fw-bold">

                      Intensity: {formData.intensity}/10

                    </label>

                    <input

                      type="range"

                      className="form-range"

                      id="intensity"

                      name="intensity"

                      min="1"

                      max="10"

                      value={formData.intensity}

                      onChange={handleChange}

                    />

                    <div className="d-flex justify-content-between">

                      <small className="text-muted">Very Low</small>

                      <small className="text-muted">Very High</small>

                    </div>

                  </div>


 

                  <div className="mb-4">

                    <label htmlFor="notes" className="form-label fw-bold">Notes (optional):</label>

                    <textarea

                      className="form-control"

                      id="notes"

                      name="notes"

                      rows="3"

                      placeholder="What's contributing to your mood today?"

                      value={formData.notes}

                      onChange={handleChange}

                    />

                  </div>


 

                  <button

                    type="submit"

                    className="btn btn-primary w-100"

                    disabled={loading || !formData.mood}

                  >

                    {loading ? 'Logging Mood...' : 'Log My Mood'}

                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};


 

export default MoodTracker;


 