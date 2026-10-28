import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AudioProvider } from './context/AudioContext';
import SmoothScroll from './components/SmoothScroll';
import HomePage from './pages/HomePage';
import ChapterPage from './pages/ChapterPage';
import CatLayer from './components/CatLayer';

export default function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <BrowserRouter>
          <SmoothScroll>
            <CatLayer />
            <Routes>
              {/* Official Memento Mori Experience */}
              <Route path="/" element={<HomePage />} />

              {/* The Manga / Chapter Viewers */}
              <Route path="/chapter" element={<ChapterPage />} />
              <Route path="/chapter.html" element={<ChapterPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </SmoothScroll>
        </BrowserRouter>
      </AudioProvider>
    </ThemeProvider>
  );
}
