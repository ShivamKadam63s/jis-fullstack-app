import './index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import Login from './pages/Login.tsx';
import RegistrarDashboard from './pages/RegistrarDashboard.tsx';
import JudgeHomepage from './pages/JudgeHomepage.tsx';
import LawyerLandingPage from './pages/LawyerLandingPage.tsx';
import CaseDetailPage from './pages/CaseDetailPage.tsx';
import AdvancedSearchPage from './pages/AdvancedSearchPage.tsx';

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode; roles?: string[] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return <>{children}</>;
};

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<ProtectedRoute roles={['REGISTRAR']}><RegistrarDashboard /></ProtectedRoute>} />
        <Route path="/judge" element={<ProtectedRoute roles={['JUDGE']}><JudgeHomepage /></ProtectedRoute>} />
        <Route path="/lawyer" element={<ProtectedRoute roles={['LAWYER']}><LawyerLandingPage /></ProtectedRoute>} />
        <Route path="/case/:cin" element={<ProtectedRoute><CaseDetailPage /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><AdvancedSearchPage /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;