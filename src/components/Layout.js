import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Admin/SideBar'; 

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Box 
        sx={{ 
          width: '100px', 
          backgroundColor: '#f4f6f8', 
          height: '100vh', 
          padding: '16px', 
          position: 'fixed', 
          top: 0, 
          left: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Sidebar />
      </Box>
      
      {/* Main Content */}
      <Box 
        sx={{ 
          marginLeft: '20px', 
          flexGrow: 1, 
          padding: '16px',
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
