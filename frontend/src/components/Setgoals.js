import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from "../services/api";

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);
    const [editingGoal, setEditingGoal] = useState(null);
    const [mood, setMood] = useState('');
    const [loading, setLoading] = useState(false);
    const [togglingGoal, setTogglingGoal] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [filter, setFilter] = useState('pending'); // completed, pending
    const [sortBy, setSortBy] = useState('newest'); // newest, oldest, alphabetical

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            setLoading(true);
            const res = await API.get('/api/goal');
            setGoals(res.data);
        } catch (error) {
            console.error('Error fetching goals', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!mood.trim()) return;

        try {
            setLoading(true);
            const data = { mood: mood.trim() };
            await API.post('/api/goal', data);
            clearForm();
            fetchGoals();
        } catch (error) {
            console.error('Error saving goal', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (id) => {
        try {
            setTogglingGoal(id);
            console.log('Toggling goal with ID:', id);
            const res = await API.patch(`/api/goal/${id}/toggle`);
            console.log('Toggle response:', res.data);
            
            const wasCompleted = goals.find(goal => goal._id === id)?.completed;
            const isNowCompleted = res.data.completed;
            
            setGoals((prev) =>
                prev.map((goal) => (goal._id === id ? res.data : goal))
            );
            
            // Show success message if goal was just completed
            if (!wasCompleted && isNowCompleted) {
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000);
            }
        } catch (error) {
            console.error("Error toggling goal:", error.response?.data || error.message);
        } finally {
            setTogglingGoal(null);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this goal?')) {
            try {
                await API.delete(`/api/goal/${id}`);
            fetchGoals();
        } catch (error) {
            console.error('Error deleting goal', error.message);
            }
        }
    };

    const clearForm = () => {
        setEditingGoal(null);
        setMood('');
    };

    // Filter and sort goals
    const filteredAndSortedGoals = goals
        .filter(goal => {
            if (filter === 'completed') return goal.completed;
            if (filter === 'pending') return !goal.completed;
            return false; // No "all" option
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'oldest':
                    return new Date(a.created_at) - new Date(b.created_at);
                case 'alphabetical':
                    return a.mood.localeCompare(b.mood);
                case 'newest':
                default:
                    return new Date(b.created_at) - new Date(a.created_at);
            }
        });

    const completedCount = goals.filter(goal => goal.completed).length;
    const totalCount = goals.length;
    const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <div className="bg-light" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: '80px' }}>
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="alert alert-success alert-dismissible fade show position-fixed" 
                     style={{ top: '90px', right: '20px', zIndex: 1050, minWidth: '300px' }}
                     role="alert">
                    <div className="d-flex align-items-center">
                        <span className="me-2">🎉</span>
                        <strong>Congratulations!</strong> Goal completed successfully!
                    </div>
                    <button type="button" className="btn-close" onClick={() => setShowSuccessMessage(false)}></button>
                </div>
            )}
            
            <div className="container py-1">
                {/* Header Section */}


                <div className="row">
                    {/* Add Goal Form */}
                    <div className="col-12 col-lg-4 mb-4">
                        <div className="card shadow border-0">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Add New Goal</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={mood}
                                            onChange={(e) => setMood(e.target.value)}
                                            placeholder="Enter your goal..."
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={loading || !mood.trim()}
                                        style={{
                                            background: 'linear-gradient(90deg, var(--secondary-teal) 0%, var(--primary-teal-dark) 50%, var(--primary-teal) 100%)',
                                            border: 'none'
                                        }}
                                    >
                                        {loading ? 'Adding...' : 'Add Goal'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Goals List */}
                    <div className="col-12 col-lg-8">
                        {/* Filters and Sort */}
                        <div className="card shadow-sm border-0 mb-4">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <div className="btn-group" role="group">
                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="filter"
                                                id="filter-pending"
                                                checked={filter === 'pending'}
                                                onChange={() => setFilter('pending')}
                                            />
                                            <label 
                                                className="btn btn-outline-success" 
                                                htmlFor="filter-pending"
                                                style={{
                                                    background: filter === 'pending' ? 'linear-gradient(90deg, var(--secondary-teal) 0%, var(--primary-teal-dark) 50%, var(--primary-teal) 100%)' : '',
                                                    border: 'none',
                                                    color: filter === 'pending' ? 'white' : ''
                                                }}
                                            >
                                                Pending ({totalCount - completedCount})
                                            </label>

                                            <input
                                                type="radio"
                                                className="btn-check"
                                                name="filter"
                                                id="filter-completed"
                                                checked={filter === 'completed'}
                                                onChange={() => setFilter('completed')}
                                            />
                                            <label 
                                                className="btn btn-outline-success" 
                                                htmlFor="filter-completed"
                                                style={{
                                                    background: filter === 'completed' ? 'linear-gradient(90deg, var(--secondary-teal) 0%, var(--primary-teal-dark) 50%, var(--primary-teal) 100%)' : '',
                                                    border: 'none',
                                                    color: filter === 'completed' ? 'white' : ''
                                                }}
                                            >
                                                Completed ({completedCount})
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <select
                                            className="form-select"
                                            value={sortBy}
                                            onChange={(e) => setSortBy(e.target.value)}
                                        >
                                            <option value="newest">🕒 Newest First</option>
                                            <option value="oldest">🕒 Oldest First</option>
                                            <option value="alphabetical">🔤 A-Z</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                         </div>

                        {/* Goals List */}
                        <div className="row g-3">
                            {loading && goals.length === 0 ? (
                                <div className="col-12">
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        <p className="mt-3 text-muted">Loading your goals...</p>
                                    </div>
                                </div>
                            ) : filteredAndSortedGoals.length === 0 ? (
                                <div className="col-12">
                                    <div className="card border-0 shadow-sm">
                                        <div className="card-body text-center py-5">
                                            <div className="display-1 text-muted mb-3">🎯</div>
                                            <h4 className="text-muted mb-3">
                                                {`No ${filter} goals`}
                                            </h4>
                                            <p className="text-muted mb-4">
                                                {`Try changing the filter to see your ${filter === 'completed' ? 'pending' : 'completed'} goals, or add a new goal above!`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                filteredAndSortedGoals.map((goal, index) => (
                                    <div key={goal._id} className="col-12">
                                        <div 
                                            className={`card border-0 shadow-sm goal-card ${goal.completed ? 'completed' : ''}`}
                            style={{
                                                animationDelay: `${index * 0.1}s`,
                                                opacity: 0,
                                                animation: 'fadeInUp 0.6s ease forwards',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div className="card-body">
                                                <div className="row align-items-center">
                                                    <div className="col-1">
                                                        <button
                                                            onClick={() => handleToggle(goal._id)}
                                                            disabled={togglingGoal === goal._id}
                                                            className={`btn btn-sm rounded-circle p-0 ${
                                                                goal.completed 
                                                                    ? 'btn-success' 
                                                                    : 'btn-outline-secondary'
                                                            }`}
                                                            style={{ width: '40px', height: '40px' }}
                                                        >
                                                            {togglingGoal === goal._id ? (
                                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                            ) : (
                                                                goal.completed ? '✓' : '○'
                                                            )}
                                                        </button>
                                                    </div>
                                                    <div className="col-8">
                                                        <h5 className={`mb-2 ${goal.completed ? 'text-decoration-line-through text-muted' : 'fw-bold'}`}>
                                                            {goal.mood}
                                                        </h5>
                                                        <small className="text-muted">
                                                            📅 Created {new Date(goal.created_at).toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </small>
                                                    </div>
                                                    <div className="col-3 text-end">
                                                        <div className="btn-group" role="group">
                                                            <button
                                                                className="btn btn-outline-danger btn-sm"
                                                                onClick={() => handleDelete(goal._id)}
                                                                title="Delete goal"
                                                            >
                                                                🗑️
                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
                         </div>

        </div>
    );
};

export default GoalsPage;