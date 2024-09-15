import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, Avatar } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ProfileEditModal = ({ open, onClose, onUpdate, profile }) => {
  const [name, setName] = useState(profile.name || '');
  const [number, setNumber] = useState(profile.number || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // State for uploaded profile picture
  const [picturePreview, setPicturePreview] = useState(profile.profilePicture || ''); // Preview of current picture
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (profile.profilePicture) {
      setPicturePreview(profile.profilePicture);
    }
  }, [profile.profilePicture]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if old password is provided but new password is missing
    if (oldPassword && !newPassword) {
      setPasswordError('Please enter the new password if you are changing the old password.');
      return; // Prevent form submission
    }

    // Clear error if both passwords are provided
    setPasswordError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('mobile', number);
    if (oldPassword && newPassword) {
      formData.append('oldPassword', oldPassword);
      formData.append('newPassword', newPassword);
    }
    if (profilePicture) {
      formData.append('profilePicture', profilePicture); // Append the new profile picture if uploaded
    }

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`https://user-management-nodejs-api.vercel.app/api/v1/admin/update/profile-info?userId=${userId}`, {
        method: 'PUT',
        headers: { 
          'x-authorization': JSON.parse(token),
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onUpdate(data.data);
      } else {
        console.error('Failed to update profile:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Old Password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />
          
          {/* Show error if old password is entered but new password is missing */}
          {passwordError && (
            <Typography color="error" variant="body2">
              {passwordError}
            </Typography>
          )}

          {/* Profile picture preview */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" gutterBottom>Profile Picture</Typography>
            {picturePreview ? (
              <Avatar 
                src={picturePreview} 
                alt="Profile Picture" 
                sx={{ width: 100, height: 100, margin: 'auto' }} 
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No picture uploaded
              </Typography>
            )}
          </Box>

          {/* File input for profile picture */}
          <Button
            variant="contained"
            component="label"
            fullWidth
            sx={{ mt: 2 }}
          >
            Upload Profile Picture
            <input 
              type="file" 
              hidden 
              accept="image/*" 
              onChange={handlePictureChange} 
            />
          </Button>

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Update
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ProfileEditModal;
