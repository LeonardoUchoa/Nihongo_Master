import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import KanjiStudyScreen from './components/KanjiStudyScreen';
import ProgressScreen from './components/ProgressScreen';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';

export default function App() {
  return (
    <div className="size-full" style={{ maxWidth: '375px', margin: '0 auto' }}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
            <Route path="/kanji-study" element={<ProtectedRoute><KanjiStudyScreen /></ProtectedRoute>} />
            <Route path="/progress" element={<ProtectedRoute><ProgressScreen /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
