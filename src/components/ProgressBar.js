import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ProgressBar = ({ progress, completed }) => {
  const width = Math.min(progress, 100);

  return (
    <div className="progress-bar-container">
      <div className="progress-label">
        {completed ? (
          <span className="completed-label">
            <FaCheckCircle /> Completed
          </span>
        ) : (
          <span className="in-progress-label">{progress}% Complete</span>
        )}
      </div>
      <div className="progress-bar">
        <div className={`progress-fill ${completed ? 'completed' : ''}`} style={{ width: `${width}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;