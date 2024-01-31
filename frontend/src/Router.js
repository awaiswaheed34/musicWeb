import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import UploadSong from './pages/UploadSong';
import UserProfilePage from './pages/UserProfile';
import './styles/tailwind.css';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadSong />} />
        <Route path="/profile/:username?" element={<UserProfilePage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;