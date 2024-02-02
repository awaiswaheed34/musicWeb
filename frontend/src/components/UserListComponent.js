import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../thunks/apiThunk';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const UserListComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Get the navigate function from react-router-dom

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await dispatch(getAllUsers());
        setUsers(response.users);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [dispatch]);

  const handleProfileClick = (username) => {
    // Navigate to the user's profile page with the username
    navigate(`/profile/${username}`);
  };

  return (
    <div 
      className=''
      style={{
        background: 'linear-gradient(to bottom, #000000, #00cc66, #000000)',
      }}
    >
      <h1
        style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        Find Friends!
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div>
          {users.map((user) => (
            <div
              key={user.username}
              onClick={() => handleProfileClick(user.username)}
              style={{ cursor: 'pointer' }}  // Add pointer cursor for better UX
            >
              <Card
                elevation={3}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  margin: '10px',
                  background: 'linear-gradient(to right,#000000, #333333)',
                }}
              >
                <Avatar alt={user.username} src={user.image_url} />
                <CardContent>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ color: 'white', marginLeft: '10px' }}
                  >
                    {user.username}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserListComponent;
