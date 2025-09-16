
 

import React, { useState, useEffect } from 'react';

import { useParams, Link, useNavigate } from 'react-router-dom';

import API from "../services/api";


 

const ExerciseDetail = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [exercise, setExercise] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [currentStep, setCurrentStep] = useState(0);

  const [isActive, setIsActive] = useState(false);

  const [timer, setTimer] = useState(0);

  const [instructions,setInstructions]=useState([]);

  // const [sentence,setSentence] = useState([])


 

  useEffect(() => {

    fetchInstructions();

  },[]);

  useEffect(()=>{

        fetchExercise();

  },[]);


 

  useEffect(() => {

    let interval = null;

    if (isActive && timer > 0) {

      interval = setInterval(() => {

        setTimer(timer - 1);

      }, 1000);

    } else if (timer === 0 && isActive) {

      setIsActive(false);

      if (exercise && exercise.instructions &&currentStep < exercise.instructions.length - 1) {

        setCurrentStep(currentStep + 1);

        setTimer(10);

      } else {

        setIsActive(false);

      }

    }

    return () => clearInterval(interval);

  }, [isActive, timer, currentStep, exercise]);


 

  const fetchExercise = async () => {

    try {

      setLoading(true);

      // console.log("fetching exercer",id);

      const response = await API.get(`/api/exercises`);

      const data=response.data;

      // console.log(data);

      setExercise(data);

      setError('');


 

     

    } catch (err) {

      setError('Failed to fetch exercise details. Please try again.');

      console.error('Error fetching exercise:', err);

    } finally {

      setLoading(false);

    }

  };

  const fetchInstructions = async () => {

    try {

      setLoading(true);

      console.log("fetching exercer",id);

      // const userid = id.replace(/"/g,"");

      const response = await API.get(`/api/exercises/${id}`);

      const data=response.data.instructions;

      // setSentence(response.data.instructions.split(".").filter(sentence => sentence.trim() !== ""))

      // console.log(data);

      setInstructions(data);

      setError('');


 

     

    } catch (err) {

      setError('Failed to fetch Instructions details. Please try again.');

      console.error('Error fetching Instructions:', err);

    } finally {

      setLoading(false);

    }

  };




 

  const startExercise = () => {

    setCurrentStep(0);

    setTimer(10); // 30 seconds per step

    setIsActive(true);

  };


 

  const pauseExercise = () => {

    setIsActive(false);

  };


 

  const resumeExercise = () => {

    setIsActive(true);

  };


 

  const resetExercise = () => {

    setCurrentStep(0);

    setTimer(30);

    setIsActive(false);

  };


 

  const nextStep = () => {

    if (currentStep <instructions.length - 1) {

      setCurrentStep(currentStep + 1);

      setTimer(10);

    }

  };


 

  const previousStep = () => {

    if (currentStep > 0) {

      setCurrentStep(currentStep - 1);

      setTimer(10);

    }

  };


 

  const formatTime = (seconds) => {

    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, '0')}`;

  };


 

  if (loading) {

    return (

      <div className="bg-light d-flex align-items-center justify-content-center" style={{minHeight: 'calc(100vh - 80px)', paddingTop: '80px'}}>

        <div className="text-center">

          <div className="spinner-border text-primary" role="status">

            <span className="visually-hidden">Loading...</span>

          </div>

          <p className="mt-3">Loading exercise details...</p>

        </div>

      </div>

    );

  }


 

  if (error || !exercise) {

    return (

      <div className="bg-light d-flex align-items-center justify-content-center" style={{minHeight: 'calc(100vh - 80px)', paddingTop: '80px'}}>

        <div className="text-center">

          <div className="alert alert-danger" role="alert">

            {error || 'Exercise not found'}

          </div>

          <button className="btn btn-primary" onClick={() => navigate('/exercises')}>

            Back to Exercises

          </button>

        </div>

      </div>

    );

  }


 

  return (

    // <div className="bg-light py-5" style={{minHeight: 'calc(100vh)'}}>

      <div className="container" style={{ paddingTop: '15px' }}>

        {/* Navigation */}

        <div className="mb-4">

          <Link to="/exercises" className="btn btn-outline-secondary">

            ← Back to Exercises

          </Link>

        </div>


        {/* Exercise Instructions */}

        <div className="row">

          <div className="col-12 col-lg-8 mb-4">

            <div className="card shadow">

              <div className="card-body">

                <h3 className="fw-bold mb-4 text-center text-lg-start">

                  Step {currentStep + 1} of {instructions.length}

                </h3>

               

                <div className="instruction-step mb-4">

                  <p className="fs-5 text-dark text-center text-lg-start">

                    {instructions[currentStep]}

                  </p>

                </div>


 

                {/* Progress Bar */}

                <div className="mb-4">

                  <div className="progress" style={{ height: '8px' }}>

                    <div

                      className="progress-bar bg-primary"

                      style={{ width: `${((currentStep + 1) / instructions.length) * 100}%` }}

                    ></div>

                  </div>

                  <small className="text-muted text-center text-lg-start d-block">

                    {currentStep + 1} of {instructions.length} steps completed

                  </small>

                </div>


 

                {/* Step Navigation */}

                <div className="d-flex flex-column flex-sm-row gap-2 mb-4 justify-content-center justify-content-lg-start">

                  <button

                    className="btn btn-outline-secondary"

                    onClick={previousStep}

                    disabled={currentStep === 0}

                  >

                    ← Previous

                  </button>

                  <button

                    className="btn btn-outline-secondary"

                    onClick={nextStep}

                    disabled={currentStep === instructions.length - 1}

                  >

                    Next →

                  </button>

                </div>


 

                {/* Exercise Controls */}

                <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center justify-content-lg-start">

                  {!isActive ? (

                    currentStep === 0 ? (

                      <button

                        className="btn btn-primary btn-lg"

                        onClick={startExercise}

                      >

                        Start Exercise

                      </button>

                    ) : (

                      <button

                        className="btn btn-success btn-lg"

                        onClick={resumeExercise}

                      >

                        Resume

                      </button>

                    )

                  ) : (

                    <button

                      className="btn btn-warning btn-lg"

                      onClick={pauseExercise}

                    >

                      Pause

                    </button>

                  )}

                 

                  <button

                    className="btn btn-outline-secondary btn-lg"

                    onClick={resetExercise}

                  >

                    Reset

                  </button>

                </div>

              </div>

            </div>

          </div>


 

          {/* Sidebar */}

          <div className="col-12 col-lg-4">

            {/* Timer */}

            <div className="card shadow mb-4">

              <div className="card-body text-center">

                <h4 className="fw-bold mb-3">Timer</h4>

                <div className="display-4 fw-bold text-primary mb-3">

                  {formatTime(timer)}

                </div>

                <small className="text-muted">

                  Time remaining for current step

                </small>

              </div>

            </div>


 

            {/* All Steps Overview */}

            <div className="card shadow">

              <div className="card-body">

                <h5 className="fw-bold mb-3">All Steps</h5>

                <div className="steps-overview">

                  {instructions.length > 0 ?

                   instructions.map((instruction,index) => (

                    <div

                      key={index}

                      className={`step-item p-3 mb-2 rounded ${

                        index === currentStep

                          ? 'bg-primary text-white'

                          : index < currentStep

                            ? 'bg-success text-white'

                            : 'bg-light'

                      }`}

                    >

                      <div className="d-flex align-items-center">

                        <span className="step-number me-2">

                          {index + 1}

                        </span>

                        <span className="step-text small">

                          {instruction.substring(0, 50)}...

                        </span>

                      </div>

                    </div>

                  )) : "No data"}

                  {/* {

                    sentence.map((sentence,index)=>{

                      <p key={index}>

                        {index+1}. {sentence.trim()}

                      </p>

                    })

                  } */}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>



  );

};


 

export default ExerciseDetail;


 