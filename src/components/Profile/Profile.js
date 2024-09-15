import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  TextField, Button, Container, Paper, Box, Typography,
  AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Divider,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from '../Admin/SideBar';
import ProfileEditModal from './ProfileEditeModal'; // Ensure the import path is correct

const Profile = () => {
  const { logout, auth } = useContext(AuthContext); // Get auth from context
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    mobile: '',
    profilePhoto: '', // Add profilePhoto state
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Get the token from localStorage
        const token = localStorage.getItem('token'); 

        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await fetch("https://user-management-nodejs-api.vercel.app/api/v1/admin/fetch/profile", {
          method: 'GET',
          headers: {
            'x-authorization': JSON.parse(`${token}`) // Using token from localStorage
          }
        });

        const data = await response.json();

        if (response.ok) {
          setProfile(data.data[0]); // Assuming the API response format
        } else {
          console.error('Failed to fetch profile:', data.message || 'Unknown error');
        }
        
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [auth.token]);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout(); // Logout and redirect
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    alert('Profile updated successfully!');
    handleCloseEditModal();
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#2196F3' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: '200px' }}>
            Profile Page
          </Typography>
          <IconButton onClick={handleAvatarClick} color="inherit">
            <Avatar />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />

        <Container component="main" sx={{ marginLeft: '200px', padding: '32px', flexGrow: 1 }}>
          <Paper elevation={5} sx={{ padding: 4, width: '100%', maxWidth: 'md', borderRadius: 2 }}>
            <Stack direction="row" spacing={3} alignItems="center">
              {/* Profile Photo */}
              <Avatar 
                src={profile.profilePic || 'https://via.placeholder.com/150'} 
                sx={{ width: 150, height: 150 }} 
              />
              {/* Profile Info Display */}
              <Stack spacing={2}>
                <Typography variant="h4">My Profile</Typography>
                <Divider sx={{ mb: 3 }} />
                <Typography variant="body1"><strong>ID:</strong> {profile.id}</Typography>
                <Typography variant="body1"><strong>Name:</strong> {profile.name}</Typography>
                <Typography variant="body1"><strong>Number:</strong> {profile.mobile}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpenEditModal}
                >
                  Update
                </Button>
              </Stack>
            </Stack>

            {/* Edit Modal */}
            <ProfileEditModal
              open={isEditModalOpen}
              onClose={handleCloseEditModal}
              onUpdate={handleProfileUpdate}
              profile={profile}
              auth={auth} // Pass auth to ProfileEditModal
            />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Profile;
