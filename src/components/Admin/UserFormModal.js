// components/Admin/UserFormModal.js
import React from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const UserFormModal = ({ isOpen, handleClose, user, handleChange, handleSave }) => {
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          margin: 'auto',
          marginTop: '100px',
          padding: '16px',
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <TextField
          label="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          value={user.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button onClick={handleClose} sx={{ marginRight: '8px' }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserFormModal;
