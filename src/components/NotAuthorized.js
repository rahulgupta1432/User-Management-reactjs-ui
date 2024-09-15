import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotAuthorized = () => {
  const navigate = useNavigate();

  const handleBackToProfile = () => {
    navigate('/profile'); // Redirect to the profile page
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Not Authorized</h2>
      <p>You do not have permission to access this page.</p>
      <button
        onClick={handleBackToProfile}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Back to Profile
      </button>
    </div>
  );
};

export default NotAuthorized;
