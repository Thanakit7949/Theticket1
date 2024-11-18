import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Implement logout functionality here, e.g., clearing user data
    navigate('/'); // Redirect to home or login page after logout
  }, [navigate]);

  return <h1>Logging out...</h1>;
};

export default Logout;
