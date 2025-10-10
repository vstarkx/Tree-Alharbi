import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import FamilyTreePage from './pages/FamilyTreePage';

function App() {
  return (
    <Router basename="/Tree-Alharbi">
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tree" element={<FamilyTreePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

