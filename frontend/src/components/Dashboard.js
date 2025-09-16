
 

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { Modal, Button, Form } from 'react-bootstrap';

import API from "../services/api";



 

const Dashboard = () => {

  const [exercises, setExercises] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showReminderModal, setShowReminderModal] = useState(false);

  const [showRemindersModal, setShowRemindersModal] = useState(false);

  const [reminders, setReminders] = useState([]);

  // const [dismissedReminders, setDismissedReminders] = useState([]);

  const [success, setSuccessMessage] = useState("");

  const [reminderForm, setReminderForm] = useState({

    title: '',

    message: '',

    date: '',

    time: '',

    frequency: 'daily'

  });


 

  useEffect(() => {

    fetchExercises();

    fetchReminders();


 

  }, []);


 

  useEffect(() => {

    if ("Notification" in window && Notification.permission !== "granted") {

      Notification.requestPermission().then(permission => {

        console.log("Notification Permission:", permission);

      })


 

    }

  }, []);

    useEffect(() => {

    if (!showReminderModal) {

      fetchReminders();


 

    }

  }, [showReminderModal]);



 

  const fetchExercises = async () => {

    try {

      setLoading(true);

      const response = await API.get('/api/exercises');

      setExercises(response.data);

    } catch (err) {

      console.error('Error fetching exercises:', err);

    } finally {

      setLoading(false);

    }

  };

  const handleReminderSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/api/reminders", reminderForm);

      console.log(res);

      setReminders((prev) => [...prev, res.data.reminder]);

      setSuccessMessage("Reminder created successfully");

      if (reminderForm.date && reminderForm.time) {

        const [year, month, day] = reminderForm.date.split("-").map(Number);

        const [hour, minute] = reminderForm.time.split(":").map(Number);

        const reminderDateTime = new Date(year, month - 1, day, hour, minute);

        const now = new Date();

        const delay = reminderDateTime - now;

        if (delay > 0&&Notification.permission === 'granted') {

          setTimeout(() => {

               new Notification("Reminder", {

                body: `${reminderForm.title}-${reminderForm.message}`,

                icon: "/reminder-icon.png"

              });

             }, delay);

        }

         }else{

    console.log("notification is not granted")

     }

      setReminderForm({

        title: '',

        message: '',

        date: '',

        time: '',

        type: 'mood',

        frequency: 'daily'

      });

      setTimeout(() => {

        setSuccessMessage("");

        setShowRemindersModal(false);

      }, 1500);

    }

    catch (err) {

      console.error("Request Failed:", err.message);

    }

  }

  const fetchReminders = async () => {

    console.log("Entered")

    try {

      const res = await API.get("/api/reminders");

      setReminders(res.data);

    }

    catch (err) {

      console.log("error in fetching reminders", err);

    }

  };




 

  const dismissReminder = async (id) => {

    try {

      console.log('Dismissing reminder:', id);

      await API.delete(`/api/reminders/${id}`);

      fetchReminders();

    }

    catch (err) {

      console.log("Error deleting reminder:", err)


 

    }

  };




 

  if (loading) {

    return (

      <div className="bg-light d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>

        <div className="text-center">

          <div className="spinner-border text-primary" role="status">

            <span className="visually-hidden">Loading...</span>

          </div>

          <p className="mt-3">Loading your dashboard...</p>

        </div>

      </div>

    );

  }


 

  return (

    <div className={`bg-light py-5 ${showReminderModal || showRemindersModal ? 'blur-background' : ''}`} 
         style={{ minHeight: '100vh', paddingTop: '80px' }}
    >

        <div className="container">

        {/* Welcome Header */}

        <div className="row mb-5">

          <div className="col-12 col-lg-8 mb-4">

            <h1 className="display-4 fw-bold text-primary mb-3 text-center text-lg-start">

              Welcome to MindMingle! 👋

            </h1>

            <p className="lead text-muted text-center text-lg-start">

              Ready to continue your mindfulness journey? Here's what's available for you today.

            </p>

          </div>

          <div className="col-12 col-lg-4 text-center d-none d-lg-block">

            <div className="display-1">🧘‍♀️</div>

          </div>

        </div>


 

        {reminders.length > 0 && (

          <div className="mb-5">

            <div className="card border-warning">

              <div className="card-body">

                <div className="d-flex justify-content-between align-items-center">

                  <div>

                    <h5 className="card-title text-warning fw-bold mb-1">

                      ⏰ Active Reminders ({reminders.length})

                    </h5>

                    <p className="card-text text-muted mb-0">

                      You have {reminders.length} active reminder{reminders.length !== 1 ? 'reminder' : 'reminders'}

                    </p>

                  </div>

                  <div className="text-end">

                    <button

                      className="btn btn-outline-warning btn-sm me-2"

                      onClick={() => setShowRemindersModal(true)}

                    >

                      View All

                    </button>

                    {reminders.length > 0 && (

                      <button

                        className="btn btn-outline-danger btn-sm"

                        onClick={() => {

                          console.log('Test button clicked');


 

                          dismissReminder(reminders[0]._id);


 

                        }}

                      >

                        Test Dismiss

                      </button>

                    )}

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}




 

        <div className="mb-5">

          <h2 className="fw-bold mb-4 text-center text-lg-start">Track Your Mood</h2>

          <div className="row">

            <div className="col-12 col-sm-6 col-lg-4 mb-4">

              <div className="card shadow text-center h-100">

                <div className="card-body d-flex flex-column">

                  <div className="display-1 mb-3">😊</div>

                  <h4 className="fw-bold mb-3">Log Your Mood</h4>

                  <p className="text-muted mb-4 flex-grow-1">

                    Track how you're feeling throughout the day to identify patterns.

                  </p>

                  <Link to="/mood-tracker" className="btn btn-primary">

                    Log Mood

                  </Link>

                </div>

              </div>

            </div>

            <div className="col-12 col-sm-6 col-lg-4 mb-4">

              <div className="card shadow text-center h-100">

                <div className="card-body d-flex flex-column">

                  <div className="display-1 mb-3">📊</div>

                  <h4 className="fw-bold mb-3">View History</h4>

                  <p className="text-muted mb-4 flex-grow-1">

                    See your mood patterns and trends over time.

                  </p>

                  <Link to="/mood-history" className="btn btn-outline-primary">

                    View History

                  </Link>

                </div>

              </div>

            </div>

            <div className="col-12 col-sm-6 col-lg-4 mb-4">

              <div className="card shadow text-center h-100">

                <div className="card-body d-flex flex-column">

                  <div className="display-1 mb-3">⏰</div>

                  <h4 className="fw-bold mb-3">Set Reminder</h4>

                  <p className="text-muted mb-4 flex-grow-1">

                    Set a reminder to track your mood or practice mindfulness.

                  </p>

                  <button

                    className="btn btn-outline-warning"

                    onClick={() => setShowReminderModal(true)}

                  >

                    Set Reminder

                  </button>

                </div>

              </div>

            </div>


 

          </div>

        </div>


 

        {/* Featured Exercises */}

        <div className="mb-5">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">

            <h2 className="fw-bold text-center text-md-start mb-3 mb-md-0">Featured Exercises</h2>

            <Link to="/exercises" className="btn btn-outline-primary">

              View All

            </Link>

          </div>


 

          <div className="row">

            {exercises.slice(0, 3).map((exercise, index) => (

              <div key={exercise.id || index} className="col-12 col-sm-6 col-lg-4 mb-4">

                <div className="card h-100">

                  <img

                    src={exercise.image}

                    className="card-img-top"

                    alt={exercise.title}

                    style={{ height: '200px', objectFit: 'cover' }}

                  />

                  <div className="card-body">

                    <div className="mb-3">

                      <div className="text-muted small">

                        {exercise.duration}

                      </div>

                    </div>


 

                    <h5 className="card-title">

                      {exercise.title}

                    </h5>


 

                    <p className="card-text text-muted mb-4">

                      {exercise.description}

                    </p>


 

                    <Link

                      to={`/exercises/${exercise.id}`}

                      className="btn btn-primary w-100"

                    >

                      Start Exercise

                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>


 

        {/* Getting Started */}

        <div className="text-white rounded-3 p-5 text-center" style={{ backgroundColor: '#20c997' }}>

          <h3 className="fw-bold mb-3">New to Mindfulness?</h3>

          <p className="lead mb-4">

            Start with our Deep Breathing exercise - it's perfect for beginners and

            can be done anywhere, anytime.

          </p>

          <Link to="/exercises/1" className="btn btn-light btn-lg">

            Start with Deep Breathing

          </Link>

        </div>

    </div>

    {/* Reminder Modal */}

      <Modal show={showReminderModal} onHide={() => setShowReminderModal(false)} centered>

        <Modal.Header closeButton>

          <Modal.Title>⏰ Set a Reminder</Modal.Title>

        </Modal.Header>

        <Modal.Body>

          {success && <div className='alert alert-success text-center py-2'>{success}</div>}

          <Form onSubmit={handleReminderSubmit}>


 

            <Form.Group className="mb-3">

              <Form.Label>Reminder Title</Form.Label>

              <Form.Control

                type="text"

                placeholder="Check my mood"

                value={reminderForm.title}

                onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })}

                required

              />

            </Form.Group>


 

            <Form.Group className="mb-3">

              <Form.Label>Message</Form.Label>

              <Form.Control

                as="textarea"

                rows={2}

                placeholder="Time to reflect on how I'm feeling today"

                value={reminderForm.message}

                onChange={(e) => setReminderForm({ ...reminderForm, message: e.target.value })}


 

              />

            </Form.Group>




 

            <Form.Group className="mb-3">

              <Form.Label>Frequency</Form.Label>

              <Form.Select

                value={reminderForm.frequency}

                onChange={(e) => setReminderForm({ ...reminderForm, frequency: e.target.value })}

              >

                <option value="daily">Daily</option>

                <option value="weekly">Weekly</option>

              </Form.Select>

            </Form.Group>


 

            <div className="row">

              <Form.Group className="col-6 mb-3">

                <Form.Label>Start Date</Form.Label>

                <Form.Control

                  type="date"

                  value={reminderForm.date}

                  onChange={(e) => setReminderForm({ ...reminderForm, date: e.target.value })}

                  required

                />

              </Form.Group>


 

              <Form.Group className="col-6 mb-3">

                <Form.Label>Time</Form.Label>

                <Form.Control

                  type="time"

                  value={reminderForm.time}

                  onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })}

                  required

                />

              </Form.Group>

            </div>


 

            <div className="d-flex gap-2">

              <Button variant="warning" type="submit" className="flex-fill">

                Set Reminder

              </Button>

              <Button variant="secondary" onClick={() => setShowReminderModal(false)}>

                Cancel

              </Button>

            </div>

          </Form>

        </Modal.Body>

      </Modal>


 

      {/* All Reminders Modal */}

      <Modal show={showRemindersModal} onHide={() => setShowRemindersModal(false)} size="lg" centered>

        <Modal.Header closeButton>

          <Modal.Title>⏰ All Your Reminders</Modal.Title>

        </Modal.Header>

        <Modal.Body>

          {reminders.length === 0 ? (

            <div className="text-center py-4">

              <div className="display-1 text-muted mb-3">⏰</div>

              <h5>No Active Reminders</h5>

              <p className="text-muted">You don't have any active reminders yet.</p>

              <button

                className="btn btn-warning"

                onClick={() => {

                  setShowRemindersModal(false);

                  setShowReminderModal(true);

                }}

              >

                Create Your First Reminder

              </button>

            </div>

          ) : (

            <div className="row">

              {reminders.map((reminder) => (

                <div key={reminder._id} className="col-12 mb-3">

                  <div className="card border-warning">

                    <div className="card-body">

                      <div className="d-flex justify-content-between align-items-start mb-2">

                        <h6 className="card-title text-warning fw-bold mb-0">

                          {reminder.title}

                        </h6>

                        <button

                          className="btn btn-sm btn-outline-secondary"

                          onClick={() => {


 

                            console.log('Cross button clicked for reminder:', reminder._id);

                            dismissReminder(reminder._id);

                          }}

                          style={{ cursor: 'pointer' }}

                        >

                          ✕

                        </button>

                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-2">

                        <span className="badge bg-info text-white">

                          {reminder.frequency === 'daily' ? 'Daily' : 'Weekly'}

                        </span>

                        <span className="text-muted fw-bold">

                          {reminder.time}

                        </span>

                      </div>

                      <p className="card-text small text-muted mb-0">

                        {reminder.message}

                      </p>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </Modal.Body>

        <Modal.Footer>

          <Button variant="secondary" onClick={() => setShowRemindersModal(false)}>

            Close

          </Button>

          <Button

            variant="warning"

            onClick={() => {

              setShowRemindersModal(false);

              setShowReminderModal(true);

            }}

          >

            Add New Reminder

          </Button>

        </Modal.Footer>

      </Modal>

    </div>

  );

};


 

export default Dashboard;



 