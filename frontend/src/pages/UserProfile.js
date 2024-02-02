// UserProfilePage.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../thunks/apiThunk';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography, Avatar, Grid, List, ListItem, ListItemText, Box } from '@mui/material';
import ScrollableSongs from '../components/ScrollableSongs';

const UserProfilePage = (props) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  const { username } = useParams();
  let user  = {};
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await dispatch(getUserProfile(username));
        setUserData(response.user_profile);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (username) {
      fetchUserData();
    } else {
      // If no username is passed, get user data from local storage
      user = localStorage.getItem('user');
      setUserData(JSON.parse(user));
    }
  }, [username, dispatch]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <ScrollableSongs/>
      <Navbar />

      <div
        style={{
          background: 'linear-gradient(to bottom, #000000, #00cc66, #000000)', // Green to Black gradient
          color: 'white',
          flexGrow: 1,
          padding: '20px',
        }}
      >
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
          <Paper
            elevation={3}
            style={{
              background: 'linear-gradient(to bottom, #000000, #333333)', // Dark gradient for paper
              borderRadius: '10px',
              marginTop: '20px',
              padding: '20px',
            }}
          >
            {userData && (
              <div>
                <Grid container justifyContent="center" alignItems="center" spacing={2}>
                  <Grid item>
                    <Avatar alt={userData.username} src={userData.image_url} />
                  </Grid>
                  <Grid item>
                    <Typography variant="h4" style={{ color: '#00cc66' }}>
                      {userData.username}
                    </Typography>
                  </Grid>
                </Grid>

                <Box mt={2} mb={2}>
                  <Typography variant="subtitle1" style={{ color: '#00cc66' }}>
                    Description:
                  </Typography>
                  <Box
                    component="div"
                    sx={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      padding: '10px',
                      borderRadius: '5px',
                    }}
                  >
                    <Typography variant="body1" style={{ color: 'white' }}>
                      {userData.description}
                    </Typography>
                  </Box>
                </Box>

                <List>
                  <ListItem>
                    <ListItemText primary={`Email: ${userData.email}`} style={{ color: '#00cc66' }} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Preferred Genres`} style={{ color: '#00cc66' }} />
                    <List>
                      {userData.genre_likes.map((genre) => (
                        <ListItem key={genre}>
                          <ListItemText primary={genre} style={{ color: 'white' }} />
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                  <ListItem>
                    <ListItemText primary={`Instruments played:`} style={{ color: '#00cc66' }} />
                    <List>
                      {userData.instruments.map((instrument) => (
                        <ListItem key={instrument}>
                          <ListItemText primary={instrument} style={{ color: 'white' }} />
                        </ListItem>
                      ))}
                    </List>
                  </ListItem>
                </List>

                {/* Add more details as needed */}
                {/* if username is  available pass them to scoll */}
                {userData && <ScrollableSongs searchTerm={username} />
                }
                
              </div>
            )}
            
          </Paper>
          
        </Container>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfilePage;
