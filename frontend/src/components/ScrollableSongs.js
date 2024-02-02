// ScrollableSongs.js

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAllSongs } from '../thunks/apiThunk';
import { Card, CardContent, Typography } from '@mui/material';

const ScrollableSongs = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await dispatch(getAllSongs());
        if (response.status === 'success') {
          const filteredSongs = response.songs.filter((song) =>
          {
            return song.song_name.toLowerCase().includes(searchTerm.toLowerCase()) 
            || song.user.toLowerCase().includes(searchTerm.toLowerCase())
          }
          );
          setSongs(filteredSongs);
        } else {
          console.error('Failed to fetch songs:', response.message);
        }
      } catch (error) {
        console.error('Error during song fetch:', error.message);
      }
    };

    fetchSongs();
  }, [dispatch, searchTerm]);

  return (
    <div
      className='w-full'
      style={{
        display: 'flex w-full',
        flexDirection: 'row',
        overflowX: 'auto',
        background: 'linear-gradient(to bottom, #000000, #00cc66, #000000)',
      }}
    >
      <div>
        {songs.map((song) => (
          <Card
            key={song.song_name}
            elevation={3}
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: '10px',
              background: 'linear-gradient(to right,#000000, #333333)',
              
            }}
          >
            <img src={song.image_url} alt={song.song_name} style={{ width: '30%', height: '30%' }} />
            <CardContent>
              <Typography variant="h6" component="div" style={{ color: 'white' }}>
                {song.song_name}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ color: 'white' }}>
                {`Artist: ${song.artist_name}`}
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ color: 'white' }}>
                {`Genre: ${song.genre}`}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScrollableSongs;
