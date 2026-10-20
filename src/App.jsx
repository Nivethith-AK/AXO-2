import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import HomePage from './pages/HomePage';
import ChapterPage from './pages/ChapterPage';

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chapter" element={<ChapterPage />} />
            {/* Backwards compatibility for legacy chapter.html links */}
            <Route path="/chapter.html" element={<ChapterPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </ThemeProvider>
  );
}
