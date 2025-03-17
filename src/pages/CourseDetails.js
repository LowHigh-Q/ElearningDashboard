import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`https://localhost:7028/api/coursedetails/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch course details.');
                }

                const data = await response.json();
                setCourse(data);
            } catch (err) {
                setError('Error fetching course details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseDetails();
    }, [id]);

    if (loading) return <p>Loading course details...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="course-details-container">
            <h1>{course?.courseName || 'Course Details'}</h1>
            <p>{course?.courseDescription || 'No description available'}</p>
            <Link to="/courses" className="back-button">Back to Courses</Link>
            <Link to={`/quiz/${id}`} className="quiz-button">Take Quiz Now</Link>
        </div>
    );
};

export default CourseDetails;
