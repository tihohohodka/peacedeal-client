import Homepage from './pages/homepage.jsx';  
import PromisesPage from './pages/promises.jsx';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="promises" element={<PromisesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

