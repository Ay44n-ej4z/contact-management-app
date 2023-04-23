import React,{useState} from 'react';
import Sidebar from './components/Sidebar';
import CreateContactPage from './pages/CreateContactPage';
import { HiMenu } from 'react-icons/hi';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChartsMap from './pages/ChartsMap';
function App() {
  const [isOpen, setIsOpen] = useState(false)

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col lg:flex-row">
    <HiMenu onClick={handleSidebarToggle} className="w-6 h-6  ml-2 mt-2 cursor-pointer" />
    <div className="flex-1">
      <Router>
        <Sidebar isOpen={isOpen} onClose={handleSidebarToggle} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<CreateContactPage />} />
          <Route path="/chartsMap" element={<ChartsMap />} />
        </Routes>
      </Router>
    </div>
  </div>
  );
}

export default App;
