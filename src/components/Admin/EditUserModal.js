import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Input, FormControlLabel, Checkbox } from '@mui/material';

const EditUserModal = ({ isOpen, handleClose, user, handleSave }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    profilePic: null,
    role: user?.role === "Admin" ? "Admin" : "User" // Default value for role based on user data
  });

  // Handle text field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  // Handle profile picture file change
  const handleProfilePicChange = (event) => {
    setFormData(prevData => ({ ...prevData, profilePic: event.target.files[0] }));
  };

  // Handle checkbox change for admin role
  const handleCheckboxChange = (event) => {
    setFormData(prevData => ({
      ...prevData,
      role: event.target.checked ? "Admin" : "User" // Set "Admin" if checked, otherwise "User"
    }));
  };

  // Handle save
  const handleSaveClick = async () => {
    const { name, email, phone, profilePic, role } = formData;
    const userId = user.id; // or however you access the user ID
    const token = localStorage.getItem('token');
    const data = new FormData();

    // Append fields to FormData if they have values
    if (name) data.append('name', name);
    if (email) data.append('email', email);
    if (phone) data.append('phone', phone);
    if (profilePic) data.append('profilePic', profilePic);
    data.append('role', role); // Send role as "Admin" or "User"

    try {
      const response = await fetch(`https://user-management-nodejs-api.vercel.app/api/v1/admin/update/profile-info?userId=${userId}`, {
        method: 'PUT',
        headers: { 
          'x-authorization': JSON.parse(token),
          // Note: For FormData, the Content-Type header is automatically set
        },
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update user: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      if (result.status === 'success') {
        // Handle successful update, e.g., update state or notify user
        handleSave(result.updatedUser); // Pass updated user data to the parent component
        handleClose();
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Return null or an empty fragment if the user is null
  if (!user) return null;

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phone"
          label="Phone"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.phone}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.role === "Admin"} // Check if the role is "Admin"
              onChange={handleCheckboxChange}
              name="role"
            />
          }
          label="Admin"
        />
        <Input
          margin="dense"
          name="profilePic"
          type="file"
          fullWidth
          onChange={handleProfilePicChange}
        />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveClick}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
