import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

// Styled component for animation
const AnimatedButton = styled(Button)`
  transition: background-color 0.3s ease-in-out;
  background-color: #00cc66; /* Set background color according to your theme */

  &:hover {
    background-color: #333333; /* Invert colors on hover */
  }
`;

const Navbar = () => {
  const isAuthenticated = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isAuthenticated) {
      // Handle logout logic if needed
      localStorage.removeItem('token');
      navigate('/login');
    } else {
      // Navigate to LoginPage
      navigate('/login');
    }
  };

  const handleUploadSongClick = () => {
    // Navigate to UploadSong page
    navigate('/upload');
  };

  const handleProfileClick = () => {
    // Navigate to Profile page
    navigate('/profile');
  };

  const handleBoomboxClick = () => {
    // Navigate to Home page when BOOMBOX is clicked
    navigate('/');
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center flex-col lg:flex-row">
        {/* Make the BOOMBOX text clickable */}
        <AnimatedButton
          variant="text"
          color="success"
          onClick={handleBoomboxClick}
        >
          HARMONY
        </AnimatedButton>

        <div className="flex items-center space-x-4">
          <Button
            variant="text"
            color="success"
            onClick={handleLoginClick}
            sx={{ '&:hover': { backgroundColor: '#333333' } }}
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </Button>

          {isAuthenticated && (
            <>
              <div className="group relative inline-block">
                <Button
                  variant="text"
                  color="success"
                  onClick={handleProfileClick}
                  sx={{ '&:hover': { backgroundColor: '#333333' } }}
                >
                  User Profile
                </Button>

                {/* Show "Upload a Song" button on larger screens */}
                <AnimatedButton
                  variant="text"
                  color="success"
                  onClick={handleUploadSongClick}
                >
                  Upload Song
                </AnimatedButton>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
