
 

import React, { useState, useEffect } from 'react';

import API from "../services/api";

import { useAuth } from '../context/AuthContext';

import {

  Chart as ChartJS,

  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,



  Title,

  Tooltip,

  Legend,

} from 'chart.js';

import { Line } from 'react-chartjs-2';


 

ChartJS.register(

  CategoryScale,

  LinearScale,

  PointElement,

  LineElement,

  Title,

  Tooltip,

  Legend

);


 

const MoodHistory = () => {

  const { user } = useAuth();

  const [moodEntries, setMoodEntries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');


 

  // Mood scale with labels and emojis
  const moodScale = {
    1: { label: "Very Sad", emoji: "😭" },
    2: { label: "Sad", emoji: "😢" },
    3: { label: "Angry", emoji: "😠" },
    4: { label: "Anxious", emoji: "😰" },
    5: { label: "Neutral", emoji: "😐" },
    6: { label: "Calm", emoji: "😌" },
    7: { label: "Happy", emoji: "😊" },
    8: { label: "Very Happy", emoji: "😄" },
  };


 

  // Map mood string values to numbers
  const moodValues = {
    "very-sad": 1,
    sad: 2,
    angry: 3,
    anxious: 4,
    neutral: 5,
    calm: 6,
    happy: 7,
    "very-happy": 8,
  };


 


  useEffect(() => {
    fetchMoodHistory();
  }, []);


 

  const fetchMoodHistory = async () => {

    try {

      setLoading(true);

     

      // Fetch mood entries for the current user

      const response = await API.get('/api/moodentry');

      setMoodEntries(response.data);

      setError('');

    } catch (err) {

      setError('Failed to fetch mood history. Please try again.');

      console.error('Error fetching mood history:', err);

    } finally {

      setLoading(false);

    }

  };


 

  const formatDate = (timestamp) => {

    const date = new Date(timestamp);

    return date.toLocaleDateString('en-US', {

      year: 'numeric',

      month: 'short',

      day: 'numeric',

      hour: '2-digit',

      minute: '2-digit'

    });

  };


 

  const getIntensityColor = (intensity) => {

    if (intensity <= 3) return 'text-danger';

    if (intensity <= 6) return 'text-warning';

    return 'text-success';

  };


 

  // Prepare chart data
 // Prepare chart data
  const prepareChartData = () => {
    if (moodEntries.length === 0) return null;

    const sortedEntries = [...moodEntries].sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );

    const labels = sortedEntries.map((entry) => {
      const date = new Date(entry.timestamp);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    });

    const data = sortedEntries.map((entry) => moodValues[entry.mood] || 5);

    return {
      labels,
      datasets: [
        {
          label: "Mood Level",
          data: data,
          borderColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return "#20c997";

            const gradient = ctx.createLinearGradient(
              chartArea.left,
              chartArea.bottom,
              chartArea.left,
              chartArea.top
            );
            gradient.addColorStop(0, "rgba(255, 99, 132, 0.8)"); // soft red
            gradient.addColorStop(1, "rgba(75, 192, 192, 0.8)"); // soft green
            return gradient;
          },
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return "rgba(200,200,200,0.1)";

            const gradient = ctx.createLinearGradient(
              chartArea.left,
              chartArea.bottom,
              chartArea.left,
              chartArea.top
            );
            gradient.addColorStop(0, "rgba(255, 99, 132, 0.15)");
            gradient.addColorStop(1, "rgba(75, 192, 192, 0.15)");
            return gradient;
          },
          tension: 0.4,
          // fill: true,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Mood Trends Over Time",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const mood = moodScale[context.parsed.y];
            return `Mood: ${mood.emoji} ${mood.label}`;
          },
        },
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        min: 1,
        max: 8,
        ticks: {
          stepSize: 1,
          callback: function (value) {
            const mood = moodScale[value];
            return mood ? `${mood.emoji} ${mood.label}` : value;
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div
        className="bg-light d-flex align-items-center justify-content-center"
        style={{ minHeight: "calc(100vh - 80px)", paddingTop: "80px" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading mood history...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-light py-5"
      style={{ minHeight: "calc(100vh - 80px)", paddingTop: "80px" }}
    >
      <div className="container">
        <h1 className="display-4 fw-bold text-primary mb-4 text-center">
          Mood History
        </h1>
        <p className="lead text-muted text-center mb-5">
          Track your emotional patterns and see how your mood changes over time.
        </p>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Mood Chart */}
        {moodEntries.length > 0 && (
          <div className="mb-5">
            <div className="card shadow">
              <div className="card-body">
                <h3 className="fw-bold text-primary mb-4 text-center">
                  Mood Trends
                </h3>
                <div style={{ height: "400px" }}>
                  <Line data={prepareChartData()} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>
        )}

        {moodEntries.length === 0 ? (
          <div className="text-center py-5">
            <div className="display-1 text-muted mb-3">📊</div>
            <h3>No mood entries yet</h3>
            <p className="text-muted">
              Start tracking your mood to see your emotional patterns here.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="fw-bold text-primary mb-4 text-center">
              Recent Mood Entries
            </h3>
            <div className="row">
              {moodEntries.map((entry) => (
                <div key={entry.id} className="col-12 col-md-6 col-lg-4 mb-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="fs-1 me-3">
                          {moodScale[moodValues[entry.mood]].emoji}
                        </div>
                        <div>
                          <h5 className="card-title mb-1">
                            {moodScale[moodValues[entry.mood]].label}
                          </h5>
                          <p className="card-text">
                            <span
                              className={`fw-bold ${getIntensityColor(
                                entry.intensity
                              )}`}
                            >
                              Intensity: {entry.intensity}/10
                            </span>
                          </p>
                        </div>
                      </div>

                      {entry.notes && (
                        <p className="card-text text-muted mb-3">
                          "{entry.notes}"
                        </p>
                      )}

                      <small className="text-muted">
                        {formatDate(entry.timestamp)}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodHistory;

