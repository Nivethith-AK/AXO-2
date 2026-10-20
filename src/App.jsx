import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import HomePage from './pages/HomePage';
import ChapterPage from './pages/ChapterPage';
import ClarioPage from './pages/ClarioPage';

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <BrowserRouter>
          <Routes>
            {/* The Original Memento Mori Home Page — Untouched */}
            <Route path="/" element={<HomePage />} />

            {/* The Cloned Clario Layout for the Musician */}
            <Route path="/clario" element={<ClarioPage />} />

            {/* The Manga / Chapter Viewers */}
            <Route path="/chapter" element={<ChapterPage />} />
            <Route path="/chapter.html" element={<ChapterPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </ThemeProvider>
  );
}
