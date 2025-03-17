import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Quiz from './pages/Quiz';
import Progress from './pages/Progress';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import { useSelector } from 'react-redux';
function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/coursedetails/:id" element={<CourseDetails />} />
          <Route path="/quiz/:courseId" element={<Quiz />} />
          <Route path="/progress" element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Progress />
            </PrivateRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;