// src/pages/UploadSong.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { uploadSong } from '../thunks/apiThunk';

const UploadSong = () => {
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [genre, setGenre] = useState('');
  const [instruments, setInstruments] = useState('');
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('song_name', songName);
      formData.append('artist_name', artistName);
      formData.append('genre', genre);
      formData.append('instruments', instruments);
      formData.append('image', image);

      await dispatch(uploadSong(formData));
      
        // On successful upload, show success toast and navigate
        toast.success('Song uploaded successfully');
        navigate('/');
     
    } catch (error) {
      toast.error('Error during upload:', error);
      toast.error('Upload failed. Please check your information.');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow bg-gradient-to-br from-green-400 to-green-800 flex items-center justify-center">
        <div className="bg-black p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-white">Upload Song</h2>

          {/* Song Name Input */}
          <input
            type="text"
            placeholder="Song Name"
            className="w-full px-4 py-2 mb-4 rounded bg-white text-black"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
          />

          {/* Artist Name Input */}
          <input
            type="text"
            placeholder="Artist Name"
            className="w-full px-4 py-2 mb-4 rounded bg-white text-black"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />

          {/* Genre Input */}
          <input
            type="text"
            placeholder="Genre"
            className="w-full px-4 py-2 mb-4 rounded bg-white text-black"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />

          {/* Instruments Input */}
          <input
            type="text"
            placeholder="Instruments"
            className="w-full px-4 py-2 mb-4 rounded bg-white text-black"
            value={instruments}
            onChange={(e) => setInstruments(e.target.value)}
          />

          {/* Image Upload Input */}
          <label className="block text-white mb-2">Upload Song Cover Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Upload Button */}
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleUpload}
          >
            Upload
          </button>

          {/* Toast Container for notifications */}
          <ToastContainer />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UploadSong;
