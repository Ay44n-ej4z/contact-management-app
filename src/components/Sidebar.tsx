import React from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-10 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 bg-white overflow-y-auto transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-center mt-8">
          <span className="text-xl font-semibold text-gray-800 uppercase">Contact App</span>
        </div>

        <nav className="mt-10">

          <a className="flex items-center mt-4 py-2 px-6 bg-gray-200 bg-opacity-25 text-gray-700" onClick={() => navigate("/contact")}>
           Contact Details
          </a>
          <a className="flex items-center mt-4 py-2 px-6 bg-gray-200 bg-opacity-25 text-gray-700" onClick={()=> navigate("/chartsMap")}>
            Charts and Map
          </a>
        </nav>

        <div className="absolute bottom-0 left-0 w-full">
          <div className="bg-gray-200 bg-opacity-25 px-6 py-4">
            <h3 className="text-gray-700 uppercase">Charts</h3>
          </div>
          <div className="p-4">
            {/* Add your charts here */}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;