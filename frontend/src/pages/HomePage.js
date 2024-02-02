
import React, { useState } from 'react';
import ScrollableSongs from '../components/ScrollableSongs';
import UserListComponent from '../components/UserListComponent';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from '@mui/material';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
    <Navbar />
    <div className="flex flex-col md:flex-row w-full">
      
      <div className="flex-grow w-full flex flex-col md:flex-row">
        {/* Search Section */}
        <div  style={{
    background: 'linear-gradient(to bottom, #000000, #00cc66, #000000)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }} className=" p-4 w-full md:w-1/4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search Songs"
              className="w-full px-4 py-2 rounded bg-gray-900 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Scrollable Songs Section */}
       
          <ScrollableSongs searchTerm={searchTerm} />
        
          
        {/* User List Section */}
       
          <UserListComponent />
       
      </div>
     
    </div>
    <Footer />
    </div>
  );
};

export default HomePage;