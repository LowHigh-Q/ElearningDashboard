import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const QuizQuestion = ({ question, index, userAnswer, onSelectAnswer }) => {
  const isAnswered = userAnswer !== null;

  return (
    <div className="quiz-question">
      <h3>Question {index + 1}:</h3>
      <p dangerouslySetInnerHTML={{ __html: question.questionText }}></p>
      
      <div className="quiz-options">
        {question.options.map((option, i) => (
          <div 
            key={i} 
            className={`quiz-option ${isAnswered ? (option.isCorrect ? 'correct' : 'incorrect') : ''}`}
            onClick={() => !isAnswered && onSelectAnswer(i)}
          >
            {isAnswered ? (
              option.isCorrect ? <FaCheck className="option-icon" /> : <FaTimes className="option-icon" />
            ) : (
              <span className="option-icon">{String.fromCharCode(65 + i)}</span>
            )}
            <span dangerouslySetInnerHTML={{ __html: option.text }}></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;