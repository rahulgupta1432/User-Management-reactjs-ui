import React from 'react';
import { List, ListItem, ListItemText, Typography, Divider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  let role = localStorage.getItem('role');
  role = JSON.parse(role)

  const handleMenuClick = (page) => {
    navigate(`/${page}`); // Use navigate to change routes
  };

  return (
    <Box
      sx={{
        width: 'auto',
        backgroundColor: '#f4f6f8',
        height: '100vh',
        padding: '16px',
        position: 'fixed',
        top: 0,
        left: 0,
      }}
    >
      <Typography variant="h6" gutterBottom>
        User Management
      </Typography>
      <Divider />
      <List>
        <ListItem button onClick={() => handleMenuClick('profile')}>
          <ListItemText primary="My Profile" />
        </ListItem>
        <ListItem button onClick={() => handleMenuClick(role==="Admin" ? 'admindashboard' :'not-authorized')}>
          <ListItemText primary="All Users" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
