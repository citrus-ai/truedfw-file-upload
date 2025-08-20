import React, { useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import FileUpload from './FileUpload';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'file-upload'

  const handleNavLinkClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Navbar onNavLinkClick={handleNavLinkClick} />
      <div className="content">
        {currentPage === 'home' && (
          <div className="container mt-5">
            <h1 className="text-center mb-4">Welcome!</h1>
            <p className="text-center">Please use the navigation bar to access different features.</p>
          </div>
        )}
        {currentPage === 'file-upload' && <FileUpload />}
      </div>
    </div>
  );
}

export default App;