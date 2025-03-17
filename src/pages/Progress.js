import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProgressBar from '../components/ProgressBar';
import { FaCheckCircle, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Progress = () => {
  const { user } = useSelector(state => state.auth);
  const { progress } = useSelector(state => state.progress);
  
  return (
    <div className="progress-page">
      <header className="page-header">
        <h1>Learning Progress</h1>
        <p>Track your progress across all enrolled courses</p>
      </header>
      
      <div className="progress-summary">
        <div className="summary-card">
          <FaBook className="summary-icon" />
          <div className="summary-content">
            <h3>Total Courses</h3>
            <p>{progress.length}</p>
          </div>
        </div>
        <div className="summary-card">
          <FaCheckCircle className="summary-icon" />
          <div className="summary-content">
            <h3>Completed Courses</h3>
            <p>{progress.filter(p => p.progress.CompletionPercentage >= 100).length}</p>
          </div>
        </div>
      </div>
      
      <div className="progress-courses">
        {progress.map(courseProgress => (
          <div key={courseProgress.EnrollmentId} className="progress-course">
            <div className="course-info">
              <h3>{courseProgress.CourseName}</h3>
              <p className="course-category">{courseProgress.Category}</p>
            </div>
            <ProgressBar 
              progress={courseProgress.progress.CompletionPercentage} 
              completed={courseProgress.progress.CompletionPercentage >= 100} 
            />
            <div className="course-actions">
              {courseProgress.progress.CompletionPercentage >= 100 ? (
                <span className="course-completed">Completed</span>
              ) : (
                <Link to={`/course/${courseProgress.CourseId}`} className="btn btn-sm">
                  Continue
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;