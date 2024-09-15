import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar, Toolbar, IconButton, Menu, MenuItem, Avatar, Typography, Box, Card, CardContent, CardHeader, Button
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import UserTable from '../MaterialReactTable';
import UserFormModal from './UserFormModal';
import EditUserModal from './EditUserModal';
import Sidebar from './SideBar';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', date: '' });

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await fetch('https://user-management-nodejs-api.vercel.app/api/v1/admin/fetch/all-user', {
          method: 'GET',
          headers: {
            'x-authorization': JSON.parse(`${token}`) 
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Failed to fetch users: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        if (data.status === 'success') {
          // Extract the users data directly and ignore pagination metadata
          setUsers(data.data.filter(item => item.id));
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleEditModalOpen = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleNewUserChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    try {
      // Add user via API if needed, otherwise update local state
      setUsers([...users, { ...newUser, id: (users.length + 1).toString() }]);
      handleAddModalClose();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEditUserChange = (e) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
  };

  const handleSaveEditUser = async () => {
    try {
      // Save user edits via API if needed, otherwise update local state
      setUsers(users.map(user => (user.id === selectedUser.id ? selectedUser : user)));
      handleEditModalClose();
    } catch (error) {
      console.error('Error saving user edits:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between', marginLeft: '200px' }}>
          <Typography variant="h6">Admin Dashboard</Typography>

          <IconButton onClick={handleAvatarClick} color="inherit">
            <Avatar>Z</Avatar>
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

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />

        <Box sx={{ marginLeft: '200px', flexGrow: 1, padding: '16px' }}>
          <Card>
            <CardHeader
              title={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">All Users</Typography>
                  <Button variant="contained" color="primary" onClick={handleAddModalOpen}>
                    Add User +
                  </Button>
                </Box>
              }
              sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd' }}
            />
            <CardContent>
              <UserTable
                users={users}  
                handleEditUser={handleEditModalOpen}
                handleDeleteUser={(id) => setUsers(users.filter(user => user.id !== id))}
              />
            </CardContent>
          </Card>
        </Box>
      </Box>

      <UserFormModal
        isOpen={isAddModalOpen}
        handleClose={handleAddModalClose}
        user={newUser}
        handleChange={handleNewUserChange}
        handleSave={handleAddUser}
      />

      <EditUserModal
        isOpen={isEditModalOpen}
        handleClose={handleEditModalClose}
        user={selectedUser}
        handleChange={handleEditUserChange}
        handleSave={handleSaveEditUser}
      />
    </Box>
  );
};

export default AdminDashboard;
