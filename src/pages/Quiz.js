import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Quiz = () => {
    const { courseId } = useParams();
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
    const fetchQuizQuestions = async () => {
        try {
            const response = await fetch(`https://localhost:7028/api/QuizQuestions/quizquestions/${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch quiz questions.');
            }

            const data = await response.json();
            console.log('Fetched Data:', data); // <-- Add this to inspect data structure
            setQuestions(data);
        } catch (err) {
            setError('Error fetching quiz questions. Please try again.');
        }
    };

    fetchQuizQuestions();
}, [courseId]);
    const handleAnswerChange = (questionId, selectedOption) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: selectedOption
        }));
    };

    const handleSubmit = () => {
        console.log('Selected Answers:', answers);
        alert('Quiz submitted successfully!');
    };

    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="quiz-container">
            <h1>Quiz</h1>
            {questions.length === 0 ? (
                <p>No quiz questions available for this course.</p>
            ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                    {questions.map((question, index) => (
                        <div key={question.questionId} className="question-card">
                            <p><b>{index + 1}.{question.question}</b></p>
                            <div className="options">
                                {['optionA', 'optionB', 'optionC', 'optionD'].map((option) => (
                                    <label key={option} className="option-label">
                                        <input
                                            type="radio"
                                            name={`question-${question.questionId}`}
                                            value={question[option]} // <-- Corrected this
                                            checked={answers[question.questionId] === question[option]}
                                            onChange={() => handleAnswerChange(question.questionId, question[option])}
                                        />
                                        {question[option]} {/* Displaying the option value */}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button className="submit-button" onClick={handleSubmit}>
                        Submit Quiz
                    </button>
                </form>
            )}
        </div>
    );
};

export default Quiz;
