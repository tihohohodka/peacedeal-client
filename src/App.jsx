import Creation from './pages/creation.jsx';  
import PromisesPage from './pages/promises.jsx';
import LoginPage from './pages/login.jsx';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/promises" replace />;
  }

  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/promises" element={<PromisesPage />} />
        <Route path="/creation" element={
          <ProtectedRoute>
            <Creation />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/promises" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

