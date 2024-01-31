import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { signupUser } from '../thunks/apiThunk';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedInstruments, setSelectedInstruments] = useState([]);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('genre_likes', selectedGenre.value);
      selectedInstruments.forEach((instrument) =>
        formData.append('instruments', instrument.value)
      );
      formData.append('description', description);
      formData.append('image', imageFile);

      const response = await dispatch(signupUser(formData));
      console.log(response, "login response");
      if (response.status === 'success') {
        // On successful signup, show success toast and navigate
        toast.success('Signup successful. Please login.');
        navigate('/login');
      } else {
        // On signup failure, show error toast
        toast.error('Signup failed. Please check your information.');
      }
    } catch (error) {
      toast.error('Error during signup:', error);
    }
  };

  const genreOptions = [
    { value: 'rock', label: 'Rock' },
    { value: 'pop', label: 'Pop' },
    // Add more genre options as needed
  ];

  const instrumentOptions = [
    { value: 'guitar', label: 'Guitar' },
    { value: 'piano', label: 'Piano' },
    // Add more instrument options as needed
  ];

  const handleGenreChange = (selectedOption) => {
    setSelectedGenre(selectedOption);
  };

  const handleInstrumentsChange = (selectedOptions) => {
    setSelectedInstruments(selectedOptions);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow bg-gradient-to-br from-green-400 to-green-800 flex items-center justify-center">
        <div className="bg-black p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-white">Signup</h2>

           {/* Username Input */}
           <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 mb-4 rounded bg-white text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Email Input */}
          <input
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 mb-4 rounded bg-white text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-4 rounded bg-white text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Genre Selector */}
          <label className="block text-white mb-2">Select Genre:</label>
          <Select
            options={genreOptions}
            value={selectedGenre}
            onChange={handleGenreChange}
            placeholder="Select Genre"
          />

          {/* Instruments Selector */}
          <label className="block text-white mb-2">Select Instruments:</label>
          <Select
            options={instrumentOptions}
            value={selectedInstruments}
            onChange={handleInstrumentsChange}
            isMulti
            placeholder="Select Instruments"
          />

          {/* Description Input */}
          <label className="block text-white mb-2">Description:</label>
          <textarea
            placeholder="Description"
            className="w-full px-4 py-2 mb-4 rounded bg-white text-black"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Image Upload Input */}
          <label className="block text-white mb-2">Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {/* Signup Button */}
          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSignup}
          >
            Signup
          </button>

          {/* Login Link */}
          <p className="mt-4 text-white">
            Already have an account? <Link to="/login" className="underline">Login</Link>
          </p>
        </div>
      </div>

      <Footer />

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
