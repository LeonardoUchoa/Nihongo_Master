import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import KanjiStudyScreen from './components/KanjiStudyScreen';
import ProgressScreen from './components/ProgressScreen';

export default function App() {
  return (
    <div className="size-full" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/kanji-study" element={<KanjiStudyScreen />} />
          <Route path="/progress" element={<ProgressScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}